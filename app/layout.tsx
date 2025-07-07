import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from 'next/script';

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

const faviconPath = "/favicon-aee9a0ed-fcdc-49ed-8133-923f6aa011bf";

export const metadata: Metadata = {
  title: "Starbreak - Your Vision, Our Code",
  description:
    "A forward-thinking development agency focused on building cutting-edge applications. We build fast and scale faster.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://starbreak.dev", // Change to your actual domain
    title: "Starbreak - Your Vision, Our Code",
    description: "A forward-thinking development agency focused on building cutting-edge applications. We build fast and scale faster.",
    siteName: "Starbreak",
    images: [
      {
        url: `${faviconPath}/android-chrome-512x512.png`, // OG image
        width: 512,
        height: 512,
        alt: "Starbreak Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Starbreak - Your Vision, Our Code",
    description: "A forward-thinking development agency focused on building cutting-edge applications. We build fast and scale faster.",
    images: [`${faviconPath}/android-chrome-512x512.png`],
    creator: "@yourtwitterhandle", // Change to your Twitter handle
  },
  icons: {
    icon: `${faviconPath}/favicon.ico`,
    shortcut: `${faviconPath}/favicon-16x16.png`,
    apple: `${faviconPath}/apple-touch-icon.png`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          type="module"
          src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js"
          strategy="beforeInteractive"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
