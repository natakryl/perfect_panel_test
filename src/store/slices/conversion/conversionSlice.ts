import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { ConversionState } from './conversionType';

const initialState: ConversionState = {
  fromCurrency: '',
  toCurrency: '',
  amount: '',
  result: '',
};

const conversionSlice = createSlice({
  name: 'conversion',
  initialState,
  reducers: {
    setFromCurrency: (state, action: PayloadAction<string>) => {
      state.fromCurrency = action.payload;
    },
    setToCurrency: (state, action: PayloadAction<string>) => {
      state.toCurrency = action.payload;
    },
    setAmount: (state, action: PayloadAction<string>) => {
      state.amount = action.payload;
    },
    setResult: (state, action: PayloadAction<string>) => {
      state.result = action.payload;
    },
    resetConversion: (state) => {
      state.amount = '';
      state.result = '';
    },
  },
});

export const {
  setFromCurrency,
  setToCurrency,
  setAmount,
  setResult,
  resetConversion,
} = conversionSlice.actions;
export default conversionSlice.reducer; 