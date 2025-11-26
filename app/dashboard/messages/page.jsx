"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function MessagesPage() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        fetch("/api/messages")
            .then((res) => res.json())
            .then((data) => setMessages(data));
    }, []);

    return (
        <div className="p-6">
            <h3 className="mb-6 text-primary">Messages</h3>
            <table className="w-full text-left shadow rounded-lg overflow-hidden">
                <thead className="bg-lighter text-primary">
                <tr>
                    <th className="px-5 py-4">Name</th>
                    <th className="px-5 py-4">Email</th>
                    <th className="px-5 py-4 text-right">View</th>
                </tr>
                </thead>
                <tbody>
                {messages.map((m) => (
                    <tr key={m._id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-5 capitalize">{m.name}</td>
                        <td className="px-5">{m.email}</td>
                        <td className="px-5 text-right">
                            <Link href={`/dashboard/messages/${m._id}`} className="text-secondary hover:underline">
                                Open
                            </Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
