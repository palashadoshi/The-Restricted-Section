import type { Metadata } from "next";
import { Silkscreen } from "next/font/google";
import "./globals.css";

const silkscreen = Silkscreen({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-silkscreen",
});

export const metadata: Metadata = {
  title: "The Restricted Section",
  description: "A Socratic debate app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={silkscreen.variable}>
        {children}
      </body>
    </html>
  );
}