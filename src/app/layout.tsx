import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jewel ML - Basic usage example",
  description: "Jewel ML - Basic usage example",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}