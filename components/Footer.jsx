import Link from "next/link";
import Image from "next/image";

import { RiFacebookCircleLine } from 'react-icons/ri';
import {BsInstagram} from "react-icons/bs";
import {AiOutlineInstagram} from "react-icons/ai";
import {TbBrandLinkedin} from "react-icons/tb";

export const Footer = () => {
    return (
        <footer className="bg-black p-8">
            <div className="flex flex-col lg:flex-row gap-7 max-w-7xl mx-auto">
                <div className="">
                    <Link href="/" className="flex items-center font-bold text-md space-x-1">
                        <Image src="/logo.svg" alt="logo" width={35} height={35} />
                        <span className="text-white">CV Maker</span>
                    </Link>
                </div>
                <div className="text-white flex flex-row gap-3">
                    <Link href="https://www.facebook.com" className="flex  items-center text-sm gap-1">
                        <RiFacebookCircleLine size={25} />
                        <span>Facebook</span>
                    </Link>
                    <Link href="https://www.instagram.com" className="flex  items-center text-sm gap-1">
                        <AiOutlineInstagram size={25} />
                        <span>Instagram</span>
                    </Link>
                    <Link href="https://www.linkedin.com" className="flex  items-center text-sm gap-1">
                        <TbBrandLinkedin size={25} />
                        <span>Linked In</span>
                    </Link>
                </div>
                <div className="text-gray-300 text-center">
                    <span>&copy; All Reserved By Sky Technologies</span>
                </div>
            </div>
        </footer>
    )
}
