import styled from '@emotion/styled'
import { nanoid } from '@reduxjs/toolkit'
import { FormEvent, ReactNode, useState } from 'react'
import { Badge, Button, Card, Form, Stack } from 'react-bootstrap'
import ReactDOM from 'react-dom'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { Activity, actions } from './store/activitiesSlice'
import { useActiveContactActivities } from './hooks'
import { useAppDispatch } from './store/store'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
const { Group, Label, Control } = Form

function getBg(type: Activity['type']) {
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

export function ContactActivities() {
  const { id } = useParams()
  const url = `http://localhost:3001/activities?contactId=${id}`
  const { data: activities } = useQuery({
    queryKey: ['activities', id],
    queryFn: async () => {
      const response = await fetch(url)
      const json = await response.json()
      return json as Activity[]
    },
  })

  const queryClient = useQueryClient()

  const saveActivity = useMutation({
    mutationFn: async (activity: Partial<Activity>) => {
      const response = await fetch('http://localhost:3001/activities', {
        method: 'POST',
        body: JSON.stringify(activity),
        headers: { 'content-type': 'application/json'}
      })
      if (response.status !== 201) throw new Error("Can't save activity")

      queryClient.invalidateQueries(['activities', id])
    },
  })

  const dispatch = useAppDispatch()
  const [isOpen, setIsOpen] = useState(false)

  function onSave(data: Partial<Activity>) {
    saveActivity.mutate({
      ...data,
      date: new Date().toISOString(),
      contactId: id,
    })
    setIsOpen(false)
  }

  function onDeleteActivity(activity: Activity) {
    if (window.confirm('are you sure ?'))
      dispatch(actions.activityDeleted(activity))
  }

  return (
    <Stack gap={3}>
      <Button onClick={() => setIsOpen(true)}>+ Add an activity</Button>

      {isOpen &&
        ReactDOM.createPortal(
          <Modal onClose={() => setIsOpen(false)} title={'New activity'}>
            <ActivityForm onSave={onSave} />
          </Modal>,
          document.body
        )}

      {activities?.map((activity) => (
        <Card body border={getBg(activity.type)} key={activity.id}>
          <Card.Title>
            <Badge bg={getBg(activity.type)}>{activity.type}</Badge>{' '}
            {activity.date}
          </Card.Title>
          <Card.Text>{activity.note}</Card.Text>
          <Card.Footer>
            <Button onClick={() => onDeleteActivity(activity)}>delete</Button>
          </Card.Footer>
        </Card>
      ))}
    </Stack>
  )
}

type ModalProps = {
  title: ReactNode
  onClose: () => void
  children: ReactNode
}
function Modal(props: ModalProps) {
  return (
    <StyledModal>
      <ModalHeader>
        <div>{props.title}</div>
        <button onClick={props.onClose}>x</button>
      </ModalHeader>
      {props.children}
    </StyledModal>
  )
}

const ModalHeader = styled.div`
  display: flex;
`

const StyledModal = styled.div`
  position: absolute;
  width: 50vw;
  height: auto;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  background: white;
  padding: 1rem;
  z-index: 1000;
`

type ActivityFormProps = {
  onSave: (formData: Partial<Activity>) => void
}

function ActivityForm(props: ActivityFormProps) {
  const { register, handleSubmit, watch} = useForm()
  const type = watch('type')
  const date = watch('date')
  const phone = watch('phone')

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    props.onSave({type, date}) 
  }

  return (
    <Form onSubmit={onSubmit}>
      <Group controlId="type">
        <Label> Type</Label>
        <Control {...register('type')} />
      </Group>
      <Group controlId="note">
        <Label>Note</Label>
        <Control {...register('note')} />
      </Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
}
