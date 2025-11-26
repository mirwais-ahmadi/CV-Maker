import Image from "next/image";

import {FaCheckCircle, FaWind} from 'react-icons/fa';
import {IoPeopleSharp} from 'react-icons/io5';
import {HiDocumentDuplicate} from 'react-icons/hi';
import {SimpleCard} from "@/components/SimpleCard";
import {BiTimer} from 'react-icons/bi';
import {LuLayoutList} from 'react-icons/lu';
import {TbWriting} from 'react-icons/tb';
import Link from "next/link";
import {Footer} from "@/components/Footer";
import Templates from "@/components/Templates";
import ActiveUsers from "@/components/ActiveUsers";
import CvsCreated from "@/components/CvsCreated";

export default function Home() {

    return (
        <main>
            <div className="p-5">
                <div className="w-full rounded-3xl bg-cyan-50 px-10">
                    <div className="max-w-7xl p-5 mx-auto flex items-center justify-between flex-col lg:flex-row">
                        <div className="flex flex-col gap-5 p-8 items-center lg:items-start">
                            <h2 className="text-5xl lg:text-6xl text-center lg:text-left">Create Your CV <span
                                className="text-secondary">Easily</span></h2>
                            <p>Only 2% of resumes win. Yours will be one of them.</p>

                            <div className="flex gap-3 justify-center">
                                <Link href="/cv">
                                    <button className="button">Create Your CV</button>
                                </Link>
                            </div>
                            <div className="mt-5 flex flex-col gap-4 text-gray-500">
                                <div className="flex gap-3 items-center">
                                    <FaCheckCircle color="#1A91F0" size={25}/>
                                    Make sure you get the job you want.
                                </div>
                                <ActiveUsers />
                            </div>
                        </div>
                        <div>
                            <Image src="/hero/hero.png" alt="Hero Photo" width={750} height={750}/>
                        </div>
                    </div>
                </div>

                <CvsCreated />

                <div className="flex p-5 flex-col items-center gap-6 max-w-[1440px] mx-auto space-y-6">
                    <h3>Get hired fast with a powerful resume</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                        <SimpleCard
                            title="A better resume in minutes" Icon={BiTimer}
                            body="Replace your old resume in a few simple clicks. Our builder gives recruiters what they want."
                        />
                        <SimpleCard
                            title="ATS-friendly templates" Icon={LuLayoutList}
                            body="Tick every box and make sure your resume is never filtered out by the hiring software."
                        />
                        <SimpleCard
                            title="Pre-written content" Icon={TbWriting}
                            body="Stop worrying about words. Save time by adding pre-approved, tested content from certified writers."
                        />
                        <SimpleCard
                            title="Beat the competition" Icon={FaWind}
                            body="Our tested resume templates are designed to make you more attractive to recruiters."
                        />
                    </div>
                </div>
                <div className="flex p-5 flex-col items-center gap-6 max-w-[1440px] mx-auto space-y-6">
                    <h3>Templates</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                        <Templates />
                    </div>
                </div>
            </div>
            <Footer/>
        </main>
    );
}
