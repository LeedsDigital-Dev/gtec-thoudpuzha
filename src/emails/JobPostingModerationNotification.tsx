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

interface JobPostingModerationNotificationProps {
  jobTitle: string;
  companyName: string;
  status: "APPROVED" | "REJECTED";
  rejectionReason?: string | null;
}

export function JobPostingModerationNotification({
  jobTitle,
  companyName,
  status,
  rejectionReason,
}: JobPostingModerationNotificationProps) {
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
              ? "Job Posting Approved"
              : "Job Posting Rejected"}
          </Heading>
          <Section>
            <Text>Dear Employer,</Text>
            {status === "APPROVED" ? (
              <Text>
                Your job posting for <strong>{jobTitle}</strong> at{" "}
                <strong>{companyName}</strong> has been approved and is now
                visible to candidates.
              </Text>
            ) : (
              <>
                <Text>
                  Your job posting for <strong>{jobTitle}</strong> at{" "}
                  <strong>{companyName}</strong> has been rejected.
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
