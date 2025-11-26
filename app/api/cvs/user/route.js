import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/dbConnect";
import Cv from "@/models/Cv";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const {user: session} = await getServerSession(authOptions);
        await dbConnect();
        const cvs = await Cv.find({owner: session.id});

        return NextResponse.json(cvs);
    } catch (error) {
        console.error("Error fetching user CVs:", error);
        return NextResponse.json([], { status: 200 });
    }
}
