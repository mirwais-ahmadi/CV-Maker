"use client";

import {useState, useEffect} from "react";
import {MdDeleteForever} from "react-icons/md";

export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const [form, setForm] = useState({name: "", email: "", password: "", role: "admin"});

    function handleChange(e) {
        setForm({...form, [e.target.name]: e.target.value});
    }

    async function loadUsers() {
        const res = await fetch("/api/users");
        const data = await res.json();
        setUsers(data);
    }

    async function handleAdd(e) {
        e.preventDefault();
        await fetch("/api/users", {
            method: "POST",
            body: JSON.stringify(form),
        });
        setForm({name: "", email: "", password: "", role: "admin"});
        loadUsers();
    }

    async function handleDelete(id) {
        const yes = confirm("Are you sure you want to delete this admin?");
        if (!yes) return;

        await fetch(`/api/users/${id}`, {method: "DELETE"});
        loadUsers();
    }

    useEffect(() => {
        loadUsers();
    }, []);

    return (
        <div className="space-y-10">
            <h3 className="text-primary">Admins Management</h3>
            <h4 className=" mb-5 mx-2">Add a new admin</h4>
            <div className="shadow p-4 rounded-lg">
                <form onSubmit={handleAdd} className="space-x-6 flex flex-col lg:flex-row space-y-3 lg:space-y-0 items-end">
                    <label className="form-label">
                        <span className="text-sm mx-2">Name</span>
                        <input
                            type="text"
                            name="name"
                            className="text-input"
                            value={form.name}
                            onChange={handleChange}
                        />
                    </label>

                    <label className="form-label">
                        <span className="text-sm mx-2">Email</span>
                        <input
                            type="email"
                            name="email"
                            className="text-input"
                            value={form.email}
                            onChange={handleChange}
                        />
                    </label>

                    <label className="form-label">
                        <span className="text-sm mx-2">Password</span>
                        <input
                            type="password"
                            name="password"
                            className="text-input"
                            value={form.password}
                            onChange={handleChange}
                        />
                    </label>

                    <button className="button m-1 h-10 w-96">Add</button>
                </form>
            </div>

            <div>
                <h4 className=" mb-5 mx-2">Admins</h4>

                <table className="w-full text-left shadow p-4 py-2 rounded-lg overflow-hidden">
                    <thead className="bg-lighter text-primary">
                    <tr className="border-b border-gray-300">
                        <th className="px-5 py-4">Name</th>
                        <th className="px-3 py-2">Email</th>
                        <th className="px-3 py-2 text-right">Actions</th>
                    </tr>
                    </thead>

                    <tbody className="">
                    {users.map(u => (
                        <tr key={u._id} className="hover:bg-lighter p-5 border-b border-gray-100">
                            <td className="py-3 px-5">{u.name}</td>
                            <td className="px-3">{u.email}</td>
                            <td className="py-2 text-right px-3 space-x-3">
                                <button
                                    className="text-red-600 hover:underline cursor-pointer"
                                    onClick={() => handleDelete(u._id)}
                                >
                                    <MdDeleteForever size={25}/>
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
