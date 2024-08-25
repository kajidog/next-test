import { MESSAGE_API_BASE_URL } from "@/constants/api-endpoints";
import { NextResponse } from "next/server";

// ボット一覧を取得するAPI
export async function GET() {
  try {
    const res = await fetch(`${MESSAGE_API_BASE_URL}/dify/list`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
    const data = await res.json();
    console.log({ data });
    return NextResponse.json({ error: false, difyList: data }, { status: 201 });
  } catch (error) {
    console.log({ error });

    return NextResponse.json(
      { error: true, message: "Invalid request" },
      { status: 400 }
    );
  }
}
