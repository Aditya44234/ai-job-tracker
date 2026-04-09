import { connectDB } from "@/lib/db/mongodb";
import { Application } from "@/lib/models/Application";
import { verifyToken } from "@/lib/utils/auth";
import { NextRequest, NextResponse } from "next/server";

// CREATE APPLICATION
export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const token = req.cookies.get("token")?.value;
        if (!token) throw new Error("Unauthorized");

        const decoded: any = verifyToken(token);

        const body = await req.json();

        const application = await Application.create({
            ...body,
            userId: decoded.userId,
        });

        return NextResponse.json({ application });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 400 }
        );
    }
}

// GET ALL APPLICATIONS
export async function GET(req: NextRequest) {
    try {
        await connectDB();

        const token = req.cookies.get("token")?.value;
        if (!token) throw new Error("Unauthorized");

        const decoded: any = verifyToken(token);

        const applications = await Application.find({
            userId: decoded.userId,
        }).sort({ createdAt: -1 });

        return NextResponse.json({ applications });
    } catch (error: any) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }
}