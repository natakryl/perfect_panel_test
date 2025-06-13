import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { SortState } from './sortType';

const initialState: SortState = {
  field: 'rate',
  direction: null,
};

const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    setSort: (state, action: PayloadAction<SortState['direction']>) => {
      state.direction = action.payload;
    },
    resetSort: (state) => {
      state.direction = null;
    },
  },
});

export const { setSort, resetSort } = sortSlice.actions;
export default sortSlice.reducer; 