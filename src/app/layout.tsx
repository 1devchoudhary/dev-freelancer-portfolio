import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Sora } from "next/font/google";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { site } from "@/content/site";
import { SITE_URL } from "@/lib/site";

import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
  variable: "--font-sora",
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-plex-sans",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500"],
  display: "swap",
  variable: "--font-plex-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${site.name} — Custom Web Applications & Automation`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: SITE_URL }],
  creator: site.name,
  keywords: [
    "freelance full-stack developer",
    "custom web application development",
    "internal tools developer",
    "workflow automation",
    "React developer",
    "Node.js developer",
    "MERN stack developer",
    "n8n automation",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: site.name,
    title: `${site.name} — Custom Web Applications & Automation`,
    description: site.description,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${site.name} — ${site.positioning}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Custom Web Applications & Automation`,
    description: site.description,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${sora.variable} ${plexSans.variable} ${plexMono.variable} h-full antialiased`}
    >
      <head>
        {/* Scroll-entry animations start at opacity 0. Without JS they would
            never resolve, so neutralise them for no-script visitors. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only rounded-md bg-white px-4 py-2 text-sm text-black focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50"
        >
          Skip to content
        </a>
        <SiteHeader />
        {/* The header is fixed and therefore out of flow, so every page needs
            its height reserved here. The hero cancels it with a negative
            margin so the 3D backdrop can run under the transparent bar. */}
        <main id="main" className="flex-1 pt-[68px]">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
