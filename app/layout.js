import "./globals.css";
import localFont from "next/font/local";
import {Navbar} from "@/components/Navbar";
import Providers from "@/app/Providers";

const poppins = localFont({
    src: [
        {
            path: '../fonts/Poppins-Light.ttf',
            weight: '200',
            style: 'normal',
        },
        {
            path: '../fonts/Poppins-Regular.ttf',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../fonts/Poppins-Bold.ttf',
            weight: '700',
            style: 'normal',
        },
        {
            path: '../fonts/Poppins-Black.ttf',
            weight: '800',
            style: 'normal',
        },
    ]
})

export const metadata = {
    title: "CV Maker",
    description: "Fast and easy to create a new CV",
};

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <body
            className={`${poppins.className}`}
        >
        <Providers>
            <div className="sticky top-0 bg-white">
                <Navbar/>
            </div>
            {children}
        </Providers>
        </body>
        </html>
    );
}
