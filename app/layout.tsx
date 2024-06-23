import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/AuthProvider";
import AdminProvider from "@/lib/AdminProvider";
import Head from "next/head";
import Script from "next/script";

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
      <Head>
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALITICS}`}
        ></Script>
        <Script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config',${process.env.GOOGLE_ANALYTICS});
          `}
        </Script>
      </Head>
      <body className={inter.className}>
        <AuthProvider>
          <AdminProvider>{children}</AdminProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
