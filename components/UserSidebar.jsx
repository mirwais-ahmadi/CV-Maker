"use client";
import Link from "next/link";
import {usePathname} from "next/navigation";
import { userSidebarLinks } from "@/constants";
import {FaUser} from "react-icons/fa6";

export default function UserSidebar() {
    const pathname = usePathname();

    return (
        <div className="h-screen flex flex-col p-4 lg:pr-6 space-y-4 bg-lighter border-r border-white">
            <div className="flex items-center gap-3 text-primary p-1">
                <FaUser size={25} />
                <h4 className="font-bold text-center text-primary hidden lg:block">User Dashboard</h4>
            </div>

            <div className="flex flex-col mt-2 space-y-2">
                {userSidebarLinks.map((item) => {
                    const active = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`side-item ${active ? "active" : ""} flex lg:space-x-2 items-center lg:justify-start`}
                        >
                            <item.icon size={20} />
                            <span className="hidden lg:block">{item.label}</span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}