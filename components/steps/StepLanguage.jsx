'use client'

import { useState } from 'react'
import { AiOutlineClose } from "react-icons/ai";

export default function StepLanguages({ formData, setFormData }) {
    const [languages, setLanguages] = useState(formData.languages || [{ language: '', level: '' }])

    const handleChange = (index, e) => {
        const updated = [...languages]
        updated[index][e.target.name] = e.target.value
        setLanguages(updated)
        setFormData({ ...formData, languages: updated })
    }

    const addLanguage = () => {
        setLanguages([...languages, { language: '', level: '' }])
    }

    const removeLanguage = (index) => {
        const updated = languages.filter((_, i) => i !== index)
        setLanguages(updated)
        setFormData({ ...formData, languages: updated })
    }

    return (
        <div className="p-7 border-b border-lighter shadow-xs m-3 rounded-xl">
            <h2 className="text-lg font-semibold mb-4">Languages</h2>

            <div className="flex flex-col gap-4">
                {languages.map((lang, index) => (
                    <div
                        key={index}
                        className="flex gap-2"
                    >
                        <input
                            type="text"
                            name="language"
                            value={lang.language}
                            onChange={(e) => handleChange(index, e)}
                            className="text-input"
                            placeholder="Language (e.g. English)"
                        />

                        <select
                            name="level"
                            value={lang.level}
                            onChange={(e) => handleChange(index, e)}
                            className="text-input w-60"
                        >
                            <option value="">Level</option>
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                            <option value="Fluent">Fluent</option>
                            <option value="Native">Native</option>
                        </select>

                        {languages.length > 1 && (
                            <button
                                onClick={() => removeLanguage(index)}
                                className="text-red-500 hover:text-red-700 cursor-pointer px-2"
                                title="Remove"
                            >
                                <AiOutlineClose size={18} />
                            </button>
                        )}
                    </div>
                ))}
            </div>

            <button
                onClick={addLanguage}
                className="button mt-5"
            >
                + Add Language
            </button>
        </div>
    )
}
