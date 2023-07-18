import React from "react";
import {
  Nav,
  Container,
  Navbar,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Badge,
  Card,
  Button,
  Stack,
} from "react-bootstrap";
import data from "./contacts.json";

function getBg(type) {
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

const activeContact = data.contacts[3]

function App() {
  return (
    <Stack gap={3}>
      <Navbar className="bg-body-tertiary" data-bs-theme="dark">
        <Container fluid='lg'>
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
      <Container fluid='lg'>
        <Row>
          <Col xs={3}>
            <Stack gap={3}>
            <Button variant="outline-primary" style={{margin: 'auto', display: 'block'}}>+ Create contact</Button>
              <ListGroup variant="flush">
                {data.contacts.map((contact) => (
                  <ListGroupItem active={contact.id ===activeContact.id} key={contact.id}>
                    {contact.firstname} {contact.lastname}
                  </ListGroupItem>
                ))}
              </ListGroup>
              </Stack>
          </Col>
          <Col>
            <main>
              <h2>{activeContact.firstname} {activeContact.lastname}</h2>
            </main>
          </Col>
          <Col xs={3}>
            <h3>Activités</h3>
            {data.activities
              .filter((activity) => activity.contactId === activeContact.id)
              .map((activity) => (
                <Card body border={getBg(activity.type)} key={activity.id}>
                  <Card.Title>
                    <Badge bg={getBg(activity.type)}>{activity.type}</Badge>
                    {' '}
                    {activity.date}
                  </Card.Title>
                  <Card.Text>{activity.note}</Card.Text>
                </Card>
              ))}
          </Col>
        </Row>
      </Container>
    </Stack>
  );
}

export default App;
