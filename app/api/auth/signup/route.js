import {NextResponse} from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import bcrypt from "bcrypt";

export async function POST(req) {
    try {
        const body = await req.json();
        const {email, password, name} = body;

        if (!email || !password) {
            return NextResponse.json({error: "Email and password are required"}, {status: 400});
        }

        await dbConnect();

        const existing = await User.findOne({email: email.toLowerCase()});
        if (existing) {
            return NextResponse.json({error: "User already exists"}, {status: 409});
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const user = await User.create({
            name: name || "",
            email: email.toLowerCase(),
            password: hash,
        });

        // Don't return password
        const safeUser = {_id: user._id, name: user.name, email: user.email, createdAt: user.createdAt};

        return NextResponse.json({user: safeUser}, {status: 201});
    } catch (err) {
        console.error("Signup error:", err);
        return NextResponse.json({error: err.message}, {status: 500});
    }
}
