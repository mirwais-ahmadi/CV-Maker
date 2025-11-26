'use client'

import { useEffect, useState } from "react"
import Image from "next/image";

export default function StepTemplate({ formData, setFormData }) {
    const [templates, setTemplates] = useState([])


    useEffect(() => {
        fetch("/api/templates")
            .then(res => res.json())
            .then(setTemplates)
            .catch(console.error)
    }, [])

    const handleSelect = (slug) => {
        setFormData({ ...formData, template: slug })
    }

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Select Your Template</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {templates.map((template) => (
                    <div
                        key={template.slug}
                        onClick={() => handleSelect(template.slug)}
                        className={`border rounded-lg cursor-pointer overflow-hidden transition-all duration-300 
                            ${formData.template === template.slug
                            ? 'border-blue-600 ring-2 ring-blue-300'
                            : 'border-gray-200 hover:border-blue-400'
                        }`}
                    >
                        <Image
                            width="300"
                            height="300"
                            src={template.previewImage}
                            alt={template.name}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-3 text-center font-medium text-gray-700">
                            {template.name}
                        </div>
                    </div>
                ))}
            </div>

            {formData.template && (
                <div className="text-center text-blue-600 font-medium mt-4">
                    Selected Template: {formData.template}
                </div>
            )}
        </div>
    )
}
