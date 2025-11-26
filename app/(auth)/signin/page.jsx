'use client'
import {useState} from "react";
import {signIn, getSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import Link from "next/link";

export default function SignInPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState(null);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErr(null);

        const res = await signIn("credentials", {
            redirect: false,
            email,
            password
        });

        if (res?.error) {
            setErr("Email or Password is incorrect");
        } else {
            const session = await getSession();

            if (session?.user?.role === "admin") {
                router.push("/dashboard");
            } else {
                router.push("/");
            }
        }
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
            <label className="form-label">
                <span className="text-sm mx-2">Email</span>
                <input
                    className="w-full mb-2 text-input"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </label>

            <label className="form-label">
                <span className="text-sm mx-2">Password</span>
                <input
                    className="w-full mb-4 text-input"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </label>
            <div className="flex justify-between items-center">
                {err && <p className="text-red-500">{err}</p>}
                <button className="button">Sign in</button>
                <Link className="text-secondary hover:text-darker p-3" href="/signup">Signup</Link>
            </div>

        </form>
    );
}
