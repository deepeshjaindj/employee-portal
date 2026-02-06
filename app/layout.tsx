import type { Metadata } from "next";
import { Sora, DM_Sans } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/lib/query-provider";
import { SessionProvider } from "@/lib/session-provider";
import { Header } from "@/components/layout/header";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "OneSolve: Employee Portal",
  description: "Employee Portal for OneSolve",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${sora.variable} ${dmSans.variable} antialiased grain-overlay`}
      >
        <SessionProvider>
          <QueryProvider>
            <Header />
            {children}
          </QueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
