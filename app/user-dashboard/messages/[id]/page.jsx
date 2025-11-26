import prisma from "@/lib/prisma";

export default async function Page({params}) {
    const msg = await prisma.message.findUnique({
        where: { id: params.id }
    });

    return (
        <div>
            <h1 className="text-xl font-bold mb-2">{msg.subject}</h1>
            <p className="text-gray-600 mb-4">From: {msg.userEmail}</p>
            <p className="p-4 border rounded bg-white">{msg.message}</p>
        </div>
    );
}
