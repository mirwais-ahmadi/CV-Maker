import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Cv from "@/models/Cv";
import User from "@/models/User";

export async function GET() {
    await dbConnect();
    const cvs = await Cv.find().populate("owner", "name email role");
    return NextResponse.json(cvs);
}

export async function POST(req) {
    try {
        await dbConnect();
        const data = await req.json();

        if (!data.owner) {
            return NextResponse.json({ error: "Owner email is required" }, { status: 400 });
        }

        const user = await User.findOne({ email: data.owner });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const newCv = await Cv.create({
            ...data,
            owner: user._id,
        });

        console.log("✅ CV created successfully:", newCv._id);

        return NextResponse.json(newCv, { status: 201 });
    } catch (error) {
        console.error("❌ Error saving CV:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
