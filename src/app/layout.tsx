import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import { Navbar } from "@/components/navbar/Navbar";
import { Footer } from "@/components/footer/Footer";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Portfolio Blog ",
  description: "Insights on Web Development, Data science & Personal Projects. Showcasing projects in data science, machine learning, and full-stack web development.",
  keywords: ["Data Science", "Web Development", "Machine Learning", "Python", "JavaScript", "Portfolio", "Next.js", "React"],
  authors: [{ name: "Andrea Zcodingstudio", url: "https://shortpathfirst.github.io/myblog/" }],
  openGraph: {
    title: "My Portfolio Blog",
    description: "Explore real-world projects and blog posts in data science and web development.",
    url: "https://shortpathfirst.github.io/myblog/",
    siteName: "My Portfolio Blog",
    images: [
      {
        url: "https://shortpathfirst.github.io/myblog/assets/preview.jpg",
        width: 1200,
        height: 630,
        alt: "Portfolio Preview Image",
      },
    ],
    type: "website",
  },
  // tiktok
  // twitter
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
          <main style={{ "flex": 1}}>
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>

  );
}
