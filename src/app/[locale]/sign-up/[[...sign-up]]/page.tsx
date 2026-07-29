import { SignUp } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function SignUpPage(props: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ intent?: string }>;
}) {
  const { locale } = await props.params;
  const { intent } = await props.searchParams;

  if (!intent) {
    redirect(`/${locale}/portal/sign-up`);
  }

  const afterSignUpUrl = `/complete-signup?intent=${intent}`;

  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignUp fallbackRedirectUrl={afterSignUpUrl} />
    </div>
  );
}
