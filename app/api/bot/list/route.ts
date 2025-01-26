import { NextResponse } from "next/server";
import { MESSAGE_API_BASE_URL } from "@/constants/api-endpoints";

// ボット一覧を取得するAPI
export async function GET() {
  try {
    const res = await fetch(`${MESSAGE_API_BASE_URL}/bot`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
    const data = await res.json();
    return NextResponse.json({ error: false, bots: data }, { status: 201 });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: true, message: "Invalid request" },
      { status: 400 },
    );
  }
}
