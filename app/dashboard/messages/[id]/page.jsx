import dbConnect from "@/lib/dbConnect";
import Message from "@/models/Message";

export default async function MessageDetail({ params }) {
    await dbConnect();
    const message = await Message.findById(params.id);

    return (
        <div className="p-6 max-w-2xl">
            <h3 className="mb-4 text-primary font-bold text-3xl">Message Details</h3>
            <p><strong>Name:</strong> {message.name}</p>
            <p><strong>Email:</strong> {message.email}</p>
            <div className="mt-6 p-4 bg-lighter rounded-lg text-text-color">
                {message.message}
            </div>
        </div>
    );
}
