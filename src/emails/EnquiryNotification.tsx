import * as React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Heading,
  Text,
  Section,
} from "@react-email/components";

interface EnquiryNotificationEmailProps {
  name: string;
  phone: string;
  course: string;
  message: string | null;
  source: string;
}

export function EnquiryNotificationEmail({
  name,
  phone,
  course,
  message,
  source,
}: EnquiryNotificationEmailProps) {
  return (
    <Html>
      <Head />
      <Body
        style={{
          fontFamily: "sans-serif",
          backgroundColor: "#f4f4f4",
          padding: "20px",
        }}
      >
        <Container
          style={{
            backgroundColor: "#ffffff",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <Heading style={{ fontSize: "20px", color: "#333" }}>
            New Enquiry Received
          </Heading>
          <Section>
            <Text>
              <strong>Name:</strong> {name}
            </Text>
            <Text>
              <strong>Phone:</strong> {phone}
            </Text>
            <Text>
              <strong>Course:</strong> {course}
            </Text>
            <Text>
              <strong>Source:</strong> {source}
            </Text>
            {message ? (
              <Text>
                <strong>Message:</strong> {message}
              </Text>
            ) : null}
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
