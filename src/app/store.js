import { configureStore } from '@reduxjs/toolkit';
import contactsReducer from '../features/contactSlice.js';

export const store = configureStore({
  reducer: {
    contacts : contactsReducer
  },
});