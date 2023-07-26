import { memo } from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getContacts } from './selectors'
import { Contact } from './store/contactsSlice'
import { useQuery } from '@tanstack/react-query'

export function ContactList() {
  const navigate = useNavigate()

  const { data: contacts } = useQuery({
    queryKey: ['contacts'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3001/contacts')
      const json = await response.json() 
      return json as Contact[]
    }
  })
  const { id } = useParams()

  return (
    <ListGroup variant="flush" style={{ maxHeight: '86vh', overflow: 'auto' }}>
      {contacts?.map((contact) => (
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
