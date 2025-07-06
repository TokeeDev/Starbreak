import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const faviconPath = "/favicon-aee9a0ed-fcdc-49ed-8133-923f6aa011bf";

export const metadata: Metadata = {
  title: "Starbreak - Your Vision, Our Code",
  description: "A forward-thinking development agency focused on building cutting-edge applications. We build fast and scale faster.",
  icons: {
    icon: [
      { url: `${faviconPath}/favicon.ico`, sizes: "any" },
      { url: `${faviconPath}/favicon-48x48.png`, sizes: "48x48", type: "image/png" },
      { url: `${faviconPath}/favicon-128x128.png`, sizes: "128x128", type: "image/png" },
    ],
    apple: `${faviconPath}/apple-touch-icon.png`,
  },
  manifest: `${faviconPath}/manifest.webmanifest`,
  openGraph: {
    title: "Starbreak - Your Vision, Our Code",
    description: "A forward-thinking development agency focused on building cutting-edge applications. We build fast and scale faster.",
    url: "https://starbreak.dev", // Change to your actual domain
    siteName: "Starbreak",
    images: [
      {
        url: `${faviconPath}/android-chrome-512x512.png`, // OG image
        width: 512,
        height: 512,
        alt: "Starbreak Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Starbreak - Your Vision, Our Code",
    description: "A forward-thinking development agency focused on building cutting-edge applications. We build fast and scale faster.",
    images: [`${faviconPath}/android-chrome-512x512.png`],
    creator: "@yourtwitterhandle", // Change to your Twitter handle
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
