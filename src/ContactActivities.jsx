import React from "react";
import {
  Badge,
  Card, Stack
} from "react-bootstrap";
import data from "./contacts.json";
import { getBg } from "App";

export function ContactActivities({activeContact}) {
  return (
    <Stack gap={3}>
      {data.activities
        .filter((activity) => activity.contactId === activeContact.id)
        .map((activity) => (
          <Card body border={getBg(activity.type)} key={activity.id}>
            <Card.Title>
              <Badge bg={getBg(activity.type)}>{activity.type}</Badge>{" "}
              {activity.date}
            </Card.Title>
            <Card.Text>{activity.note}</Card.Text>
          </Card>
        ))}
    </Stack>
  );
}
