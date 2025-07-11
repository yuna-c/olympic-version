import { configureStore } from '@reduxjs/toolkit';
import olympicReducer from './../slices/OlympicSlice';
// yarn add react-redux @reduxjs/toolkit

export const store = configureStore({
  reducer: {
    olympic: olympicReducer
  }
});
