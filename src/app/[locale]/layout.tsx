import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/lib/i18n/routing";
import { PWARegistry } from "@/components/shared/PWARegistry";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const APP_NAME = "GTEC Thodupuzha";
const APP_DESCRIPTION =
  "G-TEC Education Centre, Thodupuzha — IT, Multimedia, Accounting & Language courses";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: APP_NAME,
  description: APP_DESCRIPTION,
  robots: {
    index: true,
    follow: true,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: APP_NAME,
  },
  formatDetection: {
    telephone: false,
  },
  other: {
    "mobile-web-app-capable": "yes",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b2d5e",
  width: "device-width",
  initialScale: 1,
};

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as never)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <ClerkProvider
      signInUrl={`/${locale}/sign-in`}
      signUpUrl={`/${locale}/portal/sign-up`}
      afterSignOutUrl={`/${locale}`}
    >
      <html
        lang={locale}
        className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased max-w-full overflow-x-clip`}
      >
        <body className="min-h-full flex flex-col w-full max-w-full overflow-x-clip relative">
          <script
            dangerouslySetInnerHTML={{
              __html:
                `(function(){var s=sessionStorage;if(s.getItem("gtec_ps"))return;try{s.setItem("gtec_ps","1")}catch(e){};var e=document.createElement("div");e.id="gtec-preloader";e.setAttribute("role","status");e.setAttribute("aria-label","Loading");e.innerHTML='<div style="position:fixed;inset:0;z-index:9999;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#0b2d5e;font-family:system-ui,-apple-system,sans-serif;transition:opacity.4s"><div style="display:flex;flex-direction:column;align-items:center;gap:1.5rem"><div style="display:flex;align-items:center;justify-content:center;width:5rem;height:5rem;border-radius:50%;background:#ffbf00"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#0b2d5e" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/></svg></div><span style="font-size:30px;font-weight:700;color:#fff;letter-spacing:-.025em">GTEC</span><span style="font-size:13px;font-weight:500;color:#5b86b9;text-transform:uppercase;letter-spacing:.2em">Thodupuzha</span></div></div>';document.body.appendChild(e);setTimeout(function(){e.style.opacity="0";setTimeout(function(){e.remove()},400)},600)})()`,
            }}
          />
          <PWARegistry>
            <NextIntlClientProvider locale={locale} messages={messages}>
              {children}
            </NextIntlClientProvider>
          </PWARegistry>
        </body>
      </html>
    </ClerkProvider>
  );
}
