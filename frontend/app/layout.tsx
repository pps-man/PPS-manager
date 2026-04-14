import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ 
  subsets: ["latin"], 
  variable: "--font-outfit",
  weight: ["400", "500", "600", "700"]
});

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter",
  weight: ["400", "500", "600"]
});

export const metadata: Metadata = {
  title: "PPS Manager | Play School Management System",
  description: "Advanced, secure, and easy-to-use school management SaaS designed for efficiency.",
  keywords: ["school management", "play school", "saas", "attendance", "fee management", "education"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${outfit.variable} ${inter.variable} font-inter antialiased bg-slate-50 text-slate-900`}>
        {children}
      </body>
    </html>
  );
}
