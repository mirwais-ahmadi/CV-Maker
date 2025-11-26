'use client'

import Image from "next/image";
import Link from "next/link";
import {useState} from "react";

import {navLinks} from "@/constants";
import {ToggleButton} from "@/components/ToggleButton";
import {AiOutlineClose} from "react-icons/ai";

import {useSession} from "next-auth/react";
import LogoutButton from "@/components/LogoutButton";

export const Navbar = () => {

    const { data: session } = useSession();

    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="relative">
            <div
                className={`fixed pb-10 lg:pb-0 h-screen bg-black w-full opacity-70 lg:hidden ${isOpen ? "" : "hidden"}`}
                onClick={() => setIsOpen(prev => !prev)}
            />
            <div className="text-text-color px-6 py-4 items-center max-w-[1920px] mx-auto flex justify-between duration-300">
                <div>
                    <Link href="/" className="flex items-center font-bold text-md space-x-1 text-primary">
                        <Image src="/logo.svg" alt="logo" width={35} height={35} />
                        <span>CV Maker</span>
                    </Link>
                </div>
                <div className="lg:hidden">
                    <ToggleButton toggle={setIsOpen} />
                </div>
                <div className={`flex items-center space-x-4 flex-col lg:flex-row space-y-5 lg:space-y-0 absolute lg:static top-0 right-0 h-screen lg:h-auto p-5 lg:p-0 bg-lighter lg:bg-transparent pt- lg:pt-0 justify-between lg:flex ${!isOpen ? "hidden" : ""}`}>
                    <div className="flex flex-col lg:flex-row space-y-3">
                        <div className="-mt-1 -ml-2">
                            <button
                                onClick={() => setIsOpen(prev => !prev)}
                                className="text-secondary m-2 hover:text-darker cursor-pointer lg:hidden"
                            >
                                <AiOutlineClose size={25}/>
                            </button>
                        </div>
                        <div className="flex flex-col lg:flex-row">
                            {
                                navLinks.map((link, index) => (
                                    <Link key={index} href={link.href} className="p-3 hover:text-secondary duration-100 flex felx-row gap-2">
                                        <link.icon size={20} />
                                        {link.label}
                                    </Link>
                                ))
                            }
                        </div>
                    </div>
                    <div className="h-5 border-r border-secondary hidden lg:block" />
                    <div className="flex items-center space-x-6 flex-col lg:flex-row space-y-4 lg:space-y-0">
                        <div className="flex items-center space-x-6 flex-col lg:flex-row space-y-4 lg:space-y-0">

                            {session ? (
                                session.user.role === 'admin' ? (
                                    <Link href="/dashboard" className="text-secondary hover:text-darker font-normal duration-100">
                                        Dashboard
                                    </Link>
                                ) : (
                                    <Link href="/user-dashboard" className="text-secondary hover:text-darker font-normal duration-100">
                                        Dashboard
                                    </Link>
                                )
                            ) : (
                                <Link href="/signin" className="text-secondary hover:text-darker font-normal duration-100">
                                    Sign in
                                </Link>
                            )}

                        </div>

                        <Link href="/cv">
                            <button className="button">Create Your CV</button>
                        </Link>
                        <LogoutButton />
                    </div>
                </div>
            </div>
        </nav>
    )
}