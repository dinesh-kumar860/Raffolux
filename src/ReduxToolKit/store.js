import { configureStore } from '@reduxjs/toolkit';
import { cartSlice } from './cartSlice';
import accountData from './apiSlice'
import WithoutLoginCartSlice from './WithoutLoginCartSlice';

export const store = configureStore({
  reducer: {
    cartCountActive: cartSlice.reducer,
    getAccountData:accountData,
    withoutLoginCartCount:WithoutLoginCartSlice,
  },
})