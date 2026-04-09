import { connectDB } from "@/lib/db/mongodb";
import { Application } from "@/lib/models/Application";
import { verifyToken } from "@/lib/utils/auth";
import { NextRequest, NextResponse } from "next/server";



// UPDATE APPLICATION
export async function PUT(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();

        const token = req.cookies.get("token")?.value;
        if (!token) throw new Error("Unauthorized");

        const decoded: any = verifyToken(token);

        const body = await req.json();

        const updated = await Application.findOneAndUpdate(
            { _id: params.id, userId: decoded.userId },
            body,
            { new: true }
        );

        return NextResponse.json({ application: updated });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 400 }
        );
    }
}

// DELETE APPLICATION
export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();

        const token = req.cookies.get("token")?.value;
        if (!token) throw new Error("Unauthorized");

        const decoded: any = verifyToken(token);

        await Application.findOneAndDelete({
            _id: params.id,
            userId: decoded.userId,
        });

        return NextResponse.json({ message: "Deleted successfully" });
    } catch (error: any) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }
}