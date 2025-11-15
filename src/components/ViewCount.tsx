'use client';

import { Eye } from 'lucide-react';
import { useViewCount } from '@/hooks/useViewCount';

interface ViewCountProps {
  slug: string;
  increment?: boolean;
  className?: string;
}

/**
 * Component to display and track post view count
 * @param slug - Post slug to track views for
 * @param increment - Whether to increment view count on mount (default: true)
 * @param className - Additional CSS classes
 */
export function ViewCount({
  slug,
  increment = true,
  className = '',
}: ViewCountProps) {
  const { views, isLoading, error } = useViewCount(slug, increment);

  // Silently fail if there's an error (don't show error to users)
  if (error) {
    return null;
  }

  return (
    <div
      className={`flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400 ${className}`}
      aria-label={`${views} views`}
    >
      <Eye className="h-4 w-4" aria-hidden="true" />
      <span>
        {isLoading ? (
          <span className="inline-block w-12 h-4 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
        ) : (
          <span className="font-medium tabular-nums">
            {views.toLocaleString()}
            {' '}
            <span className="font-normal">
              {views === 1 ? 'view' : 'views'}
            </span>
          </span>
        )}
      </span>
    </div>
  );
}
