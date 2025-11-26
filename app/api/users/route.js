import User from "@/models/User";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dbConnect from "@/lib/dbConnect";

export async function GET() {
    await dbConnect();
    const users = await User.find({role: "admin"});
    return Response.json(users);
}

export async function POST(req) {
    await dbConnect();
    const { name, email, password, role } = await req.json();
    await User.create({ name, email, password: await bcrypt.hash(password, 10), role });
    return Response.json({ ok: true });
}
