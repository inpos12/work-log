"use client";

import { useCustomRouter } from "@/hooks/useCustomRouter";
import "@/app/globals.css";
import Image from "next/image";
import SamwonLogo from "../img/삼원메인로고1.png";
import LoginLogo from "../img/삼원-메인로고.png";

export default function Home() {
  const { goToWorkLog } = useCustomRouter();

  const LoginHandler = (e: React.FormEvent) => {
    e.preventDefault();
    goToWorkLog();
  };
  return (
    <div className="flex h-[100vh] items-center">
      {/* 폰트 사이즈 테스트 섹션 */}

      <form className="relative mx-auto max-w-4xl rounded-xl bg-[rgba(255,255,255,0.6)] p-4 sm:p-16 md:p-20">
        <Image
          className="absolute -top-16 left-1/2 z-10 hidden size-32 -translate-x-1/2 sm:block"
          src={LoginLogo}
          alt="LoginLogo"
        />
        <h1 className="mb-6 w-full text-center text-lg font-semibold text-white md:text-2xl">
          업무일지 로그인
        </h1>
        <div>
          <input
            type="text"
            placeholder="아이디"
            className="mb-2 w-full border bg-[url(../img/id.png)] bg-[length:25px_25px] bg-[left_8px_center] bg-no-repeat p-2 pl-9 text-sm font-medium text-[#121212]"
          />
        </div>
        <input
          type="password"
          placeholder="비밀번호"
          className="mb-4 w-full border bg-[url(../img/password.png)] bg-[length:25px_25px] bg-[left_8px_center] bg-no-repeat p-2 pl-9 text-sm text-[#121212]"
        />
        <button
          className="w-full rounded-lg bg-[#121212] py-2 text-sm text-white sm:text-lg"
          onClick={LoginHandler}
        >
          Login
        </button>
        <Image
          className="mx-auto invert filter"
          alt="SamwonLogo"
          src={SamwonLogo}
        />
      </form>
    </div>
  );
}
