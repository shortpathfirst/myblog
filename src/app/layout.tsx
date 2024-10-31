import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "../ui/components/footer/Footer";
import Navbar from "@/ui/components/navbar/Navbar";
import PageContainer from "@/ui/components/page-container/PageContainer";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Next.js Blog",
  description: "my persona blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div style={{ "display": "flex", "flexDirection": "column", "minHeight": "100svh"}}>
          <Navbar></Navbar>
            <main style={{ "flex": 1 }}>
    <PageContainer>
              {children}</PageContainer>
            </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
