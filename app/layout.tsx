import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/AuthProvider";
import AdminProvider from "@/lib/AdminProvider";
import Head from "next/head";
import Script from "next/script";
import "react-quill/dist/quill.snow.css";

// import { GoogleAnalytics } from "@next/third-parties/google";

const inter = Inter({ subsets: ["latin"] });
export const runtime = "edge";

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
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-1LEHWGE64V"
        ></Script>
        <Script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-1LEHWGE64V');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <AdminProvider>{children}</AdminProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
