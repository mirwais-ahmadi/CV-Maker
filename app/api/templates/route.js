import dbConnect from "@/lib/dbConnect";
import Template from "@/models/Template";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await dbConnect();
        const templates = await Template.find({}).lean();
        return NextResponse.json(templates);
    } catch (error) {
        console.error("API GET /api/templates error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
