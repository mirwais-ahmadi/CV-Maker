'use client'

import {useState} from 'react'
import {AiOutlineClose} from "react-icons/ai";

export default function StepExperience({formData, setFormData}) {
    const [experiences, setExperiences] = useState(
        formData.experiences || [
            {
                jobTitle: '',
                employer: '',
                startDate: '',
                endDate: '',
                city: '',
                description: '',
            },
        ]
    )

    const handleChange = (index, e) => {
        const updated = [...experiences]
        updated[index][e.target.name] = e.target.value
        setExperiences(updated)
        setFormData({...formData, experiences: updated})
    }

    const addExperience = () => {
        setExperiences([
            ...experiences,
            {
                jobTitle: '',
                employer: '',
                startDate: '',
                endDate: '',
                city: '',
                description: '',
            },
        ])
    }

    const removeExperience = (index) => {
        const updated = experiences.filter((_, i) => i !== index)
        setExperiences(updated)
        setFormData({...formData, experiences: updated})
    }

    return (
        <div>
            {experiences.map((exp, i) => (
                <div
                    key={i}
                    className="p-7 mb-4 border-b border-lighter flex flex-col gap-7 shadow-xs m-3 rounded-xl"
                >
                    <label className="form-label">
                        <span className="text-sm mx-2">Job Title</span>
                        <input
                            type="text"
                            name="jobTitle"
                            value={exp.jobTitle}
                            onChange={(e) => handleChange(i, e)}
                            className="text-input"
                        />
                    </label>

                    <label className="form-label">
                        <span className="text-sm mx-2">Employer</span>
                        <input
                            type="text"
                            name="employer"
                            value={exp.employer}
                            onChange={(e) => handleChange(i, e)}
                            className="text-input"
                        />
                    </label>

                    <div className="grid grid-cols-2 gap-4">
                        <label className="form-label">
                            <span className="text-sm mx-2">Start Date</span>
                            <input
                                type="month"
                                name="startDate"
                                value={exp.startDate}
                                onChange={(e) => handleChange(i, e)}
                                className="text-input"
                            />
                        </label>
                        <label className="form-label">
                            <span className="text-sm mx-2">End Date</span>
                            <input
                                type="month"
                                name="endDate"
                                value={exp.endDate}
                                onChange={(e) => handleChange(i, e)}
                                className="text-input"
                            />
                        </label>
                    </div>

                    <label className="form-label">
                        <span className="text-sm mx-2">City</span>
                        <input
                            type="text"
                            name="city"
                            value={exp.city}
                            onChange={(e) => handleChange(i, e)}
                            className="text-input"
                        />
                    </label>

                    <label className="form-label">
                        <span className="text-sm mx-2">Description</span>
                        <textarea
                            name="description"
                            value={exp.description}
                            onChange={(e) => handleChange(i, e)}
                            className="text-input min-h-[100px]"
                        />
                    </label>

                    {experiences.length > 1 && (
                        <div className="flex justify-end">
                            <button
                                onClick={() => removeExperience(i)}
                                className="ml-4 text-sm text-red-500 hover:text-red-700 cursor-pointer text-right bg-gray-100 p-3 rounded"
                            >
                                <AiOutlineClose size={15}/>
                            </button>
                        </div>
                    )}
                </div>
            ))}

            <div className="flex justify-between mt-4">
                <button onClick={addExperience} className="button ml-4">
                    + Add another experience
                </button>
            </div>
        </div>
    )
}
