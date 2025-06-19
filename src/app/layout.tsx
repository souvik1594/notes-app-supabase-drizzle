import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Logout from "@/components/custom/Logout";
import Profile from "@/components/custom/Profile";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Souvik's Notes App",
  description: "Notes App built with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="bg-secondary">
          <div className="flex justify-between px-10 py-2">
            <div className="font-bold">Notes App</div>
            <div className="flex gap-5">
              <Profile />
              <Logout />
            </div>
          </div>
        </div>
        {children}
        <Toaster
          toastOptions={{
            style: {
              textAlign: "center",
            },
          }}
        />
      </body>
    </html>
  );
}
