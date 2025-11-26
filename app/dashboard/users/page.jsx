"use client";

import { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";

export default function UsersPage() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch("/api/clients")
            .then((res) => res.json())
            .then((data) => setUsers(data));
    }, []);

    const handleDelete = async (id) => {
        const yes = confirm("Are you sure you want to delete this client?");
        if (!yes) return;

        const res = await fetch(`/api/users/${id}`, {
            method: "DELETE",
        });

        if (res.ok) {
            setUsers(users.filter((u) => u._id !== id));
        }
    };

    return (
        <div className="p-6">
            <h3 className="mb-6 text-primary">Users List</h3>

            <div className="overflow-x-auto bg-white shadow rounded-lg">
                <table className="w-full text-left shadow p-4 py-2 rounded-lg overflow-hidden">
                    <thead className="bg-lighter text-primary">
                    <tr className="border-b border-gray-300">
                        <th className="px-5 py-4">Name</th>
                        <th className="px-3 py-2">Email</th>
                        <th className="px-3 py-2">Role</th>
                        <th className="px-3 py-2 text-right">Actions</th>
                    </tr>
                    </thead>

                    <tbody>
                    {users.map((user) => (
                        <tr key={user._id} className="hover:bg-lighter p-5 border-b border-gray-100">
                            <td className="py-3 px-5 capitalize">{user.name}</td>
                            <td className="px-3">{user.email}</td>
                            <td className="px-3 text-secondary font-semibold">{user.role}</td>

                            <td className="py-2 text-right px-3 space-x-3">
                                <button
                                    className="text-red-600 hover:underline cursor-pointer"
                                    onClick={() => handleDelete(user._id)}
                                >
                                    <MdDeleteForever size={25} />
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
}
