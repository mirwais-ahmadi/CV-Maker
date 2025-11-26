'use client'

import {useState, useEffect} from 'react'

export default function StepEducation({formData, setFormData}) {
    const [education, setEducation] = useState(
        formData.education || [
            {
                school: '',
                degree: '',
                field: '',
                city: '',
                startDate: '',
                endDate: '',
                description: '',
            },
        ]
    )

    const handleChange = (index, e) => {
        const updated = [...education]
        updated[index][e.target.name] = e.target.value
        setEducation(updated)
        setFormData({...formData, education, updated})
    }

    const addEducation = () => {
        setEducation([
            ...education,
            {
                school: '',
                degree: '',
                field: '',
                city: '',
                startDate: '',
                endDate: '',
                description: '',
            },
        ])
    }

    const removeEducation = (index) => {
        const updated = education.filter((_, i) => i !== index)
        setEducation(updated)
        setFormData({...formData, education: updated})
    }

    return (
        <div>
            {education.map((edu, index) => (
                <div
                    key={index}
                    className="p-7 mb-4 border-b border-gray-200 flex flex-col gap-7 shadow-sm m-3 rounded-xl"
                >
                    <div className="flex gap-5">
                        <label className="form-label">
                            <span className="text-sm mx-2">School</span>
                            <input
                                type="text"
                                name="school"
                                value={edu.school}
                                onChange={(e) => handleChange(index, e)}
                                className="text-input"
                            />
                        </label>

                        <label className="form-label">
                            <span className="text-sm mx-2">Degree</span>
                            <input
                                type="text"
                                name="degree"
                                value={edu.degree}
                                onChange={(e) => handleChange(index, e)}
                                className="text-input"
                            />
                        </label>
                    </div>

                    <label className="form-label">
                        <span className="text-sm mx-2">Field of Study</span>
                        <input
                            type="text"
                            name="field"
                            value={edu.field}
                            onChange={(e) => handleChange(index, e)}
                            className="text-input"
                        />
                    </label>

                    <div className="flex gap-5 flex-col lg:flex-row">
                        <div className="flex gap-2 flex-col md:flex-row">
                            <label className="form-label">
                                <span className="text-sm mx-2">Start Date</span>
                                <input
                                    type="month"
                                    name="startDate"
                                    value={edu.startDate}
                                    onChange={(e) => handleChange(index, e)}
                                    className="text-input"
                                />
                            </label>
                            <label className="form-label">
                                <span className="text-sm mx-2">End Date</span>
                                <input
                                    type="month"
                                    name="endDate"
                                    value={edu.endDate}
                                    onChange={(e) => handleChange(index, e)}
                                    className="text-input"
                                />
                            </label>
                        </div>

                        <div className="flex-grow">
                            <label className="form-label flex">
                                <span className="text-sm mx-2">City</span>
                                <input
                                    type="text"
                                    name="city"
                                    value={edu.city}
                                    onChange={(e) => handleChange(index, e)}
                                    className="text-input w-full"
                                />
                            </label>
                        </div>
                    </div>

                    <label className="form-label flex">
                        <span className="text-sm mx-2">Description</span>
                        <textarea
                            name="description"
                            value={edu.description}
                            onChange={(e) => handleChange(index, e)}
                            className="text-input min-h-20"
                        ></textarea>
                    </label>

                    {education.length > 1 && (
                        <button
                            type="button"
                            onClick={() => removeEducation(index)}
                            className="text-red-500 text-sm mt-2"
                        >
                            Remove
                        </button>
                    )}
                </div>
            ))}

            <button
                onClick={addEducation}
                className="button mx-3 bg-blue-500 text-white px-4 py-2 rounded-md"
            >
                + Add education
            </button>
        </div>
    )
}
