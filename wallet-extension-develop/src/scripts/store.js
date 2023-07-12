import { configureStore } from '@reduxjs/toolkit';
import keysReducer from './keysSlice';

const store = configureStore({
  reducer: {
    keys: keysReducer,
  },
});

export default store;
