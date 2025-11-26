"use client";
import Link from "next/link";
import {usePathname} from "next/navigation";

import {sidebarLinks} from "@/constants";
import {MdAdminPanelSettings} from "react-icons/md";

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="h-screen flex flex-col p-4 lg:pr-6  space-y-4 bg-lighter border-r border-white">
            <div className="flex items-center justify-center lg:p-2 text-primary lg:space-x-2">
                <MdAdminPanelSettings size={35} />
                <h2 className="text-2xl font-bold hidden lg:block">Admin Panel</h2>
            </div>
            <div className="flex flex-col mt-2 space-y-2">
                {sidebarLinks.map((item) => {
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
