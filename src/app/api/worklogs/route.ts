import clientPromise from "@/config/dbconfig";
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
      return NextResponse.json({ message: "필수 항목 누락" }, { status: 400 });
    }
    const client = await clientPromise;
    const db = client.db("worklogdb");
    const collection = db.collection("worklogs");
    await collection.insertOne({
      title,
      username,
      team,
      status,
      content,
      result,
      newDate,
    });

    return NextResponse.json({ message: "업무일지등록" }, { status: 200 });
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
    const client = await clientPromise;
    const db = client.db("worklogdb");
    const collection = db.collection("worklogs");
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
      return NextResponse.json({
        message: "파람스로날짜받고 그날짜기반 데이터 보내기",
        searchData,
      });
    }

    const result = await collection
      .find(
        {},
        {
          projection: { newDate: 1, team: 1, username: 1, title: 1, status: 1 },
        },
      )
      .sort({ newDate: -1 })
      .toArray();
    console.log(result);
    return NextResponse.json(
      { message: "업무일지 불러오기 완료", result },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ message: "서버오류" }, { status: 500 });
  }
};
