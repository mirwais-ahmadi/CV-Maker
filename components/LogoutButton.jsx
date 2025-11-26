"use client";
import { signOut } from "next-auth/react";
import { IoLogOutOutline } from "react-icons/io5";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function LogoutButton() {
    const { data: session } = useSession();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null; // جلوگیری از mismatch

    return (
        session && (
            <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="cursor-pointer hover:text-primary"
            >
                <IoLogOutOutline size={25} />
            </button>
        )
    );
}
