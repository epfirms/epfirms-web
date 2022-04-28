import { getSelectors } from '@ngrx/router-store';

export const {
  // Select the current route.
  selectCurrentRoute,

  // Select thecurrent route fragment.
  selectFragment,

  // Select the current route query params.
  selectQueryParams,

  // Factory function to select a query param.
  selectQueryParam,

  // Select the current route params.
  selectRouteParams,

  // Factory function to select a route param.
  selectRouteParam,

  // Select the current route data.
  selectRouteData,
  
  // Select the current url.
  selectUrl,
} = getSelectors();
