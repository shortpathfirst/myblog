import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import Footer from "@/ui/components/footer/Footer";
import Navbar from "@/ui/components/navbar/Navbar";

const geistSans = localFont({
  src: "../../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "My Next.js Blog",
  description: "my persona blog",
  icons: {
    icon: ["icons/favicon.ico"],
  },
  // manifest:"./manifest.json"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div style={{ "display": "flex", "flexDirection": "column", "minHeight": "100svh" }}>
          <Navbar></Navbar>
          <main style={{ "flex": 1 }}>
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
