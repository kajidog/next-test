import { MESSAGE_API_BASE_URL } from "@/constants/api-endpoints";
import { Bot } from "@/types/bot";
import { NextRequest, NextResponse } from "next/server";

export const existingBots: Bot[] = [];

// ボット作成API
export async function POST(request: NextRequest) {
  try {
    const newBot = await request.json();
    console.log(newBot);

    const res = await fetch(`${MESSAGE_API_BASE_URL}/bot`, {
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
    existingBots.push(data);
    return NextResponse.json(
      { error: false, bots: existingBots },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: true, message: "Invalid request" },
      { status: 400 }
    );
  }
}
