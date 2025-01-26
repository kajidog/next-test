import { NextRequest, NextResponse } from "next/server";
import { MESSAGE_API_BASE_URL } from "@/constants/api-endpoints";

export async function POST(
  request: NextRequest,
  { params }: { params: { botId: string[] } },
) {
  try {
    const body = await request.json();
    await fetch(`${MESSAGE_API_BASE_URL}/flow-data`, {
      method: "POST",
      body: JSON.stringify({
        ...body,
        key: params.botId[0],
      }),
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
    return NextResponse.json({ error: false }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: true, message: "Invalid request" },
      { status: 400 },
    );
  }
}

export async function GET(
  _: NextRequest,
  { params }: { params: { botId: string } },
) {
  try {
    const res = await fetch(
      `${MESSAGE_API_BASE_URL}/flow-data/${params.botId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      },
    );
    const data = await res.json();
    return NextResponse.json(data, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: true, message: "Invalid request" },
      { status: 400 },
    );
  }
}
