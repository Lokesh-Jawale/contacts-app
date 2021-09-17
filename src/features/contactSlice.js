import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    contactsData: [],
    currentContact: null,
}

const contactSlice = createSlice({
    name: "contacts",
    initialState,
    reducers: {
        saveContact(state, action){
            state.contactsData = action.payload;
        },
        saveCurrentContact(state, action){
            state.currentContact = action.payload;
        }
    }
});

export const {
    saveContact, saveCurrentContact
} = contactSlice.actions

export const selectContactData = state => state.contacts.contactsData;
export const selectCurrentContact = state => state.contacts.currentContact;

export default contactSlice.reducer