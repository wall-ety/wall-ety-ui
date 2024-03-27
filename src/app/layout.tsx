import type { Metadata } from "next";

import { Provider } from "./provider";

import "./globals.css";

export const metadata: Metadata = {
  title: "Wallety",
  description: "Application to manager your money",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "sans-serif" }}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
