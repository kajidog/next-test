import { NextResponse } from "next/server";
import { BOT_MANAGEMENT_SERVICE_BASE_URL } from "@/constants/api-endpoints";

// ボット一覧を取得するAPI
export async function GET() {
  try {
    const res = await fetch(`${BOT_MANAGEMENT_SERVICE_BASE_URL}/bot`, {
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
