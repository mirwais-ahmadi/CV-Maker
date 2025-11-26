'use client'

import {useState} from 'react'
import {AiOutlineClose} from "react-icons/ai";

export default function StepSkills({formData, setFormData}) {
    const [skills, setSkills] = useState(formData.skills || [{name: '', level: ''}])

    const handleChange = (index, e) => {
        const updated = [...skills]
        updated[index][e.target.name] = e.target.value
        setSkills(updated)
        setFormData({...formData, skills: updated})
    }

    const addSkill = () => {
        setSkills([...skills, {name: '', level: ''}])
    }

    const removeSkill = (index) => {
        const updated = skills.filter((_, i) => i !== index)
        setSkills(updated)
        setFormData({...formData, skills: updated})
    }

    return (
        <div className="p-7 border-b border-lighter shadow-xs m-3 rounded-xl">
            <h2 className="text-lg font-semibold mb-4">Skills</h2>
            <div className="flex flex-col gap-4">
                {skills.map((skill, index) => (
                    <div
                        key={index}
                        className="flex gap-2"
                    >
                        <input
                            type="text"
                            name="name"
                            value={skill.name}
                            onChange={(e) => handleChange(index, e)}
                            className="text-input"
                            placeholder="Skill name (e.g. JavaScript)"
                        />

                        <select
                            name="level"
                            value={skill.level}
                            onChange={(e) => handleChange(index, e)}
                            className="text-input w-60"
                        >
                            <option value="">Level</option>
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                            <option value="Expert">Expert</option>
                        </select>

                        {skills.length > 1 && (
                            <button
                                onClick={() => removeSkill(index)}
                                className="text-red-500 hover:text-red-700 cursor-pointer px-2"
                                title="Remove"
                            >
                                <AiOutlineClose size={18}/>

                            </button>
                        )}
                    </div>
                ))}
            </div>

            <button
                onClick={addSkill}
                className="button mt-5"
            >
                + Add Skill
            </button>
        </div>
    )
}
