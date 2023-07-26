import { createSelector } from '@reduxjs/toolkit'
import { RootState } from './store/store'

const selectSelf = (state: RootState) => state

export const getContacts = createSelector(selectSelf, (state) =>
  [...state.contacts].sort((a, b) => (a.lastname > b.lastname ? -1 : 1))
)

export const getActivities = createSelector(
  selectSelf,
  (state) => state.activities
)

export const getContactActivities = (contactId?: string) =>
  !contactId
    ? (state: RootState) => null
    : createSelector(getActivities, (activities) =>
        activities.filter((activity) => activity.contactId === contactId)
      )

export const getContact = (contactId?: string) =>
  !contactId
    ? (state: RootState) => null
    : createSelector(getContacts, (contacts) =>
        contacts.find((contact) => contact.id === contactId)
      )
