import "@radix-ui/themes/styles.css";
import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Theme } from "@radix-ui/themes";

import { AuthProvider } from "@/contexts/AuthProvider";
import { ServiceCarProvider } from "@/contexts/ServiceCarContext"; // Import your data context provider here

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RentMo",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Theme>
          <ServiceCarProvider>
            <AuthProvider>{children}</AuthProvider>
          </ServiceCarProvider>
        </Theme>
      </body>
    </html>
  );
}
