import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface InviteToApplyEmailProps {
  candidateName: string | null;
  jobTitle: string;
  companyName: string;
  jobUrl: string;
  employerName: string;
}

export function InviteToApplyEmail({
  candidateName,
  jobTitle,
  companyName,
  jobUrl,
  employerName,
}: InviteToApplyEmailProps) {
  const greeting = candidateName
    ? `Dear ${candidateName}`
    : "Dear Candidate";

  return (
    <Html>
      <Head />
      <Preview>
        You&rsquo;ve been invited to apply for {jobTitle} at {companyName}
      </Preview>
      <Body style={{ fontFamily: "sans-serif", padding: "20px" }}>
        <Container>
          <Heading>You&rsquo;ve Been Invited to Apply!</Heading>
          <Section>
            <Text>{greeting},</Text>
            <Text>
              <strong>{employerName}</strong> from <strong>{companyName}</strong>{" "}
              has reviewed your profile and would like to invite you to apply for
              the position of <strong>{jobTitle}</strong>.
            </Text>
            <Text>
              Click the link below to view the full job details and submit your
              application:
            </Text>
            <Link
              href={jobUrl}
              style={{
                display: "inline-block",
                padding: "12px 24px",
                backgroundColor: "#2563eb",
                color: "#fff",
                textDecoration: "none",
                borderRadius: "6px",
                marginTop: "8px",
              }}
            >
              View Job & Apply
            </Link>
          </Section>
          <Text style={{ color: "#6b7280", fontSize: "12px", marginTop: "24px" }}>
            This invitation was sent via the GTEC Thodupuzha Job Portal. If you
            have any questions, please contact the employer directly.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export default InviteToApplyEmail;
