import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Mahayahay FM-ChMS",
  description: "Mahayahay Free Methodist Church Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-gray-50 text-gray-900`}>
        {children}
        <Toaster 
          position="top-right" 
          richColors
          toastOptions={{
            classNames: {
              success: 'bg-emerald-600 text-white border-emerald-600',
            },
          }}
        />
      </body>
    </html>
  );
}
