import type { AuthState } from "./slices/auth";
import type { PaginationState } from "./slices/pagination";
import type { SortState } from "./slices/sort";

export interface RootState {
  auth: AuthState;
  pagination: PaginationState;
  sort: SortState;
} 