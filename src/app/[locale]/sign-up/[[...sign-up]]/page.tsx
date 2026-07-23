import { SignUp } from "@clerk/nextjs";

export default async function SignUpPage(props: {
  searchParams: Promise<{ intent?: string }>;
}) {
  const { intent } = await props.searchParams;
  const afterSignUpUrl = intent
    ? `/complete-signup?intent=${intent}`
    : "/";

  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignUp fallbackRedirectUrl={afterSignUpUrl} />
    </div>
  );
}
