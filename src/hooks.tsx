import { useSyncExternalStore } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { RootState } from './store/store'

export function useActivities() {
  return useSelector((state: RootState) => state.activities)
}

export function useActiveContactActivities() {
  const { id } = useParams()
  return useSelector((state: RootState) =>
    state.activities.filter((activity) => activity.contactId === id)
  )
}

export function useContacts() {
  return useSelector((state: RootState) => state.contacts)
}

export function useActiveContact() {
  const { id } = useParams()
  return useSelector((state: RootState) =>
    state.contacts.find((contact) => contact.id === id)
  )
}

function subscribeToOnline(callback: () => void) {
  window.addEventListener('online', callback)
  window.addEventListener('offline', callback)
  return () => {
    window.removeEventListener('online', callback)
    window.removeEventListener('offline', callback)
  }
}

function getIsOnline() {
  return window.navigator.onLine
}

export function useIsOnline() {
  return useSyncExternalStore(subscribeToOnline, getIsOnline)
}
