import { connectDB } from "@/lib/db/mongodb";
import { User } from "@/lib/models/User";
import { verifyToken } from "@/lib/utils/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await connectDB();

        const token = req.cookies.get("token")?.value;

        if (!token) throw new Error("Unauthorized");

        const decoded: any = verifyToken(token);

        const user = await User.findById(decoded.userId).select("-password");

        return NextResponse.json({ user });
    } catch (error: any) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }
}