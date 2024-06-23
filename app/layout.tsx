import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/AuthProvider";
import AdminProvider from "@/lib/AdminProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DesignoBit",
  description:
    "Browse through our expertly curated articles on technology, gaming, and finance. from cutting-edge tech trends and gaming tips to smart money management strategies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <AdminProvider>{children}</AdminProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
