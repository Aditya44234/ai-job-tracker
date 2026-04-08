import { connectDB } from "@/lib/db/mongodb";
import { registerUser } from "@/lib/services/auth.service";
import { NextResponse } from "next/server";





export async function POST(req: Request) {
    try {
        await connectDB();

        const { name, email, password } = await req.json();
        const user = await registerUser(name, email, password);

        return NextResponse.json({ user, message: "Registration successful" }, {

        });

    } catch (error: any) {

        return NextResponse.json(
            { error: error.message },
            { status: 400 }
        )
    }
}