import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SamBlogs - Where Blogger's Dreams Come True",
  description: "SamBlogs is your ultimate destination for fresh, engaging content across technology, lifestyle, travel, and more. Discover insightful articles, stay updated on the latest trends, and find inspiration daily.",
  icons: {
    icon: '/SB.svg',
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} dark-theme antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
