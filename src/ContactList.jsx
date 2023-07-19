import React from "react";
import {
  ListGroup,
  ListGroupItem
} from "react-bootstrap";
import data from "./contacts.json";

export function ContactList({activeContact}) {
  return (<ListGroup variant="flush">
    {data.contacts.map((contact) => (
      <ListGroupItem active={contact.id === activeContact.id} key={contact.id}>
        {contact.firstname} {contact.lastname}
      </ListGroupItem>
    ))}
  </ListGroup>);
}
