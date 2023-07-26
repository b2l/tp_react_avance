import { useSyncExternalStore } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { RootState } from './store/store'
import { getActivities, getContact, getContactActivities } from './selectors'

export function useActivities() {
  return useSelector(getActivities)
}

export function useActiveContactActivities() {
  const { id } = useParams()
  return useSelector(getContactActivities(id))
}

export function useContacts() {
  return useSelector((state: RootState) => state.contacts)
}

export function useActiveContact() {
  const { id } = useParams()
  if (!id) throw Error("can't find contact in route")
  return useSelector(getContact(id))
}

export function useIsOnline() {
  return useSyncExternalStore(subscribeToOnline, getIsOnline)
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
