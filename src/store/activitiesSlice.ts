import { createSlice } from '@reduxjs/toolkit'
import data from '../contacts.json'

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
    },
  },
})

export const actions = activitiesSlice.actions
