import React, { createContext, useContext, useState } from 'react'
import { Nav, Container, Navbar, Col, Button, Stack } from 'react-bootstrap'
import data from './contacts.json'
import { ContactList } from 'ContactList'
import { ContactForm } from 'ContactForm'
import { ContactActivities } from 'ContactActivities'
import 'main.css'
import { nanoid } from '@reduxjs/toolkit'
import {
  Link,
  Outlet,
  RouterProvider,
  createBrowserRouter,
  useNavigate,
  useParams,
} from 'react-router-dom'

const normalizedContacts = data.contacts.reduce((acc, contact) => {
  acc[contact.id] = contact
  return acc
}, {})

function RoutedApp() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: 'contacts?/:id',
          element: <Contacts />,
        },
      ],
    },
  ])

  return (
    <ContactsProvider>
      <RouterProvider router={router} />
    </ContactsProvider>
  )
}

export function useContacts() {
  const [contacts, setContacts] = useContext(contactsContext)
  return contacts
}

export function useSaveContact() {
  const [contacts, setContacts] = useContext(contactsContext)
  const navigate = useNavigate()

  return function saveContact(contact) {
    const newContacts = { ...contacts, [contact.id]: { ...contact} }
    setContacts(newContacts)
    navigate(`/contacts/${contact.id}`) 
  }
}

export function useActiveContact() {
  const { id } = useParams()
  const contacts = useContacts()
  return id !== 'new'
    ? contacts[id]
    : {
        id: nanoid(),
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
        city: '',
        adress: '',
        postalZip: '',
      }
}

const contactsContext = createContext(null)

function ContactsProvider(props) {
  const contactsState = useState(normalizedContacts)
  return (
    <contactsContext.Provider value={contactsState}>
      {props.children}
    </contactsContext.Provider>
  )
}

function ErrorPage() {
  return (
    <Layout>
      <h1>Page not found</h1>
    </Layout>
  )
}

function Layout(props) {
  return (
    <Stack gap={3}>
      <Navbar className="bg-body-tertiary" data-bs-theme="dark">
        <Container fluid="lg">
          <Navbar.Brand href="#home">CRM</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/contacts">
                Contacts
              </Nav.Link>
              <Nav.Link as={Link} to="/activities">
                Activités
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container fluid="lg">
        <Stack
          direction="horizontal"
          gap={3}
          style={{ alignItems: 'flex-start' }}
        >
          <Col xs={3}>
            <Stack gap={3}>
              <Link
                style={{ margin: 'auto', display: 'block' }}
                to="/contacts/new"
              >
                + Create contact
              </Link>
              <ContactList/>
            </Stack>
          </Col>
          {props.children ?? <Outlet />}
        </Stack>
      </Container>
    </Stack>
  )
}

function Contacts() {
  const {id} = useParams()
  return (
    <>
      <Col>
        <ContactForm key={id} />
      </Col>
      <Col xs={3}>
        <h3>Activités</h3>
        <ContactActivities />
      </Col>
    </>
  )
}

export default RoutedApp
