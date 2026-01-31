import { Redis } from '@upstash/redis';
import { NextRequest, NextResponse } from 'next/server';
import type { ViewsApiResponse } from '@/types/views';

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

/**
 * Bot User-Agent patterns to filter out
 */
const BOT_PATTERNS = [
  /bot/i,
  /spider/i,
  /crawl/i,
  /curl/i,
  /wget/i,
  /headless/i,
  /phantom/i,
  /selenium/i,
];

/**
 * Check if request is from a bot
 */
function isBot(userAgent: string | null): boolean {
  if (!userAgent) return true;
  return BOT_PATTERNS.some((pattern) => pattern.test(userAgent));
}

/**
 * Get client IP address from request
 */
function getClientIp(request: NextRequest): string {
  // Check Vercel-specific headers first
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }

  // Fallback to other headers
  const realIp = request.headers.get('x-real-ip');
  if (realIp) return realIp;

  // Default fallback
  return 'unknown';
}

/**
 * GET /api/views/[slug]
 * Returns the current view count for a post
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    if (!slug) {
      return NextResponse.json<ViewsApiResponse>(
        { error: 'Slug is required', success: false },
        { status: 400 }
      );
    }

    const views = (await redis.get<number>(`views:${slug}`)) ?? 0;

    return NextResponse.json<ViewsApiResponse>({
      views,
      success: true,
    });
  } catch (error) {
    console.error('Error fetching views:', error);
    return NextResponse.json<ViewsApiResponse>(
      { error: 'Failed to fetch views', success: false },
      { status: 500 }
    );
  }
}

/**
 * POST /api/views/[slug]
 * Increments the view count for a post
 * Includes bot filtering and duplicate prevention
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    if (!slug) {
      return NextResponse.json<ViewsApiResponse>(
        { error: 'Slug is required', success: false },
        { status: 400 }
      );
    }

    // Bot filtering
    const userAgent = request.headers.get('user-agent');
    if (isBot(userAgent)) {
      // Return current views without incrementing for bots
      const views = (await redis.get<number>(`views:${slug}`)) ?? 0;
      return NextResponse.json<ViewsApiResponse>({
        views,
        success: true,
      });
    }

    // Duplicate prevention: Check if IP already viewed within 1 minute
    const clientIp = getClientIp(request);
    const ipKey = `ip:${slug}:${clientIp}`;
    const hasViewed = await redis.get(ipKey);

    if (hasViewed) {
      // Return current views without incrementing for duplicate visits
      const views = (await redis.get<number>(`views:${slug}`)) ?? 0;
      return NextResponse.json<ViewsApiResponse>({
        views,
        success: true,
      });
    }

    // Increment view count
    const views = await redis.incr(`views:${slug}`);

    // Set IP flag with 60 second expiration
    await redis.set(ipKey, '1', { ex: 60 });

    return NextResponse.json<ViewsApiResponse>({
      views,
      success: true,
    });
  } catch (error) {
    console.error('Error incrementing views:', error);
    return NextResponse.json<ViewsApiResponse>(
      { error: 'Failed to increment views', success: false },
      { status: 500 }
    );
  }
}
