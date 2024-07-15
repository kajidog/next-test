import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"; // 本番環境では必ず環境変数を使用してください

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;
  console.log(email, password);

  // ユーザー名とパスワードが同じかチェック
  if (email && password && email === password) {
    // JWTトークンを生成
    const token = jwt.sign(
      { email: email },
      JWT_SECRET,
      { expiresIn: "1h" } // トークンの有効期限を1時間に設定
    );

    return NextResponse.json({ token: token }, { status: 200 });
  } else {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }
}
