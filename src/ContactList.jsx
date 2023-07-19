import React from "react";
import {
  ListGroup,
  ListGroupItem
} from "react-bootstrap";

export function ContactList({contacts, activeContact, onSelectContact}) {
  return (<ListGroup variant="flush">
    {contacts.map((contact) => (
      <ListGroupItem onClick={e => onSelectContact(contact)} active={contact.id === activeContact.id} key={contact.id}>
        {contact.firstname} {contact.lastname}
      </ListGroupItem>
    ))}
  </ListGroup>);
}
