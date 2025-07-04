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
          <form className="grid grid-rows-2 gap-4 text-nowrap">
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
                    className="w-full cursor-pointer border pl-0 text-sm text-black sm:pl-2"
                  />
                }
                dateFormat="yyyy-MM-dd"
                shouldCloseOnSelect
                selected={startDate}
                onChange={(date: Date | null) => setStartDate(date)}
              ></DatePicker>
              <p className="mx-2"> ~ </p>
              <DatePicker
                customInput={
                  <input
                    maxLength={8}
                    className="w-full cursor-pointer border pl-0 text-sm text-black sm:pl-2"
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
          <div className="hidden items-center border-b-2 border-gray-400 py-4 sm:flex">
            <div className="py-2 text-center sm:w-1/6">
              <p className="text-white">작성일</p>
            </div>
            <div className="text-center sm:w-1/6">
              <p className="text-white">부서명</p>
            </div>
            <div className="text-center sm:w-1/6">
              <p className="text-white">작성자명</p>
            </div>
            <div className="text-center text-white sm:w-3/6">
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
                        <h1 className="text-xs">{item.newDate}</h1>
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
                      className="flex w-full flex-col-reverse sm:flex-row"
                    >
                      <div className="flex flex-col sm:w-3/6 sm:flex-row">
                        <div className="sm:w-1/3 sm:text-center">
                          <h1 className="text-xs lg:text-sm">{item.newDate}</h1>
                        </div>
                        <div className="flex sm:w-2/3 sm:flex-row">
                          <div className="sm:w-1/2 sm:text-center">
                            <h1 className="mr-2 text-xs sm:mr-0 sm:text-sm">
                              {item.team}
                            </h1>
                          </div>
                          <div className="sm:w-1/2 sm:text-center">
                            <h1 className="text-xs sm:text-sm">
                              {item.username}
                            </h1>
                          </div>
                        </div>
                      </div>
                      <div className="sm:w-3/6 sm:text-center">
                        <h1 className="text-md font-semibold text-red-500 sm:text-sm sm:font-normal sm:text-white">
                          {item.title}
                        </h1>
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
