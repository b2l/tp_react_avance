import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { contactsSlice } from './contactsSlice'
import { activitiesSlice } from './activitiesSlice'

export const store = configureStore({
  reducer: {
    contacts: contactsSlice.reducer,
    activities: activitiesSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
