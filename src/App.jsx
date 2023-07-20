import React, { useState } from 'react'
import {
  Nav,
  Container,
  Navbar,
  Col,
  Button,
  Stack,
} from 'react-bootstrap'
import data from './contacts.json'
import { ContactList } from 'ContactList'
import { ContactForm } from 'ContactForm'
import { ContactActivities } from 'ContactActivities'
import 'main.css'
import { nanoid } from '@reduxjs/toolkit'

export function getBg(type) {
  switch (type) {
    case 'note': {
      return 'info'
    }
    case 'email': {
      return 'dark'
    }
    case 'phone': {
      return 'success'
    }
    default:
      throw Error(`Unexpected activity type ${type}`)
  }
}

function App() {
  const [contacts, setContacts] = useState(data.contacts)
  const [activeContactId, setActiveContactId] = useState(data.contacts[0].id)

  const activeContact = activeContactId
    ? contacts.find((contact) => contact.id === activeContactId)
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
    if (activeContactId === null) {
      const newContact = { ...contact, id: nanoid() }
      setContacts([...contacts, { ...newContact }])
      setActiveContactId(newContact.id)
    } else {
      setContacts(contacts.map((c) => (c.id === activeContactId ? contact : c)))
    }
  }

  return (
    <Stack gap={3}>
      <Navbar className="bg-body-tertiary" data-bs-theme="dark">
        <Container fluid="lg">
          <Navbar.Brand href="#home">CRM</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#contacts">Contacts</Nav.Link>
              <Nav.Link href="#activities">Activités</Nav.Link>
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
              <Button
                variant="outline-primary"
                style={{ margin: 'auto', display: 'block' }}
                onClick={(e) => setActiveContactId(null)}
              >
                + Create contact
              </Button>
              <ContactList
                onSelectContact={(contact) =>
                  setActiveContactId(contact.id)
                }
                activeContact={activeContact}
                contacts={contacts}
              />
            </Stack>
          </Col>
          <Col>
            <ContactForm
              key={activeContact.id}
              activeContact={activeContact}
              onSaveContact={saveContact}
            />
          </Col>
          <Col xs={3}>
            <h3>Activités</h3>
            <ContactActivities activeContactId={activeContactId} />
          </Col>
        </Stack>
      </Container>
    </Stack>
  )
}

export default App
