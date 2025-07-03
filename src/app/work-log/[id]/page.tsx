"use client";

import { PageIndicator } from "@/components/common/PageIndicator";
import Col from "@/components/layout/Col";
import Container from "@/components/layout/Container";
import Row from "@/components/layout/Row";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { useCustomRouter } from "@/hooks/useCustomRouter";
import { searchStore } from "@/store/searchStore";
import axios from "axios";
import { ArrowLeft, Calendar, MoveLeft, User } from "lucide-react";
import { useParams } from "next/navigation";

import React, { useEffect, useState } from "react";

interface OwnPropsType {
  newDate: string;
  status: string;
  team: string;
  title: string;
  username: string;
  content: string;
  result: string;
}

export default function Details() {
  const { setIsSearchMode, isSearchMode } = searchStore();
  const [data, setData] = useState<OwnPropsType>();
  const { goToWorkLog } = useCustomRouter();
  const params = useParams();
  const id = params.id;

  const goToWorkLogPage = (e: React.MouseEvent) => {
    e.preventDefault();
    goToWorkLog();
    setIsSearchMode(isSearchMode);
  };

  useEffect(() => {
    const DetailGetData = async () => {
      try {
        const result = await axios.get(`/api/worklogs/details`, {
          params: {
            id: id,
          },
        });
        const raw = result.data.data;
        const utcDate = new Date(raw.newDate);
        const yyyy = utcDate.getFullYear();
        const month = String(utcDate.getMonth() + 1).padStart(2, "0");
        const dd = String(utcDate.getDate()).padStart(2, "0");
        const formatDate = yyyy + "-" + month + "-" + dd;
        setData({ ...raw, newDate: formatDate });
      } catch (err) {
        console.log(err);
      }
    };
    DetailGetData();
  }, []);

  return (
    <>
      <Container classname="bg-red w-full flex-col">
        <PageIndicator
          imageboolen={false}
          iconboolen={true}
          icon={
            <ArrowLeft
              onClick={goToWorkLogPage}
              className="h-10 w-10 cursor-pointer"
            />
          }
          alt="MoveLeft"
          title="업무일지 상세"
          onButtonClick={goToWorkLogPage}
          buttonicon={false}
          buttonname="수정"
        />

        <Row classname="w-full  ">
          <Col perRow={1} classname=" p-5 rounded-lg shadow-xl border-2 ">
            {data ? (
              <div>
                <h1 className="text-3xl font-bold">{data.title}</h1>
                <div className="flex w-2/3 items-center justify-between">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-10 w-5" />
                    <p className="text-sm">{data.newDate}</p>
                  </div>
                  <div className="flex items-center">
                    <User className="mr-2 h-10 w-5" />
                    <p className="text-sm">{data.username}</p>
                  </div>
                  <div className="flex w-1/2 items-center">
                    <p className="mr-2 bg-red-300 p-1 text-sm">{data.team}</p>
                    <p className="bg-red-300 p-1 text-sm">{data.status}</p>
                  </div>
                </div>
                <h1>내용 : {data.content}</h1>
                <h1>결과 : {data.result}</h1>
              </div>
            ) : (
              <LoadingSpinner />
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}
