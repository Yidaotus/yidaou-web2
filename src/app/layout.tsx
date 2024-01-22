import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yidaou Tech",
  description: "Personal Blog and Web by Daniel Voigt",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.className} md:h-screen grid items-center dark transition-colors`}
      >
        {children}
      </body>
    </html>
  );
}
