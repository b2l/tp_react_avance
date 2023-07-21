import React from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'

export function ContactList({ contacts, activeContactId, onSelectContact }) {
  return (
    <ListGroup variant="flush" style={{ maxHeight: '86vh', overflow: 'auto' }}>
      {Object.values(contacts).map((contact) => (
        <ListGroupItem
          onClick={(e) => onSelectContact(contact)}
          active={contact.id === activeContactId}
          key={contact.id}
        >
          {contact.firstname} {contact.lastname}
        </ListGroupItem>
      ))}
    </ListGroup>
  )
}
