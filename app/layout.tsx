import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/lib/query-provider";
import { SessionProvider } from "@/lib/session-provider";
import { Header } from "@/components/layout/header";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
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
        className={`${outfit.variable} ${jakarta.variable} antialiased grain-overlay`}
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
