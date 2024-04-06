import { createSlice } from '@reduxjs/toolkit';
import { INITIAL_STATE } from './initial_state.js';

const contactsSlice = createSlice({
  name: 'contactsSlice',
  initialState: { contactsList: INITIAL_STATE.contacts.items },
  reducers: {
    addContact: {
      reducer(state, action) {
        state.contactsList.push(action.payload);
      },
      prepare(contactData) {
        return {
          payload: { ...contactData },
        };
      },
    },
    deleteContact(state, action) {
      return {
        ...state,
        contactsList: state.contactsList.filter(
          user => user.id !== action.payload
        ),
      };
    },
  },
});

export const contactsReducer = contactsSlice.reducer;
export const { addContact, deleteContact } = contactsSlice.actions;
