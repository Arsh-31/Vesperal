import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { AuthProvider } from "./lib/authContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", // optional: for CSS variables
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vesperal",
  description: "Welcome, my friend",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable}`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
