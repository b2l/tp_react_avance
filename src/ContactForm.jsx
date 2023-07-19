import React from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
const { Group, Label, Control } = Form;

export function ContactForm({ activeContact }) {
  return (
    <Stack>
      <h2>
        {activeContact.firstname} {activeContact.lastname}
      </h2>
      <Form>
        <Row>
          <Group as={Col} className="mb-3" controlId="formBasicFirstname">
            <Label>Firstname</Label>
            <Control type="text" placeholder="John" defaultValue={activeContact.firstname} />
          </Group>
          <Group as={Col} className="mb-3" controlId="formBasicLastname">
            <Label>Lastname</Label>
            <Control type="text" placeholder="Doe"  defaultValue={activeContact.lastname}/>
          </Group>
        </Row>
        <Group className="mb-3" controlId="formBasicEmail">
          <Label>Email address</Label>
          <Control type="email" placeholder="john.doe@gmail.com"  defaultValue={activeContact.email}/>
        </Group>
        <Group className="mb-3" controlId="formBasicPhone">
          <Label>Phone number</Label>
          <Control type="text" placeholder="0612131415"  defaultValue={activeContact.phone}/>
        </Group>
        <Row>
          <Group as={Col} className="mb-3" controlId="formBasicAddress">
            <Label>Adress</Label>
            <Control type="text" placeholder="11 av de la gare"  defaultValue={activeContact.adress}/>
          </Group>
        </Row>
        <Row>
          <Group as={Col} className="mb-3" controlId="formBasicZipCode">
            <Label>Zip code</Label>
            <Control type="text" placeholder="31000"  defaultValue={activeContact.postalZip}/>
          </Group>
          <Group as={Col} className="mb-3" controlId="formBasicCity">
            <Label>City</Label>
            <Control type="text" placeholder="Toulouse" />
          </Group>
        </Row>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Stack>
  );
}
