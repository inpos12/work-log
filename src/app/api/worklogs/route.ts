import { getCollection } from "@/config/dbconfig";
import {
  DBWorkLogDetails,
  DBWorkLogDetailsPost,
  WorkLog,
} from "@/types/worklog";
import {
  createAPIErrorResponse,
  createAPIResponse,
} from "@/utils/api-response";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const { title, team, username, status, content, result, date } = body;
    const newDate = new Date(date);

    if (
      !title ||
      !team ||
      !username ||
      !status ||
      !content ||
      !result ||
      !newDate
    ) {
      return createAPIErrorResponse("필수 항목 누락");
    }

    const collection = await getCollection<DBWorkLogDetailsPost>("worklogs");
    await collection.insertOne({
      title,
      username,
      team,
      status,
      content,
      result,
      newDate,
    });

    return createAPIResponse("업무일지등록성공", null, 200);
  } catch (error) {
    console.log("새업무일지등록에러", error);
    return NextResponse.json(
      { message: "서버 오류", error: String(error) },
      { status: 500 },
    );
  }
};

export const GET = async (req: NextRequest) => {
  try {
    const collection = await getCollection<WorkLog[]>("worklogs");
    const url = new URL(req.url);
    const startDateStr = url.searchParams.get("start");
    const endDateStr = url.searchParams.get("end");
    if (startDateStr && endDateStr) {
      const startDate = new Date(startDateStr);
      const endDate = new Date(endDateStr);
      endDate.setHours(23, 59, 59, 999);
      const searchData = await collection
        .find({
          newDate: {
            $gte: startDate,
            $lte: endDate,
          },
        })
        .toArray();

      return createAPIResponse("Successs", searchData, 200);
    }
    const result = await collection
      .find(
        {},
        {
          projection: {
            _id: 1,
            newDate: 1,
            team: 1,
            username: 1,
            title: 1,
            status: 1,
          },
        },
      )
      .sort({ newDate: -1 })
      .toArray();

    return createAPIResponse("Success", result, 200);
  } catch (error) {
    console.error("업무일지 조회 에러:", error);
    return createAPIErrorResponse("Failed to fetch worklogs");
  }
};
