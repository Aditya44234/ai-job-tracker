import { connectDB } from "@/lib/db/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
    await connectDB();
    return NextResponse.json({
        message: "DB connected successfully "
    })
}

