import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./components/AuthProvider";
import { NotificationProvider } from "./components/NotificationContext";
import { BottomNav } from "./components/BottomNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Smart Invest GH",
  description: "Smart Invest GH - Your financial partner",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
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
        <AuthProvider>
          <NotificationProvider>
            <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between p-2 bg-white dark:bg-black sm:items-start pb-20">
              {children}
            </main>
            <BottomNav />
          </NotificationProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
