import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface contactType {
  firstName: string;
  lastName: string;
  isActive: boolean;
  id: string;
}

interface stateType {
  allContacts: contactType[];
}

const initialState: stateType = {
  allContacts: [],
};

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    addContact: (state, { payload }) => {
      console.log(payload);
      state.allContacts.push(payload);
    },
    editContact: (state, { payload }) => {
      state.allContacts = state.allContacts.map((contact) =>
        contact.id === payload.id ? payload : contact
      );
    },
    deleteContact: (state, { payload }) => {
      state.allContacts = state.allContacts.filter(
        (contact) => contact.id !== payload
      );
    },
  },
});
export default contactSlice.reducer;
export const { addContact, editContact, deleteContact } = contactSlice.actions;
