import { connectDB } from "@/lib/db/mongodb";
import { registerUser, loginUser } from "@/lib/services/auth.service";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();

    const {name, email, password } = await req.json();

    await registerUser(name,email, password);

    // auto login after register
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