'use client';

import { useEffect, useState } from 'react';
import type { ViewsApiResponse } from '@/types/views';

interface UseViewCountReturn {
  views: number;
  isLoading: boolean;
  error: string | null;
}

/**
 * Custom hook to fetch and increment post view count
 * @param slug - The post slug to track views for
 * @param increment - Whether to increment view count on mount (default: true)
 * @returns View count, loading state, and error state
 */
export function useViewCount(
  slug: string,
  increment: boolean = true
): UseViewCountReturn {
  const [views, setViews] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchAndIncrementViews() {
      try {
        setIsLoading(true);
        setError(null);

        if (increment) {
          // POST to increment view count
          const response = await fetch(`/api/views/${slug}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data: ViewsApiResponse = await response.json();

          if (isMounted) {
            if ('views' in data && data.success) {
              setViews(data.views);
            } else {
              setError('error' in data ? data.error : 'Unknown error');
            }
          }
        } else {
          // GET to fetch current view count without incrementing
          const response = await fetch(`/api/views/${slug}`);

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data: ViewsApiResponse = await response.json();

          if (isMounted) {
            if ('views' in data && data.success) {
              setViews(data.views);
            } else {
              setError('error' in data ? data.error : 'Unknown error');
            }
          }
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to fetch views');
          console.error('Error fetching views:', err);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    if (slug) {
      fetchAndIncrementViews();
    } else {
      setIsLoading(false);
      setError('Slug is required');
    }

    return () => {
      isMounted = false;
    };
  }, [slug, increment]);

  return { views, isLoading, error };
}
