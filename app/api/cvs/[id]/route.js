import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Cv from "@/models/Cv";
import User from "@/models/User";

export async function GET(request, { params }) {
    const { id } = await params;
    try {
        await dbConnect();
        const cv = await Cv.findById(id).populate("owner", "name email role");

        if (!cv) {
            return NextResponse.json({ error: "CV not found" }, { status: 404 });
        }

        return NextResponse.json(cv);
    } catch (error) {
        console.error("❌ Error fetching CV:", error);
        return NextResponse.json({ error: "Failed to fetch CV" }, { status: 500 });
    }
}

// ✏️ ویرایش CV موجود
export async function PUT(request, { params }) {
    const { id } = await params;
    try {
        await dbConnect();
        const data = await request.json();

        // اگر owner ایمیل است → آن را به ObjectId کاربر تبدیل کن
        if (data.owner && typeof data.owner === "string") {
            const user = await User.findOne({ email: data.owner });
            if (user) {
                data.owner = user._id;
            }
        }

        const updatedCv = await Cv.findByIdAndUpdate(
            id,
            {
                ...data,
                updatedAt: new Date(),
            },
            { new: true, runValidators: true }
        );

        if (!updatedCv) {
            return NextResponse.json({ error: "CV not found" }, { status: 404 });
        }

        return NextResponse.json(updatedCv);
    } catch (error) {
        console.error("❌ Error updating CV:", error);
        return NextResponse.json({ error: "Failed to update CV" }, { status: 500 });
    }
}
