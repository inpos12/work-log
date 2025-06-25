"use client";
import { usePathname } from "next/navigation";
import "./globals.css";
import Navbar from "@/components/navigation/Navbar";
import { createContext, useState } from "react";

interface WorkLogContextType {
  isSearchMode: boolean;
  setIsSearchMode: React.Dispatch<React.SetStateAction<boolean>>;
}
export const WorkLogContext = createContext<WorkLogContextType | null>(null);
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSearchMode, setIsSearchMode] = useState<boolean>(false);
  const value: WorkLogContextType = {
    isSearchMode,
    setIsSearchMode,
  };
  const pathname = usePathname();
  const hideNavbar = pathname === "/";
  return (
    <WorkLogContext.Provider value={value}>
      <html lang="en">
        <body className="flex">
          {!hideNavbar && <Navbar />}
          <main className="w-[calc(100vw-300px)]">{children}</main>
        </body>
      </html>
    </WorkLogContext.Provider>
  );
}
