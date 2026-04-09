import { connectDB } from "@/lib/db/mongodb";
import { loginUser } from "@/lib/services/auth.service";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    const { user, token } = await loginUser(email, password);

    const response = NextResponse.json({ user });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}