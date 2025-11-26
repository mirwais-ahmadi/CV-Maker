'use client';

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import {MdEdit} from "react-icons/md";

export default function Page() {
    const { data: session, status } = useSession();
    const [cvs, setCvs] = useState([]);

    useEffect(() => {
        if (status === "authenticated") {
            fetch("/api/cvs/user")
                .then((res) => res.json())
                .then((data) => setCvs(data));
        }
    }, [status]);

    if (status === "loading") return <p className="p-6">Loading...</p>;
    if (status === "unauthenticated") return <p className="p-6 text-red-500">Please log in to continue.</p>;

    return (
        <div className="p-6">
            <h3 className="text-primary font-bold text-xl mb-4">Your CVs</h3>

            {cvs.length === 0 && (
                <p className="text-gray-500">No CVs yet. Create one!</p>
            )}

            <div className="space-y-3">
                {cvs.map(c => (
                    <div key={c._id} className="bg-white p-4 px-6 rounded-xl shadow-sm flex justify-between items-center hover:shadow-md duration-200">
                        <div>
                            <div className="font-semibold">
                                {c.firstName} {c.lastName} — {c.jobTitle || "Untitled CV"}
                            </div>
                            <div className="text-sm text-gray-500">
                                {new Date(c.updatedAt).toLocaleString()}
                            </div>
                        </div>
                        <Link href={`/cv/${c._id}`} className="text-secondary hover:scale-120 duration-200">
                            <MdEdit size={20} />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
