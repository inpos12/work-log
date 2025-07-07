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
          display="none"
        />

        <Row classname="w-full  ">
          <Col perRow={1} classname=" p-5 rounded-lg shadow-xl border-2 ">
            {data ? (
              <div>
                <h1 className="text-3xl font-bold">{data.title}</h1>
                <div className="grid w-4/5 grid-cols-1 sm:w-full sm:grid-cols-2 md:w-full md:grid-cols-1 lg:w-2/3 lg:grid-cols-2">
                  <div className="grid grid-cols-2">
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-10 w-5" />
                      <p className="text-sm">{data.newDate}</p>
                    </div>
                    <div className="flex items-center">
                      <User className="mr-2 h-10 w-5" />
                      <p className="text-sm">{data.username}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <p className="mr-2 bg-gray-200 p-1 text-sm text-gray-800">
                      {data.team}
                    </p>
                    <p className="bg-blue-100 p-1 text-sm text-blue-800">
                      {data.status}
                    </p>
                  </div>
                </div>
                <h2 className="mt-2 text-lg font-medium text-red-500">
                  업무 내용
                </h2>
                <div className="mt-2 border-2 border-white p-2">
                  <p className="text-sm text-gray-200">{data.content}</p>
                </div>
                <h2 className="mt-2 text-lg font-medium text-red-500">
                  업무 결과
                </h2>
                <div className="border-whitep-2 mt-2 border-2 p-2">
                  <p className="text-sm text-gray-200">{data.content}</p>
                </div>
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
