"use client";
import Col from "@/components/layout/Col";
import Container from "@/components/layout/Container";
import Row from "@/components/layout/Row";
import WorkLogblackIcon from "@/img/삼원-근무일지-블랙-로고.png";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, { useEffect, useState } from "react";
import { useCustomRouter } from "@/hooks/useCustomRouter";
import { PageIndicator } from "@/components/common/PageIndicator";

import axios from "axios";

type Report = {
  date: string;
  team: string;
  title: string;
  username: string;
  status: string;
};

export default function Home() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [workLogData, setWorkLogData] = useState<Report[]>([]);

  const { goToNewWorkLog } = useCustomRouter();
  const goToNewWorkLogPage = (e: React.MouseEvent) => {
    e.preventDefault();
    goToNewWorkLog();
  };

  useEffect(() => {
    const WorklogData = async () => {
      try {
        const result = await axios.get("/api/worklogs");
        console.log(result.data);
        setWorkLogData(result.data.result);
      } catch (error) {
        console.log(error);
      }
    };
    WorklogData();
  }, []);

  return (
    <>
      {/* 폰트 사이즈 테스트 섹션 */}
      <Container classname="container flex-col ">
        <Row classname="w-full py-3 px-2 border-b-4 border-b-[#121212] ">
          <PageIndicator
            image={WorkLogblackIcon}
            alt="WorkLogBlackIcon"
            title="업무일지"
            firstbuttonname="+"
            buttonname="새 업무일지"
            buttonicon={true}
            onButtonClick={goToNewWorkLogPage}
          />
        </Row>
        <Row classname="w-full px-2 py-3 border-b-4 border-b-[#121212] ">
          <form className="w-full text-nowrap md:grid md:grid-rows-2 lg:flex">
            <div className="flex w-3/12 items-center">
              <label className="mr-4">부서 :</label>
              <select
                className="mr-4 border border-gray-400 py-0 pl-2"
                defaultValue="영업부"
              >
                <option value="영업부">영업부</option>
                <option value="영업부1">영업부1</option>
                <option value="영업부3">영업부3</option>
              </select>
            </div>
            <div className="flex w-full items-center">
              <label className="mr-4">날짜 : </label>
              <DatePicker
                customInput={
                  <input
                    maxLength={8}
                    className="w-full min-w-24 max-w-36 cursor-pointer border border-gray-400 pl-3"
                  />
                }
                dateFormat="yyyy-MM-dd"
                shouldCloseOnSelect
                selected={startDate}
                onChange={(date: Date | null) => setStartDate(date)}
              ></DatePicker>
              <p className="px-5 font-black"> ~ </p>
              <DatePicker
                customInput={
                  <input
                    maxLength={8}
                    className="ml-3 w-full min-w-24 max-w-36 cursor-pointer border border-gray-400 pl-3"
                  />
                }
                dateFormat="yyyy-MM-dd"
                shouldCloseOnSelect
                selected={endDate}
                onChange={(date: Date | null) => setEndDate(date)}
              ></DatePicker>
              <button className="ml-4 rounded-lg bg-black px-2 py-1 text-sm font-light text-white">
                조회
              </button>
            </div>
          </form>
        </Row>
        <Row classname="mt-8 bg-[#383a39] w-full px-2 rounded-xl ">
          <div className="w-1/6 py-2 text-center">
            <p className="border-r-2 border-white py-4 text-white">작성일</p>
          </div>
          <div className="w-1/6 text-center">
            <p className="border-r-2 border-white py-4 text-white">부서명</p>
          </div>
          <div className="w-1/6 text-center">
            <p className="border-r-2 border-white py-4 text-white">작성자명</p>
          </div>
          <div className="w-3/6 text-center text-white">
            <p className="py-4">업무일지명</p>
          </div>
        </Row>
        <div className="mt-2" />
        <Row classname="w-full border-b-2 border-gray-400 ">
          {workLogData.map((item, index) => (
            <div
              key={index}
              className="flex w-full border-t-2 border-gray-400 py-2"
            >
              <div className="w-1/6 text-center">
                <h1 className="text-sm">{item.date}</h1>
              </div>
              <div className="w-1/6 text-center">
                <h1 className="text-sm">{item.team}</h1>
              </div>
              <div className="w-1/6 text-center">
                <h1 className="text-sm">{item.username}</h1>
              </div>
              <div className="flex w-3/6 justify-around text-center">
                <h1 className="w-1/2 text-sm">{item.title}</h1>
                <h1 className="w-1/2 text-sm">{item.status}</h1>
              </div>
            </div>
          ))}
        </Row>
      </Container>
    </>
  );
}
