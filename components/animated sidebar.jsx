'use client'

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { navLinks } from "@/constants";
import { ToggleButton } from "@/components/ToggleButton";
import { AiOutlineClose } from "react-icons/ai";

export const  Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            document.body.style.overflow = isOpen ? "hidden" : "";
        }
        return () => {
            if (typeof window !== "undefined") document.body.style.overflow = "";
        };
    }, [isOpen]);

    return (
        <nav className="relative">
            <div
                onClick={() => setIsOpen(false)}
                className={`fixed inset-0 bg-black transition-opacity duration-300 lg:hidden z-40 ${
                    isOpen ? "opacity-70 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
                aria-hidden={!isOpen}
            />

            <div className="text-text-color px-6 py-4 items-center max-w-[1920px] mx-auto flex justify-between">
                <div>
                    <Link href="/" className="flex items-center font-bold text-md space-x-1">
                        <Image src="/logo.svg" alt="logo" width={35} height={35} />
                        <span>CV Maker</span>
                    </Link>
                </div>

                <div className="lg:hidden">
                    <ToggleButton toggle={setIsOpen} />
                </div>

                <div
                    className={`absolute top-0 right-0 h-screen w-[85%] max-w-xs p-5 lg:static lg:h-auto lg:w-auto lg:p-0 bg-lighter lg:bg-transparent transform transition-transform transition-opacity duration-300 ease-out z-50 ${
                        isOpen
                            ? "translate-x-0 opacity-100 pointer-events-auto"
                            : "translate-x-full opacity-0 pointer-events-none"
                    } lg:translate-x-0 lg:opacity-100 lg:pointer-events-auto`}
                    style={{ willChange: "transform, opacity" }}
                    aria-hidden={!isOpen}
                >
                    <div className="flex flex-col lg:flex-row justify-between h-full">
                        <div className="flex flex-col lg:flex-row space-y-3 lg:space-y-0">
                            <div className="-mt-1 -ml-2">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-secondary m-2 hover:text-darker cursor-pointer lg:hidden"
                                    aria-label="Close menu"
                                >
                                    <AiOutlineClose size={25} />
                                </button>
                            </div>

                            <div className="flex flex-col lg:flex-row">
                                {navLinks.map((link) => {
                                    const Icon = link.icon;
                                    return (
                                        <Link
                                            key={link.href ?? link.label}
                                            href={link.href}
                                            className="p-3 hover:text-secondary duration-100 flex flex-row gap-2 items-center"
                                        >
                                            {Icon ? <Icon size={20} /> : null}
                                            {link.label}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="h-5 border-r border-secondary hidden lg:block" />

                        <div className="flex items-center space-x-6 flex-col lg:flex-row space-y-4 lg:space-y-0">
                            <Link href="/" className="text-secondary hover:text-darker font-normal duration-100">
                                Sign in
                            </Link>

                            <Link href="/cv">
                                <button className="button">Create Your CV</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}