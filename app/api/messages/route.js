import Message from "@/models/Message";
import dbConnect from "@/lib/dbConnect";

export async function POST(req) {
    await dbConnect();
    const body = await req.json();
    await Message.create(body);
    return new Response("Saved", { status: 200 });
}

export async function GET() {
    await dbConnect();
    const messages = await Message.find().sort({ createdAt: -1 });
    return new Response(JSON.stringify(messages), { status: 200 });
}
