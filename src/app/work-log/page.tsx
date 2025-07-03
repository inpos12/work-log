"use client";
import Container from "@/components/layout/Container";
import Row from "@/components/layout/Row";
import WorkLogwhiteIcon from "@/img/근무일지-화이트-로고.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, { useEffect, useState } from "react";
import { useCustomRouter } from "@/hooks/useCustomRouter";
import { PageIndicator } from "@/components/common/PageIndicator";
import Link from "next/link";
import { useWorkLogs } from "@/hooks/useWorkLogs";
import { ErrorMessage, LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { searchStore } from "@/store/searchStore";

export default function Home() {
  const { isSearchMode } = searchStore();
  const { workLogs, searchData, loading, error, WorkLogData } = useWorkLogs();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const { goToNewWorkLog } = useCustomRouter();
  const goToNewWorkLogPage = (e: React.MouseEvent) => {
    e.preventDefault();
    goToNewWorkLog();
  };
  // new Date YYYY-MM-DD 로 가공

  useEffect(() => {
    WorkLogData();
  }, []);

  const SearchDataHandler = async (e: React.MouseEvent) => {
    e.preventDefault();
    WorkLogData({ start: startDate, end: endDate });
  };

  return (
    <>
      {/* 폰트 사이즈 테스트 섹션 */}
      <Container classname="container flex-col w-full ">
        <PageIndicator
          imageboolen={true}
          image={WorkLogwhiteIcon}
          iconboolen={false}
          alt="WorkLogBlackIcon"
          title="업무일지"
          firstbuttonname="+"
          buttonname="새 업무일지"
          buttonicon={true}
          onButtonClick={goToNewWorkLogPage}
        />
        <Row classname="w-full  ">
          <form className="flex w-full text-nowrap md:grid md:grid-rows-2 lg:flex">
            <div className="flex w-3/12 items-center">
              <label className="mr-4">부서 :</label>
              <select
                className="mr-4 py-0 pl-2 text-black"
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
                    className="w-full min-w-24 max-w-36 cursor-pointer border pl-3 text-black"
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
                    className="ml-3 w-full min-w-24 max-w-36 cursor-pointer border pl-3 text-black"
                  />
                }
                dateFormat="yyyy-MM-dd"
                shouldCloseOnSelect
                selected={endDate}
                onChange={(date: Date | null) => setEndDate(date)}
              ></DatePicker>
              <button
                onClick={SearchDataHandler}
                className="ml-4 rounded-lg bg-black px-2 py-1 text-sm font-light text-white"
              >
                조회
              </button>
            </div>
          </form>
          <div className="flex items-center border-b-2 border-gray-400 py-4">
            <div className="w-1/6 py-2 text-center">
              <p className="text-white">작성일</p>
            </div>
            <div className="w-1/6 text-center">
              <p className="text-white">부서명</p>
            </div>
            <div className="w-1/6 text-center">
              <p className="text-white">작성자명</p>
            </div>
            <div className="w-3/6 text-center text-white">
              <p className="py-2">업무일지명</p>
            </div>
          </div>
          <div>
            {loading ? (
              <div className="flex w-full items-center justify-center">
                <LoadingSpinner />
              </div>
            ) : error ? (
              <ErrorMessage message="에러가 발생했습니다." />
            ) : (
              <div className="flex w-full items-center justify-center"></div>
            )}

            {isSearchMode
              ? searchData?.map((item, index) => (
                  <div
                    key={index}
                    className="flex w-full border-b-2 border-gray-400 py-2"
                  >
                    {/* 검색 결과 항목도 동일한 레이아웃이라면 위와 동일하게 렌더링 */}
                    <Link
                      href={`/work-log/${item._id}`}
                      className="flex w-full"
                    >
                      <div className="w-1/6 text-center">
                        <h1 className="text-sm">{item.newDate}</h1>
                      </div>
                      <div className="w-1/6 text-center">
                        <h1 className="text-sm">{item.team}</h1>
                      </div>
                      <div className="w-1/6 text-center">
                        <h1 className="text-sm">{item.username}</h1>
                      </div>
                      <div className="flex w-3/6 justify-around text-center">
                        <h1 className="w-1/2 text-sm">{item.title}</h1>
                      </div>
                    </Link>
                  </div>
                ))
              : workLogs.map((item, index) => (
                  <div
                    key={index}
                    className="w-full border-b-2 border-gray-400 py-2"
                  >
                    <Link
                      href={`/work-log/${item._id}`}
                      className="flex w-full"
                    >
                      <div className="w-1/6 text-center">
                        <h1 className="text-sm">{item.newDate}</h1>
                      </div>
                      <div className="w-1/6 text-center">
                        <h1 className="text-sm">{item.team}</h1>
                      </div>
                      <div className="w-1/6 text-center">
                        <h1 className="text-sm">{item.username}</h1>
                      </div>
                      <div className="flex w-3/6 justify-around text-center">
                        <h1 className="w-1/2 text-sm">{item.title}</h1>
                      </div>
                    </Link>
                  </div>
                ))}
          </div>
        </Row>
      </Container>
    </>
  );
}
