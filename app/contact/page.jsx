"use client";

import { useState, useEffect } from "react";
 import { useSession } from "next-auth/react";

export default function ContactPage() {
      const { data: session } = useSession();
      const [form, setForm] = useState({ name: "", email: "", message: "" });

    useEffect(() => {
            if (session?.user) {
                  setForm((prev) => ({
                        ...prev,
                        name: session.user.name || "",
                        email: session.user.email || ""
                  }));
                }
    }, [session]);

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch("/api/messages", {
            method: "POST",
            body: JSON.stringify(form),
        });
        alert("Message sent successfully!");
        setForm({ name: session?.user?.name || "", email: session?.user?.email || "", message: "" });
    };

    return (
        <div className="min-h-screen bg-lighter text-text-color py-20 px-6">
            <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-10 border border-gray-200">
                <h1 className="text-4xl font-bold text-primary mb-8 text-center">Contact Us</h1>
                <form onSubmit={handleSubmit} className="space-y-6">

                    <label className="form-label block">
                        <span className="text-sm mx-2">Full Name</span>
                                   <input
                                     name="name"
                                     value={form.name}
                                     onChange={handleChange}
                                     className="text-input"
                                     readOnly={!!session?.user}
                                   />
                    </label>

                    <label className="form-label block">
                        <span className="text-sm mx-2">Email</span>
                                   <input
                                     type="email"
                                     name="email"
                                     value={form.email}
                                     onChange={handleChange}
                                     className="text-input"
                                     readOnly={!!session?.user}
                                   />
                    </label>

                    <label className="form-label block">
                        <span className="text-sm mx-2">Message</span>
                        <textarea name="message" value={form.message} onChange={handleChange} rows={5} className="text-input" />
                    </label>

                    <button className="button w-full">Send Message</button>
                </form>
            </div>
        </div>
    );
}
