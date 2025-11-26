import User from "@/models/User";
import mongoose from "mongoose";

export async function DELETE(_, { params }) {
    await mongoose.connect(process.env.MONGODB_URI);
    await User.findByIdAndDelete(params.id);
    return Response.json({ ok: true });
}
