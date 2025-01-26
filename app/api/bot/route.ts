import { NextRequest, NextResponse } from "next/server";
import { BOT_MANAGEMENT_SERVICE_BASE_URL } from "@/constants/api-endpoints";

// ボット作成API
export async function POST(request: NextRequest) {
  try {
    const newBot = await request.json();
    const res = await fetch(`${BOT_MANAGEMENT_SERVICE_BASE_URL}/bot`, {
      method: "POST",
      body: JSON.stringify({
        token: newBot.bot.name,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
    const data = await res.json();

    return NextResponse.json({ error: false, bots: [data] }, { status: 201 });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: true, message: "Invalid request" },
      { status: 400 },
    );
  }
}
