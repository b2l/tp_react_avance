import { createSlice } from '@reduxjs/toolkit'
import data from '../contacts.json'
import { actions as contactsActions } from './contactsSlice'
const contactDeleted = contactsActions.contactDeleted
export interface Activity {
  note: string
  id: string
  date: string
  contactId: string
  type: 'note' | 'phone' | 'email'
}
export const activitiesSlice = createSlice({
  name: 'activities',
  initialState: data.activities as Activity[],
  reducers: {
    activityAdded(state, action) {
      return [...state, { ...action.payload }]
    },
    activityDeleted(state, action) {
      return state.filter((activity) => activity.id !== action.payload.id)
    }
  },
  extraReducers: (builder) =>
    builder.addCase(contactDeleted, (state, action) => {
    }),
})

export const actions = activitiesSlice.actions
