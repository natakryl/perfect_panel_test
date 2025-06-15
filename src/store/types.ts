import type { AuthState } from "./slices/auth";
import type { SortState } from "./slices/sort";

export interface RootState {
  auth: AuthState;
  sort: SortState;
} 