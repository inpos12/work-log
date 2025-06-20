import clientPromise from "@/config/dbconfig";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    console.log(body);
    const { title, team, username, status, content, result, date } = body;
    if (
      !title ||
      !team ||
      !username ||
      !status ||
      !content ||
      !result ||
      !date
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
      date,
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

export const GET = async () => {
  try {
    const client = await clientPromise;
    const db = client.db("worklogdb");
    const collection = db.collection("worklogs");
    const result = await collection
      .find(
        {},
        { projection: { date: 1, team: 1, username: 1, title: 1, status: 1 } },
      )
      .toArray();
    return NextResponse.json(
      { message: "업무일지 불러오기 완료", result },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ message: "서버오류" }, { status: 500 });
  }
};
