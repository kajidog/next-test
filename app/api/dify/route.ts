import { NextRequest, NextResponse } from "next/server";
import { BOT_MANAGEMENT_SERVICE_BASE_URL } from "@/constants/api-endpoints";

// Dify作成API
export async function POST(request: NextRequest) {
  try {
    const newDify = await request.json();
    console.log(newDify);

    const res = await fetch(`${BOT_MANAGEMENT_SERVICE_BASE_URL}/dify`, {
      method: "POST",
      body: JSON.stringify(newDify),
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
    const data = await res.json();
    return NextResponse.json({ error: false, difyList: data }, { status: 201 });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: true, message: "Invalid request" },
      { status: 400 },
    );
  }
}
