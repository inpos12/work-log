"use client";
import { usePathname } from "next/navigation";
import "./globals.css";
import Navbar, { MenuTabBar } from "@/components/navigation/Navbar";
import { useEffect } from "react";
import Container from "@/components/layout/Container";
import Row from "@/components/layout/Row";
import WorkLogWhiteIcon from "@/img/근무일지-화이트-로고.png";
import WorkLogBlackIcon from "@/img/삼원-근무일지-블랙-로고.png";
import UserWhiteIcon from "@/img/사용자-화이트-로고.png";
import UserBlackIcon from "@/img/삼원-사용자-블랙-로고.png";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const hideNavbar = pathname === "/";

  useEffect(() => {
    if (hideNavbar === true) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    console.log(hideNavbar);
  }, [hideNavbar]);
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-black to-red-900 text-slate-100">
        {!hideNavbar && <Navbar />}
        <main>
          <>
            <Container classname="md:flex">
              {!hideNavbar && (
                <Row classname=" mr-0 mb-4 md:mb-0 sm:mr-4 flex justify-start w-full md:max-w-[200px] flex-col items-center">
                  <MenuTabBar
                    whiteIcon={WorkLogWhiteIcon}
                    blackIcon={WorkLogBlackIcon}
                    menuName="업무일지"
                  />
                  <MenuTabBar
                    whiteIcon={UserWhiteIcon}
                    blackIcon={UserBlackIcon}
                    menuName="사용자"
                  />
                </Row>
              )}
              <Row classname="w-full">{children}</Row>
            </Container>
          </>
        </main>
      </body>
    </html>
  );
}
