"use client";
import { useState } from "react";
import Col from "../layout/Col";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import AdminLogo from "@/img/비앤비_관리자-로고.png";
import SamwonLogo from "@/img/삼원메인로고1.png";
import { useCustomRouter } from "@/hooks/useCustomRouter";
import { searchStore } from "@/store/searchStore";

interface Props {
  whiteIcon: StaticImport;
  blackIcon: StaticImport;
  menuName: string;
}
export const MenuTabBar: React.FC<Props> = (props) => {
  const { isSearchMode, setIsSearchMode } = searchStore();
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const { goToWorkLog } = useCustomRouter();
  const goToWorkLogPage = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsSearchMode(isSearchMode);
    goToWorkLog();
  };
  return (
    <div
      className="mb-4 flex w-full cursor-pointer rounded-md text-white transition-all duration-300 hover:bg-white hover:text-[#121212]"
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      <div
        className="flex max-w-44 items-center rounded-xl py-2"
        onClick={goToWorkLogPage}
      >
        <Image
          src={isHovered ? props.blackIcon : props.whiteIcon}
          alt="WorkLogIcon"
          className="mx-2 size-7"
        />
        <p className="text-xs font-bold tracking-[0.3rem]">{props.menuName}</p>
      </div>
    </div>
  );
};

export default function Navbar() {
  const { goToWorkLog } = useCustomRouter();
  const { isSearchMode, setIsSearchMode } = searchStore();
  const goToWorkLogPage = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsSearchMode(isSearchMode);
    goToWorkLog();
  };
  return (
    <nav>
      <div className="container mx-auto mb-4 flex justify-center border-b border-red-900/50">
        <div className="grid w-full grid-cols-2 grid-rows-1 rounded-lg p-4">
          <Col classname="flex flex-row justify-between items-center">
            <Image
              src={SamwonLogo}
              alt="SamwonLogo"
              className="w-48 cursor-pointer invert filter"
              onClick={goToWorkLogPage}
            />
          </Col>
          <Col classname="flex items-center justify-end">
            {/* <button className="rounded-xl bg-red-700 py-2 font-semibold text-white">
              로그아웃
            </button>
            <p className="text-center text-lg text-white">개발자님</p> */}
            <Image className="w-12" src={AdminLogo} alt="AdminLogo" />
          </Col>

          {/* 
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
          <div className="text-center"></div> */}
        </div>
      </div>
    </nav>
  );
}
