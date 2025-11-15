/**
 * View count types for blog post analytics
 */

export interface ViewsResponse {
  views: number;
  success: boolean;
}

export interface ViewsError {
  error: string;
  success: false;
}

export type ViewsApiResponse = ViewsResponse | ViewsError;
