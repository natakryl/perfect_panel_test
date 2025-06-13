import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth';
import paginationReducer from './slices/pagination';
import sortReducer from './slices/sort';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    pagination: paginationReducer,
    sort: sortReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;