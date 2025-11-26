import { AiOutlineHome, AiOutlineInfoCircle } from 'react-icons/ai';
import { HiOutlineTemplate } from 'react-icons/hi';
import { RiContactsLine } from 'react-icons/ri';
import {MdDescription, MdMessage, MdSettings, MdSpaceDashboard} from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import {FaMessage, FaUser} from "react-icons/fa6";

export const navLinks = [
    {
        label: 'Home',
        href: '/',
        icon: AiOutlineHome
    },
    {
        label: 'Templates',
        href: '/templates',
        icon: HiOutlineTemplate

    },
    {
        label: 'About',
        href: '/about',
        icon: AiOutlineInfoCircle
    },
    {
        label: 'Contact',
        href: '/contact',
        icon: RiContactsLine
    }
]

export const sidebarLinks = [
    {
        label: 'Dashboard',
        href: '/dashboard',
        icon: MdSpaceDashboard
    },
    {
        label: 'Admins',
        href: '/dashboard/admins',
        icon: RiAdminFill
    },
    {
        label: 'Users',
        href: '/dashboard/users',
        icon: FaUser
    },
    {
        label: 'Messages',
        href: '/dashboard/messages',
        icon: FaMessage
    }
]

export const userSidebarLinks = [
    {
        label: "My CVs",
        href: "/user-dashboard/cv",
        icon: MdDescription
    },
    {
        label: "Messages",
        href: "/user-dashboard/messages",
        icon: MdMessage
    }
];
