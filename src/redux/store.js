import { configureStore } from '@reduxjs/toolkit';
import { contactsReducer } from './contactsSlice';
import { filterReducer } from './filtersSlice';

export const store = configureStore({
  reducer: {
    filters: filterReducer,
    contacts: contactsReducer,
  },
});
