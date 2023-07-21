import { useContacts } from 'App'
import React from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'

export function ContactList() {
  const contacts = useContacts()
  const { id } = useParams()
  return (
    <ListGroup variant="flush" style={{ maxHeight: '86vh', overflow: 'auto' }}>
      {Object.values(contacts)
        .sort((a, b) => (a.lastname > b.lastname ? 1 : -1))
        .map((contact) => (
          <Link to={`/contacts/${contact.id}`}>
            <ListGroupItem active={contact.id === id} key={contact.id}>
              {contact.lastname} {contact.firstname}
            </ListGroupItem>
          </Link>
        ))}
    </ListGroup>
  )
}
