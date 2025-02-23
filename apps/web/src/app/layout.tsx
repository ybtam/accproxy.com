import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/style/globals.css";
import {Provider} from "@/providers/provider";
import {ReactNode} from "react";
import {auth} from "@repo/sdk/auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Accounting Proxy",
  description: "Make accounting for you and your accountant easier",
};

export default async function RootLayout({
  login,
  dashboard
}: Readonly<{
  login: ReactNode
  dashboard: ReactNode
}>) {
  const session = await auth()

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <Provider>
        {
          session?.user
            ? dashboard
            : login
        }
      </Provider>
      </body>
    </html>
  );
}
