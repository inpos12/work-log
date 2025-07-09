import { getCollection } from "@/config/dbconfig";
import { DBWorkLogDetails } from "@/types/worklog";
import { createAPIResponse } from "@/utils/api-response";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const url = new URL(req.url);
    const id: string | null = url.searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "아이디없음" }, { status: 400 });
    }
    const Object = new ObjectId(id);

    const collection = await getCollection("worklogs");
    const result = await collection.findOne(
      {
        _id: { $eq: Object },
      },
      {
        projection: {
          newDate: 1,
          team: 1,
          username: 1,
          title: 1,
          status: 1,
          content: 1,
          result: 1,
        },
      },
    );

    return createAPIResponse("Success", result, 200);
  } catch (err) {
    console.log(err);
  }
};
