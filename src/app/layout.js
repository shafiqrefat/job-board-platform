import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/navbar";
import { AuthProvider } from "./contex/authContex";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Job Board Platform",
  description: "It's a dynamic job board platform where include complex functionalities.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <Navbar/>
           <Suspense fallback={<p className="text-center py-10">Loading page...</p>}>
              {children}
          </Suspense>
        </AuthProvider>
      </body>
    </html>
  );
}
