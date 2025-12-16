// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productsSlice';
import salesReducer from './salesReducer';
import customersReducer from './customersSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    sales: salesReducer,
    customers: customersReducer,
  },
});