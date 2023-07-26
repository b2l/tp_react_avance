import { Button, Col, Form, Row, Stack } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useActiveContact } from './hooks'
import { useAppDispatch } from './store/store'
import { Contact, actions } from "./store/contactsSlice"
const { Group, Label, Control } = Form

export function ContactForm() {
  const activeContact = useActiveContact()
  const dispatch = useAppDispatch()

  const onSaveContact = (contact: Contact) => {
    dispatch(actions.contactAdded(contact))
  }

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm<Contact>({
    mode: 'onTouched',
    defaultValues: {
      ...activeContact,
    },
  })

  const firstname = watch('firstname')
  const lastname = watch('lastname')

  return (
    <Stack>
      <h2>
        {firstname} {lastname}
      </h2>
      <Form onSubmit={handleSubmit(onSaveContact)}>
        <Row>
          <Group as={Col} className="mb-3" controlId="formBasicFirstname">
            <Label>Firstname</Label>
            <Control
              type="text"
              placeholder="John"
              {...register('firstname', {
                deps: ['firsname'],
                validate: (value) => {
                  return value !== '' || getValues('lastname') !== ''
                },
              })}
            />
          </Group>
          <Group as={Col} className="mb-3" controlId="formBasicLastname">
            <Label>Lastname</Label>
            <Control
              type="text"
              placeholder="Doe"
              {...register('lastname', {
                deps: ['firsname'],
                validate: (value) => {
                  return (
                    value !== '' || getValues('firstname') !== ''
                  )
                },
              })}
            />
          </Group>
          {(errors.firstname || errors.lastname) && (
            <Form.Text className="text-danger">
              You should at least provide a firstname or a lastname
            </Form.Text>
          )}
        </Row>
        <Group className="mb-3" controlId="formBasicEmail">
          <Label>Email address</Label>
          <Control
            type="email"
            placeholder="john.doe@gmail.com"
            {...register('email')}
          />
        </Group>
        <Group className="mb-3" controlId="formBasicPhone">
          <Label>Phone number</Label>
          <Control
            type="text"
            placeholder="0612131415"
            {...register('phone')}
          />
        </Group>
        <Row>
          <Group as={Col} className="mb-3" controlId="formBasicAddress">
            <Label>Adress</Label>
            <Control
              type="text"
              placeholder="11 av de la gare"
              {...register('adress')}
            />
          </Group>
        </Row>
        <Row>
          <Group as={Col} className="mb-3" controlId="formBasicZipCode">
            <Label>Zip code</Label>
            <Control
              type="text"
              placeholder="31000"
              {...register('postalZip')}
            />
          </Group>
          <Group as={Col} className="mb-3" controlId="formBasicCity">
            <Label>City</Label>
            <Control type="text" placeholder="Toulouse" {...register('city')} />
          </Group>
        </Row>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Stack>
  )
}
