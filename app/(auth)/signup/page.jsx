'use client'
import {useState} from "react";
import {useRouter} from "next/navigation";
import Link from "next/link";

export default function SignUpPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const res = await fetch("/api/auth/signup", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email, password, name})
        });

        const data = await res.json();
        if (!res.ok) {
            setError(data.error || "Signup failed");
        } else {
            router.push("/signin");
        }
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
            <label className="form-label">
                <span className="text-sm mx-2">Name</span>
                <input
                    className="w-full mb-2 text-input"
                    value={name} onChange={e => setName(e.target.value)}
                />
            </label>
            <label className="form-label">
                <span className="text-sm mx-2">Email</span>
                <input
                    className="w-full mb-2 text-input"
                    value={email} onChange={e => setEmail(e.target.value)}
                />
            </label>
            <label className="form-label">
                <span className="text-sm mx-2">Password</span>
                <input
                    className="w-full mb-4 text-input"
                    type="password" value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </label>
            <div className="flex justify-between items-center">
                {error && <p className="text-red-500">{error}</p>}
                <button className="button">Sign up</button>
                <Link className="text-secondary hover:text-darker p-3" href="/signin">Signin</Link>
            </div>
        </form>
);
}
