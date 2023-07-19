import React, { useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
const { Group, Label, Control } = Form;

export function ContactForm({ activeContact, onSaveContact }) {
  const [firstname, setFirstname] = useState(activeContact.firstname);
  const [lastname, setLastname] = useState(activeContact.lastname);
  const [email, setEmail] = useState(activeContact.email);
  const [phone, setPhone] = useState(activeContact.phone);
  const [adress, setAdress] = useState(activeContact.adress);
  const [postalZip, setPostalZip] = useState(activeContact.postalZip);
  const [city, setCity] = useState(activeContact.city);

  const mapping = {
    firstname: setFirstname,
    lastname: setLastname,
    email: setEmail,
    phone: setPhone,
    adress: setAdress,
    postalZip: setPostalZip,
    city: setCity,
  };

  const onFieldChangeGenerator = (fieldName) => (e) =>
    mapping[fieldName](e.target.value);

  function handleSaveContact(e) {
    e.preventDefault()
    onSaveContact({
      id: activeContact.id,
      firstname,
      lastname,
      email,
      phone,
      adress,
      postalZip,
      city
    })
  }

  return (
    <Stack>
      <h2>
        {firstname} {lastname}
      </h2>
      <Form onSubmit={handleSaveContact}>
        <Row>
          <Group as={Col} className="mb-3" controlId="formBasicFirstname">
            <Label>Firstname</Label>
            <Control
              type="text"
              placeholder="John"
              value={firstname}
              onChange={onFieldChangeGenerator("firstname")}
            />
          </Group>
          <Group as={Col} className="mb-3" controlId="formBasicLastname">
            <Label>Lastname</Label>
            <Control
              type="text"
              placeholder="Doe"
              value={lastname}
              onChange={onFieldChangeGenerator("lastname")}
            />
          </Group>
        </Row>
        <Group className="mb-3" controlId="formBasicEmail">
          <Label>Email address</Label>
          <Control
            type="email"
            placeholder="john.doe@gmail.com"
            value={email}
            onChange={onFieldChangeGenerator("email")}
          />
        </Group>
        <Group className="mb-3" controlId="formBasicPhone">
          <Label>Phone number</Label>
          <Control
            type="text"
            placeholder="0612131415"
            value={phone}
            onChange={onFieldChangeGenerator("phone")}
          />
        </Group>
        <Row>
          <Group as={Col} className="mb-3" controlId="formBasicAddress">
            <Label>Adress</Label>
            <Control
              type="text"
              placeholder="11 av de la gare"
              value={adress}
              onChange={onFieldChangeGenerator("adress")}
            />
          </Group>
        </Row>
        <Row>
          <Group as={Col} className="mb-3" controlId="formBasicZipCode">
            <Label>Zip code</Label>
            <Control
              type="text"
              placeholder="31000"
              value={postalZip}
              onChange={onFieldChangeGenerator("postalZip")}
            />
          </Group>
          <Group as={Col} className="mb-3" controlId="formBasicCity">
            <Label>City</Label>
            <Control
              type="text"
              placeholder="Toulouse"
              value={city}
              onChange={onFieldChangeGenerator("city")}
            />
          </Group>
        </Row>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Stack>
  );
}
