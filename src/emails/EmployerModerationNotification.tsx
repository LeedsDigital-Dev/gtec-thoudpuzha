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

interface EmployerModerationNotificationProps {
  companyName: string;
  contactPersonName: string;
  status: "APPROVED" | "REJECTED";
  rejectionReason?: string | null;
}

export function EmployerModerationNotification({
  companyName,
  contactPersonName,
  status,
  rejectionReason,
}: EmployerModerationNotificationProps) {
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
            {status === "APPROVED"
              ? "Employer Registration Approved"
              : "Employer Registration Rejected"}
          </Heading>
          <Section>
            <Text>Dear {contactPersonName},</Text>
            {status === "APPROVED" ? (
              <Text>
                Your employer registration for <strong>{companyName}</strong> has
                been approved. You can now post vacancies and search for
                candidates.
              </Text>
            ) : (
              <>
                <Text>
                  Your employer registration for <strong>{companyName}</strong>{" "}
                  has been rejected.
                </Text>
                {rejectionReason ? (
                  <Text>
                    <strong>Reason:</strong> {rejectionReason}
                  </Text>
                ) : null}
              </>
            )}
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
