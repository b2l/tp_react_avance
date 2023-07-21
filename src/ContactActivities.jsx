import React from 'react'
import { Badge, Card, Stack } from 'react-bootstrap'
import data from './contacts.json'

function getBg(type) {
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

export function ContactActivities({ activeContactId }) {
  return (
    <Stack gap={3}>
      {data.activities
        .filter((activity) => activity.contactId === activeContactId)
        .sort((a, b) => {
          const dateA = new Date(a.date)
          const dateB = new Date(b.date)
          return dateA > dateB ? 1 : -1
        })
        .reverse()
        .map((activity) => (
          <Card body border={getBg(activity.type)} key={activity.id}>
            <Card.Title>
              <Badge bg={getBg(activity.type)}>{activity.type}</Badge>{' '}
              {activity.date}
            </Card.Title>
            <Card.Text>{activity.note}</Card.Text>
          </Card>
        ))}
    </Stack>
  )
}
