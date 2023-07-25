import { createSlice } from '@reduxjs/toolkit';
import data from '../contacts.json';


export interface Contact {
  id: string;
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  city: string;
  adress: string;
  postalZip: string;
}
export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: data.contacts as Contact[],
  reducers: {
    contactAdded(state, action) {
      // return [...state, { ...action.payload }];
      state.push(action.payload)
    },
    contactUpdated(state, action) {
      return state.map((contact) => contact.id === action.payload.id ? action.payload : contact
      );
    },
    contactDeleted(state, action) {
      return state.filter((contact) => contact.id !== action.payload.id);
    },
  },
});

export const actions = contactsSlice.actions;