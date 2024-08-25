import { MESSAGE_API_BASE_URL } from "@/constants/api-endpoints";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { botId: string } }
) {
  try {
    const body = await request.json();
    const res = await fetch(`${MESSAGE_API_BASE_URL}/bot/flow`, {
      method: "POST",
      body: JSON.stringify({
        ...body,
        id: "t" + params.botId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
    await res.json();
    return NextResponse.json({ error: false }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: true, message: "Invalid request" },
      { status: 400 }
    );
  }
}

export async function GET(
  _: NextRequest,
  { params }: { params: { botId: string } }
) {
  try {
    const res = await fetch(
      `${MESSAGE_API_BASE_URL}/bot/flow/t${params.botId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );
    const data = await res.json();
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: true, message: "Invalid request" },
      { status: 400 }
    );
  }
}
