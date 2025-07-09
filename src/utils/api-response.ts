import { NextResponse } from "next/server";

export const createAPIResponse = <T>(
  message: string,
  data: T,
  status: number,
) => {
  return NextResponse.json(
    {
      success: status === 200,
      message,
      data,
    },
    { status: status },
  );
};
export const createAPIErrorResponse = (message: string) => {
  return NextResponse.json(
    {
      success: false,
      message,
    },
    { status: 500 },
  );
};
