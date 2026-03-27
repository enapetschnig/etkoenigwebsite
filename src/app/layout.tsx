import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { headers } from "next/headers";
import { LayoutShell } from "@/components/layout-shell";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Elektriker im Murtal in der Steiermark | ET König GmbH",
    template: "%s | ET König GmbH",
  },
  description:
    "Ihr Elektriker und Installateur in der Steiermark & Kärnten. Elektroinstallation, Photovoltaik und HLS – über 15.000 Projekte seit 2013. ET König GmbH Murau, Scheifling & Feldkirchen.",
  keywords: [
    "Elektriker Steiermark",
    "Elektroinstallation Murau",
    "Photovoltaik Steiermark",
    "Installateur Kärnten",
    "HLS Steiermark",
    "Haustechnik Murau",
    "ET König",
    "Elektro Scheifling",
    "PV-Anlage Steiermark",
  ],
  openGraph: {
    type: "website",
    locale: "de_AT",
    siteName: "ET König GmbH",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";
  const isAdmin = pathname.startsWith("/admin");

  return (
    <html lang="de" className={`${outfit.variable} ${geistMono.variable}`}>
      <head>
        <script src="https://static.elfsight.com/platform/platform.js" async></script>
      </head>
      <body className="min-h-dvh flex flex-col">
        <LayoutShell isAdmin={isAdmin}>{children}</LayoutShell>
      </body>
    </html>
  );
}
