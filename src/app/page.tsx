"use client";
import Col from "@/components/layout/Col";
import Container from "@/components/layout/Container";
import Row from "@/components/layout/Row";
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
    <div className="w-[100vw] bg-[url(../img/백그라운드.png)] bg-cover bg-center bg-no-repeat">
      {/* 폰트 사이즈 테스트 섹션 */}
      <Container classname="h-screen">
        <Row classname=" justify-center">
          <Col perRow={1}>
            <form className="relative mx-auto max-w-4xl rounded-xl bg-[rgba(255,255,255,0.6)] p-16 shadow-md">
              <Image
                className="absolute -top-16 left-1/2 z-10 -translate-x-1/2"
                src={LoginLogo}
                alt="LoginLogo"
              />
              <h1 className="mb-6 px-32 text-center text-3xl font-semibold text-[#121212]">
                업무일지 로그인
              </h1>
              <div>
                <input
                  type="text"
                  placeholder="아이디"
                  className="mb-2 w-full border bg-[url(../img/id.png)] bg-[length:25px_25px] bg-[left_8px_center] bg-no-repeat p-2 pl-9 font-medium text-[#121212]"
                />
              </div>
              <input
                type="password"
                placeholder="비밀번호"
                className="mb-4 w-full border bg-[url(../img/password.png)] bg-[length:25px_25px] bg-[left_8px_center] bg-no-repeat p-2 pl-9 text-[#121212]"
              />
              <button
                className="w-full rounded-lg bg-[#121212] py-2 text-xl text-white"
                onClick={LoginHandler}
              >
                Login
              </button>
              <Image className="mx-auto" alt="SamwonLogo" src={SamwonLogo} />
            </form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
