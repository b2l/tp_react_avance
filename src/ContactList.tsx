import { useContacts } from './hooks'
import React, { memo, useMemo } from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { RootState } from './store/store'
import { Contact } from './store/contactsSlice'

export function ContactList() {
  const navigate = useNavigate()
  const contacts = useSelector(
    (state: RootState) =>
      [...state?.contacts].sort((a, b) => (a.lastname > b?.lastname ? 1 : -1))
  )
  const { id } = useParams()

  return (
    <ListGroup variant="flush" style={{ maxHeight: '86vh', overflow: 'auto' }}>
      {contacts.map((contact) => (
        <MemoisedContact
          contact={contact}
          isActive={contact.id === id}
          key={contact.id}
          handleClick={() => navigate(`/${contact.id}`)}
        ></MemoisedContact>
      ))}
    </ListGroup>
  )
}

type ContactItemProps = {
  contact: Contact
  isActive: boolean
  handleClick: () => void
}
const MemoisedContact = memo(function ContactItem({
  contact,
  isActive,
  handleClick,
}: ContactItemProps) {
  return (
    <ListGroupItem active={isActive} onClick={handleClick}>
      {contact.lastname} {contact.firstname}
    </ListGroupItem>
  )
})
