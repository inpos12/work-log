"use client";
import { useState } from "react";
import Row from "../layout/Row";
import Col from "../layout/Col";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import AdminLogo from "@/img/비앤비_관리자-로고.png";
import WorkLogWhiteIcon from "@/img/근무일지-화이트-로고.png";
import WorkLogBlackIcon from "@/img/삼원-근무일지-블랙-로고.png";
import UserWhiteIcon from "@/img/사용자-화이트-로고.png";
import UserBlackIcon from "@/img/삼원-사용자-블랙-로고.png";
import SamwonLogo from "@/img/삼원메인로고1.png";
import { useCustomRouter } from "@/hooks/useCustomRouter";

interface Props {
  whiteIcon: StaticImport;
  blackIcon: StaticImport;
  menuName: string;
}
const MenuTabBar: React.FC<Props> = (props) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const { goToWorkLog } = useCustomRouter();
  const goToWorkLogPage = (e: React.MouseEvent) => {
    e.preventDefault();
    goToWorkLog();
  };
  return (
    <div
      className="mb-4 flex justify-center rounded-xl text-white transition-all duration-300 hover:bg-white hover:text-[#121212]"
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      <div
        className="flex w-full max-w-44 items-center rounded-xl py-2"
        onClick={goToWorkLogPage}
      >
        <Image
          src={isHovered ? props.blackIcon : props.whiteIcon}
          alt="WorkLogIcon"
          className="mr-2 size-9"
        />
        <p className="text-sm font-bold tracking-[0.3rem]">{props.menuName}</p>
      </div>
    </div>
  );
};

export default function Navbar() {
  return (
    <nav className="fixed z-10 flex flex-col items-center">
      <Row classname="shadow-[6px_0_10px_rgba(0,0,0,0.5)] bg-[#121212] h-[100vh]  justify-between flex flex-col rounded-lg">
        <Col perRow={1} classname=" px-0 flex justify-between flex-col">
          <Image src={SamwonLogo} alt="SamwonLogo" className="mx-auto w-full" />
          <Image className="mx-auto mt-9" src={AdminLogo} alt="AdminLogo" />
          <p className="mb-12 px-[95px] text-center text-3xl text-white">
            개발자님
          </p>
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
          <div className="text-center">
            <button className="my-10 w-2/3 rounded-xl bg-red-700 py-2 font-semibold text-white">
              로그아웃
            </button>
          </div>
        </Col>
      </Row>
    </nav>
  );
}
