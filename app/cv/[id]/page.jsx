'use client'

import {useState, useEffect} from 'react'
import { useParams, useRouter } from 'next/navigation'
import StepPersonal from "@/components/steps/StepPersonal";
import StepEducation from "@/components/steps/StepEducation";
import StepSkills from "@/components/steps/StepSkills";
import StepExperience from "@/components/steps/StepExperience";
import StepPreview from "@/components/steps/StepPreview";
import {BsPersonLinesFill} from 'react-icons/bs';
import {MdSchool, MdWork} from "react-icons/md";
import {RiProfileFill} from "react-icons/ri";
import {HiEye, HiTemplate} from 'react-icons/hi';
import StepLanguage from "@/components/steps/StepLanguage";
import {FaLanguage} from "react-icons/fa";
import StepTemplate from "@/components/steps/StepTemplate";
import {useSession} from "next-auth/react";

export default function CVBuilder() {
    const {data: session} = useSession();
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({})
    const [isEditing, setIsEditing] = useState(false)
    const params = useParams()
    const router = useRouter()
    const cvId = params.id

    useEffect(() => {
        if (session?.user?.email) {
            setFormData(prevData => ({
                ...prevData,
                owner: session.user.email
            }));
        }
    }, [session]);

    useEffect(() => {
        if (cvId) {
            fetchCVData()
        }
    }, [cvId])

    const fetchCVData = async () => {
        try {
            const res = await fetch(`/api/cvs/${cvId}`)
            if (!res.ok) {
                throw new Error('Failed to fetch CV data')
            }
            const cvData = await res.json()
            setFormData(cvData)
            setIsEditing(true)
        } catch (error) {
            console.error("Error fetching CV data:", error)
        }
    }

    const nextStep = () => setStep((prev) => prev + 1)
    const prevStep = () => setStep((prev) => prev - 1)

    const handleFinish = async () => {
        try {
            const updatedFormData = {
                ...formData,
                owner: session?.user?.email || formData.owner,
            };

            console.log('Data before sending:', updatedFormData);

            let res;
            if (isEditing) {
                res = await fetch(`/api/cvs/${cvId}`, {
                    method: "PUT",
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(updatedFormData)
                });
            } else {
                res = await fetch("/api/cvs", {
                    method: "POST",
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(updatedFormData)
                });
            }

            if (!res.ok) {
                throw new Error('Failed to save CV');
            }

            const savedCV = await res.json();
            console.log("CV saved successfully:", savedCV);
            router.push('/user-dashboard/cv');

        } catch (error) {
            console.error("Error saving CV:", error);
            alert('Error saving CV. Please try again.');
        }
    };


    const steps = [
        <StepPersonal key="personal" formData={formData} setFormData={setFormData}/>,
        <StepEducation key="education" formData={formData} setFormData={setFormData}/>,
        <StepSkills key="skills" formData={formData} setFormData={setFormData}/>,
        <StepExperience key="experience" formData={formData} setFormData={setFormData}/>,
        <StepLanguage key="language" formData={formData} setFormData={setFormData} />,
        <StepTemplate key="template" formData={formData} setFormData={setFormData}/>,
        <StepPreview key="preview" formData={formData}/>,
    ]

    return (
        <div className="p-10">
            <div className="max-w-6xl mx-auto flex flex-col space-y-10 p-5 rounded-xl">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">
                        {isEditing ? 'Edit CV' : 'Create New CV'}
                    </h1>
                    {isEditing && (
                        <span className="text-sm text-gray-500">Editing: {cvId}</span>
                    )}
                </div>
                <div className='flex py-5 gap-1 border-b border-gray-300 overflow-x-auto'>
                    <button className={`tab-item ${step === 1 ? "active" : ""}`} onClick={() => {setStep(1)}}>
                        <BsPersonLinesFill size={25}/>
                        <span className="p-2 flex-grow">Personal</span>
                    </button>
                    <button className={`tab-item ${step === 2 ? "active" : ""}`} onClick={() => {setStep(2)}}>
                        <MdSchool size={25}/>
                        <span className="p-2 flex-grow">Education</span>
                    </button>
                    <button className={`tab-item ${step === 3 ? "active" : ""}`} onClick={() => {setStep(3)}}>
                        <RiProfileFill size={25}/>
                        <span className="p-2 flex-grow">Skills</span>
                    </button>
                    <button className={`tab-item ${step === 4 ? "active" : ""}`} onClick={() => {setStep(4)}}>
                        <MdWork size={25}/>
                        <span className="p-2 flex-grow">Experience</span>
                    </button>
                    <button className={`tab-item ${step === 5 ? "active" : ""}`} onClick={() => {setStep(5)}}>
                        <FaLanguage size={25}/>
                        <span className="p-2 flex-grow">Language</span>
                    </button>
                    <button className={`tab-item ${step === 6 ? "active" : ""}`} onClick={() => {setStep(6)}}>
                        <HiTemplate size={25}/>
                        <span className="p-2 flex-grow">Template</span>
                    </button>
                    <button className={`tab-item ${step === 7 ? "active" : ""}`} onClick={() => {setStep(7)}}>
                        <HiEye size={25}/>
                        <span className="p-2 flex-grow">Preview</span>
                    </button>
                </div>
                <div>
                    {steps[step - 1]}
                    <div className="flex flex-col items-end mt-10">
                        <span className="mt-6 w-24 text-center text-sm text-gray-500">Step {step} of {steps.length}</span>
                        <div className="flex justify-end p-3 space-x-3">
                            <button onClick={prevStep} className={`px-5 py-2 bg-lighter rounded-md hover:bg-gray-300 duration-100 cursor-pointer ${step === 1 ? "hidden" : ""}`}>Back</button>
                            <button onClick={nextStep} className={`px-5 py-2 bg-secondary text-white hover:bg-darker rounded-md duration-100 cursor-pointer ${step === 7 ? "hidden" : ""}`}>Next</button>
                            <button
                                onClick={handleFinish}
                                className={`px-5 py-2 bg-secondary text-white hover:bg-darker rounded-md duration-100 cursor-pointer ${step === 7 ? "" : "hidden"}`}
                            >Update CV
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}