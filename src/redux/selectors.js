import { createSelector } from '@reduxjs/toolkit';

export const contactsSelector = state => state.contacts.contacts.items;

export const loaderSelector = state => state.contacts.contacts.loading;

export const errorSelector = state => state.contacts.contacts.error;

export const filterSelector = state => state.filters.query;

export const selectFilteredContacts = createSelector(
  [contactsSelector, filterSelector],
  (contactsData, filter) => {
    if (filter === '') return contactsData;
    return contactsData.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }
);
