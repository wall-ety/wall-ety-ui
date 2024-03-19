import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Providers } from "./providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className} style={{ backgroundColor: "#f3f3f3" }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
