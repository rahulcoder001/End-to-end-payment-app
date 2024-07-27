import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "../component/Navbar"; 
import { Toaster } from "react-hot-toast";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    
        <body>
          <Navbar />
          <Toaster/>
          {children}
        </body>
    </html>
  );
}
