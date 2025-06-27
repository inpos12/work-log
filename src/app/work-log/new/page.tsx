"use client";
import { PageIndicator } from "@/components/common/PageIndicator";
import Container from "@/components/layout/Container";
import Row from "@/components/layout/Row";
import React, { useRef, useState } from "react";
import WorkLogBlackIcon from "@/img/삼원-근무일지-블랙-로고.png";
import DatePicker from "react-datepicker";
import Col from "@/components/layout/Col";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

type DataType = {
  title: FormDataEntryValue | null;
  username: FormDataEntryValue | null;
  team: FormDataEntryValue | null;
  status: FormDataEntryValue | null;
  content: FormDataEntryValue | null;
  result: FormDataEntryValue | null;
  date: string | undefined;
};
export const NewWorkLog = () => {
  const formref = useRef<HTMLFormElement>(null);
  const [date, setDate] = useState<Date | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const data: DataType = {
      title: formData.get("title") as string,
      username: formData.get("username") as string,
      team: formData.get("team") as string,
      status: formData.get("status") as string,
      content: formData.get("content") as string,
      result: formData.get("result") as string,
      date: date?.toLocaleString("en-US", {
        timeZone: "Asia/Seoul",
      }),
    };

    try {
      const result = await axios.post("/api/worklogs/", data);
      console.log(result.data.message);
    } catch (error: any) {
      // axios 에러 메시지 접근 예시
      if (error.response?.data?.error) {
        console.log("프론트에러:", error.response.data.error);
      } else {
        console.log("프론트에러:", error.message);
      }
    }
  };

  const handleIndicatorButtonClick = () => {
    formref.current?.requestSubmit();
  };
  return (
    <>
      <Container classname="container flex-col  ">
        <Row classname="w-full py-3 px-2 border-b-4 border-b-[#121212]">
          <PageIndicator
            imageboolen={true}
            image={WorkLogBlackIcon}
            iconboolen={false}
            alt="WorkLogBlackIcon"
            title="새 업무일지 작성"
            buttonicon={false}
            buttonname="저장하기"
            onButtonClick={handleIndicatorButtonClick}
          />
        </Row>
        <Row classname="w-full xl:w-1/2 h-[90vh]">
          <Col
            perRow={1}
            classname="bg-gray-200 p-5 rounded-lg shadow-xl border-2 border-gray-50"
          >
            <form
              className="flex flex-col gap-4"
              onSubmit={onSubmit}
              ref={formref}
            >
              <div>
                <p className="text-lg">제목</p>
                <input
                  name="title"
                  className="mt-2 w-full rounded-md py-1 pl-2"
                  placeholder="업무일지 제목을 입력하세요"
                />
              </div>
              <div>
                <p>작성자</p>
                <input
                  name="username"
                  className="mt-2 w-full rounded-md py-1 pl-2"
                />
              </div>
              <div>
                <p>날짜</p>
                <DatePicker
                  wrapperClassName="w-full mt-2"
                  customInput={
                    <input
                      name="date"
                      maxLength={8}
                      className="w-full cursor-pointer rounded-md border border-gray-400 py-1 pl-2"
                    />
                  }
                  dateFormat="yyyy-MM-dd"
                  shouldCloseOnSelect
                  selected={date}
                  onChange={(date: Date | null) => setDate(date)}
                />
              </div>
              <div className="flex justify-between">
                <div className="w-full pr-2">
                  <p>팀</p>
                  <select
                    name="team"
                    className="mt-2 w-full py-1 pl-2"
                    defaultValue="영업부"
                  >
                    <option value="영업부">영업부</option>
                    <option value="기획부">기획부</option>
                    <option value="개발팀">개발팀</option>
                  </select>
                </div>
                <div className="relative right-0 w-full pl-2">
                  <p>진행상태</p>
                  <select name="status" className="mt-2 w-full py-1 pl-2">
                    <option value="대기중">대기중</option>
                    <option value="진행중">진행중</option>
                    <option value="완료">완료</option>
                    <option value="지연">지연</option>
                  </select>
                </div>
              </div>
              <div>
                <p>업무내용</p>
                <textarea
                  name="content"
                  placeholder="상세 업무 내용을 입력하세요"
                  className="mt-2 h-60 w-full px-2 py-1"
                />
              </div>
              <div>
                <p>업무 결과</p>
                <textarea
                  name="result"
                  placeholder="업무 결과 및 성과를 입력하세요"
                  className="mt-2 h-40 w-full px-2 py-1"
                />
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default NewWorkLog;
