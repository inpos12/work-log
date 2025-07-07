"use client";
import { PageIndicator } from "@/components/common/PageIndicator";
import Container from "@/components/layout/Container";
import Row from "@/components/layout/Row";
import React, { useRef, useState } from "react";
import WorkLogWhiteIcon from "@/img/근무일지-화이트-로고.png";
import DatePicker from "react-datepicker";
import Col from "@/components/layout/Col";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useCustomRouter } from "@/hooks/useCustomRouter";

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
  const { goToWorkLog } = useCustomRouter();
  const formref = useRef<HTMLFormElement>(null);
  const [date, setDate] = useState<Date | null>(new Date());

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
      alert(result.data.message);
      goToWorkLog();
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
      <section id="newWorkLog">
        <Container classname="container flex flex-col items-center justify-center  ">
          <PageIndicator
            imageboolen={true}
            image={WorkLogWhiteIcon}
            iconboolen={false}
            alt="WorkLogBlackIcon"
            title="새 업무일지 작성"
            buttonicon={false}
            buttonname="저장하기"
            onButtonClick={handleIndicatorButtonClick}
          />

          <Row classname="w-full xl:w-4/5 h-[90vh]">
            <form
              className="flex flex-col gap-4"
              onSubmit={onSubmit}
              ref={formref}
            >
              <div>
                <label htmlFor="title" className="text-lg">
                  제목
                </label>
                <input
                  id="title"
                  required
                  name="title"
                  className="mt-2 w-full rounded-md py-1 pl-2 text-black placeholder:text-gray-400"
                  placeholder="업무일지 제목을 입력하세요"
                />
              </div>
              <div>
                <label htmlFor="username">작성자</label>
                <input
                  id="username"
                  required
                  name="username"
                  placeholder="작성자명을 입력하세요"
                  className="mt-2 w-full rounded-md py-1 pl-2 text-black placeholder:text-gray-400"
                />
              </div>
              <div>
                <label htmlFor="date">날짜</label>
                <DatePicker
                  wrapperClassName="w-full mt-2"
                  customInput={
                    <input
                      id="date"
                      required
                      name="date"
                      placeholder="날짜를 선택하세요"
                      maxLength={8}
                      className="w-full cursor-pointer rounded-md border border-gray-400 py-1 pl-2 text-black placeholder:text-gray-400"
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
                  <label htmlFor="team">팀</label>
                  <select
                    id="team"
                    name="team"
                    className="mt-2 w-full py-1 pl-2 text-black"
                    defaultValue="영업부"
                  >
                    <option className="text-black" value="영업부">
                      영업부
                    </option>
                    <option className="text-black" value="기획부">
                      기획부
                    </option>
                    <option className="text-black" value="개발팀">
                      개발팀
                    </option>
                  </select>
                </div>
                <div className="relative right-0 w-full pl-2">
                  <label htmlFor="status">진행상태</label>
                  <select
                    id="status"
                    name="status"
                    className="mt-2 w-full py-1 pl-2 text-black"
                  >
                    <option className="text-black" value="대기중">
                      대기중
                    </option>
                    <option className="text-black" value="진행중">
                      진행중
                    </option>
                    <option className="text-black" value="완료">
                      완료
                    </option>
                    <option className="text-black" value="지연">
                      지연
                    </option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="content">업무내용</label>
                <textarea
                  id="content"
                  required
                  name="content"
                  placeholder="상세 업무 내용을 입력하세요"
                  className="mt-2 h-60 w-full px-2 py-1 text-black"
                />
              </div>
              <div>
                <label htmlFor="result">업무 결과</label>
                <textarea
                  id="result"
                  required
                  name="result"
                  placeholder="업무 결과 및 성과를 입력하세요"
                  className="mt-2 h-40 w-full px-2 py-1 text-black"
                />
              </div>
            </form>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default NewWorkLog;
