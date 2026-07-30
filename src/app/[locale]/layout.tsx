import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/lib/i18n/routing";
import Script from "next/script";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GTEC Thodupuzha",
  description: "GTEC Education Centre, Thodupuzha",
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
          <Script
            id="gtec-preloader-script"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(){if(sessionStorage.getItem("gtec_preloader_shown"))return;var d=document;var s=d.createElement("style");s.textContent='#gtec-preloader-static{position:fixed;inset:0;z-index:9999;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#0b2d5e;transition:opacity .5s;font-family:system-ui,-apple-system,sans-serif}#gtec-preloader-static .ping{position:absolute;width:96px;height:96px;border-radius:50%;background:rgba(255,191,0,.2);animation:gtec-ping 1.5s cubic-bezier(0,0,.2,1)infinite}#gtec-preloader-static .circle{position:relative;display:flex;width:80px;height:80px;align-items:center;justify-content:center;border-radius:50%;background:#ffbf00}#gtec-preloader-static .circle svg{width:40px;height:40px;color:#0b2d5e}#gtec-preloader-static .title{font-size:30px;font-weight:700;color:#fff;letter-spacing:-.025em;line-height:1}#gtec-preloader-static .sub{font-size:13px;font-weight:500;color:#5b86b9;text-transform:uppercase;letter-spacing:.2em;margin-top:4px}#gtec-preloader-static .dots{margin-top:16px;display:flex;gap:6px}#gtec-preloader-static .dots span{width:8px;height:8px;border-radius:50%;background:#ffbf00;display:inline-block}#gtec-preloader-static .dots span:nth-child(2){animation-delay:.15s}#gtec-preloader-static .dots span:nth-child(3){animation-delay:.3s}@keyframes gtec-ping{75%,100%{transform:scale(2);opacity:0}}@keyframes gtec-bounce{0%,100%{transform:translateY(0);animation-timing-function:cubic-bezier(.8,0,1,1)}50%{transform:translateY(-10px);animation-timing-function:cubic-bezier(0,0,.2,1)}}#gtec-preloader-static .dots span{animation:gtec-bounce .6s infinite}';d.head.appendChild(s);var e=d.createElement("div");e.id="gtec-preloader-static";e.setAttribute("role","status");e.setAttribute("aria-label","Loading");e.innerHTML='<div style="display:flex;flex-direction:column;align-items:center;gap:32px"><div style="position:relative;display:flex;align-items:center;justify-content:center"><div class="ping"></div><div class="circle"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/></svg></div></div><div style="display:flex;flex-direction:column;align-items:center;gap:2px"><span class="title">GTEC</span><span class="sub">Thodupuzha</span></div><div class="dots"><span></span><span></span><span></span></div></div>';d.body.insertBefore(e,d.body.firstChild)})();`,
            }}
          />
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
