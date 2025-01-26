import { NextRequest, NextResponse } from "next/server";
import { BOT_MANAGEMENT_SERVICE_BASE_URL } from "@/constants/api-endpoints";

// メッセージストア登録
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const res = await fetch(
      `${BOT_MANAGEMENT_SERVICE_BASE_URL}/message-store`,
      {
        method: "POST",
        body: JSON.stringify({
          name: body.messageStore.name,
          url: body.messageStore.url,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      },
    );
    const data = await res.json();

    return NextResponse.json({ error: false, data }, { status: 201 });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: true, message: "Invalid request" },
      { status: 400 },
    );
  }
}
