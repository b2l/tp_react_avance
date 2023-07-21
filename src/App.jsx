import React, {
  useState,
} from 'react'
import { Nav, Container, Navbar, Col, Button, Stack } from 'react-bootstrap'
import data from './contacts.json'
import { ContactList } from 'ContactList'
import { ContactForm } from 'ContactForm'
import { ContactActivities } from 'ContactActivities'
import 'main.css'
import { nanoid } from '@reduxjs/toolkit'
import { Link, Route, RouterProvider, useRouter } from 'Router'

const normalizedContacts = data.contacts.reduce((acc, contact) => {
  acc[contact.id] = contact
  return acc
}, {})

function App() {
  const [contacts, setContacts] = useState(normalizedContacts)
  const [activeContactId, setActiveContactId] = useState(data.contacts[0].id)

  const activeContact = activeContactId
    ? contacts[activeContactId]
    : {
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        adress: '',
        postalZip: '',
        city: '',
      }

  function saveContact(contact) {
    const id = activeContactId === null ? nanoid() : activeContactId
    const newContacts = { ...contacts, [id]: { ...contact, id } }
    setContacts(newContacts)
    setActiveContactId(id)
  }

  return (
    <Stack gap={3}>
      <Navbar className="bg-body-tertiary" data-bs-theme="dark">
        <Container fluid="lg">
          <Navbar.Brand href="#home">CRM</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link to="/contacts">Contacts</Link>
              <Link to="/activities">Activités</Link>
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
          <Route path="/contacts/:id">
            <Col xs={3}>
              <Stack gap={3}>
                <Button
                  variant="outline-primary"
                  style={{ margin: 'auto', display: 'block' }}
                  onClick={(e) => setActiveContactId(null)}
                >
                  + Create contact
                </Button>
                <ContactList
                  onSelectContact={(contact) => setActiveContactId(contact.id)}
                  activeContactId={activeContactId}
                  contacts={contacts}
                />
              </Stack>
            </Col>
            <Col>
              <ContactForm
                key={activeContactId}
                activeContact={activeContact}
                onSaveContact={saveContact}
              />
            </Col>
            <Col xs={3}>
              <h3>Activités</h3>
              <ContactActivities activeContactId={activeContactId} />
            </Col>
          </Route>
          <Route path="/activities">Hello activities</Route>
        </Stack>
      </Container>
    </Stack>
  )
}

export default () => (
  <RouterProvider>
    <App />
  </RouterProvider>
)
