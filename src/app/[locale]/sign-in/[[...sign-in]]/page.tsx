import { SignIn } from "@clerk/nextjs";

export default async function SignInPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignIn
        path={`/${locale}/sign-in`}
        signUpUrl={`/${locale}/portal/sign-up`}
      />
    </div>
  );
}
