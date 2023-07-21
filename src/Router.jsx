import React, { createContext, useContext, useSyncExternalStore } from 'react'
import { Nav } from 'react-bootstrap'
import { match } from 'path-to-regexp'

const RouterContext = createContext(null)

function createRouter() {
  const router = {
    listeners: [],
    subscribe: (callback) => router.listeners.push(callback),
    unsubscribe: (callback) =>
      router.listeners.filter((listener) => listener !== callback),
    push: (path) => {
      window.history.pushState({}, '', path)
      router.listeners.forEach((sub) => sub())
    },
  }
  return router
}

export function useRouter() {
  return useContext(RouterContext)
}

export function useLocationPath() {
  const router = useContext(RouterContext)
  return useSyncExternalStore(subscribeWithRouter(router), getLocationPath)
}

export function useIsRouteMatching(path) {
  const locationPath = useLocationPath()
  const matcher = match(path)
  const matches = matcher(locationPath)
  console.log(path, locationPath, matches)
  return matches !== false
}

const getLocationPath = () => window.location.pathname
const subscribeWithRouter = (router) => (callback) => {
  router.subscribe(callback)
  return () => router.unsubscribe(callback)
}

export function RouterProvider(props) {
  const router = createRouter()
  return (
    <RouterContext.Provider value={router}>
      {props.children}
    </RouterContext.Provider>
  )
}

export function Link(props) {
  const router = useRouter()
  const isActive = useIsRouteMatching(props.to)
  function handleClick(e) {
    e.preventDefault()
    router.push(props.to)
  }

  return (
    <Nav.Link active={isActive} href={props.to} onClick={handleClick}>
      {props.children}
    </Nav.Link>
  )
}

export function Route({ path, children }) {
  const isActive = useIsRouteMatching(path)
  return isActive && children
}
