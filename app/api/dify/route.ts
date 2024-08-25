import { MESSAGE_API_BASE_URL } from "@/constants/api-endpoints";
import { NextRequest, NextResponse } from "next/server";

// Dify作成API
export async function POST(request: NextRequest) {
  try {
    const newDify = await request.json();
    console.log(newDify);

    const res = await fetch(`${MESSAGE_API_BASE_URL}/dify`, {
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
      { status: 400 }
    );
  }
}
