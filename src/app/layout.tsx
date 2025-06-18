"use client";
import { usePathname } from "next/navigation";
import "./globals.css";
import Navbar from "@/components/navigation/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const hideNavbar = pathname === "/";
  return (
    <html lang="en">
      <body className="flex">
        {!hideNavbar && <Navbar />}
        <main className="w-[calc(100vw-300px)]">{children}</main>
      </body>
    </html>
  );
}
