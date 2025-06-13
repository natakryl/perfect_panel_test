import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { PaginationState } from './paginationType';


const getInitialState = (): PaginationState => {
  const savedState = localStorage.getItem('pagination');
  if (savedState) {
    try {
      return JSON.parse(savedState);
    } catch (e) {
      console.error('Error parsing pagination state from localStorage:', e);
    }
  }
  return {
    page: 1,
    pageSize: 10,
    totalItems: 0,
  };
};

const initialState: PaginationState = getInitialState();

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
      
      localStorage.setItem('pagination', JSON.stringify(state));
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
      state.page = 1; 
     
      localStorage.setItem('pagination', JSON.stringify(state));
    },
    setTotalItems: (state, action: PayloadAction<number>) => {
      state.totalItems = action.payload;
     
      localStorage.setItem('pagination', JSON.stringify(state));
    },
  },
});

export const { setPage, setPageSize, setTotalItems } = paginationSlice.actions;
export default paginationSlice.reducer; 