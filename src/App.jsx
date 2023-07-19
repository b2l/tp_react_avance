import React from "react";
import {
  Nav,
  Container,
  Navbar,
  Row,
  Col,
  Button,
  Stack,
} from "react-bootstrap";
import data from "./contacts.json";
import { ContactList } from "ContactList";
import { ContactForm } from "ContactForm";
import { ContactActivities } from "ContactActivities";

export function getBg(type) {
  switch (type) {
    case "note": {
      return "info";
    }
    case "email": {
      return "dark";
    }
    case "phone": {
      return "success";
    }
    default:
      throw Error(`Unexpected activity type ${type}`);
  }
}

const activeContact = data.contacts[3];

function App() {
  return (
    <Stack gap={3}>
      <Navbar className="bg-body-tertiary" data-bs-theme="dark">
        <Container fluid="lg">
          <Navbar.Brand href="#home">CRM</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#contacts">Contacts</Nav.Link>
              <Nav.Link href="#activities">Activités</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container fluid="lg">
        <Row>
          <Col xs={3}>
            <Stack gap={3}>
              <Button
                variant="outline-primary"
                style={{ margin: "auto", display: "block" }}
              >
                + Create contact
              </Button>
              <ContactList activeContact={activeContact} />
            </Stack>
          </Col>
          <Col>
            <ContactForm activeContact={activeContact} />
          </Col>
          <Col xs={3}>
            <h3>Activités</h3>
            <ContactActivities activeContact={activeContact} />
          </Col>
        </Row>
      </Container>
    </Stack>
  );
}

export default App;
