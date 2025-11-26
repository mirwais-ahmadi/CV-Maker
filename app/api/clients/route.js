import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export async function GET() {
    await dbConnect();
    const users = await User.find({ role: "user" }).select("-password");
    return new Response(JSON.stringify(users), { status: 200 });
}
