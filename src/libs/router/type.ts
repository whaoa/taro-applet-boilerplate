import type { navigationType } from './constant';

export interface NavigationOptions {
  path: string;
  query?: Record<string, any>;
}

export interface NavigationRoute {
  path: string;
  query: Record<string, any>;
}

export interface NavigationPipelineCtx {
  type: (typeof navigationType)[keyof typeof navigationType];
  to: NavigationRoute;
  from: NavigationRoute;
}
