"use client"

import {useEffect, useState} from "react";
import Image from "next/image";

export default function Templates() {
    const [templates, setTemplates] = useState([])

    useEffect(() => {
        fetch("/api/templates")
            .then(res => res.json())
            .then(setTemplates)
            .catch(console.error)
    }, [])
    return (
        <>
            {templates.map((template, index) => (
                <div key={index}
                     className="border-gray-200 hover:border-lighter border hover:scale-105 rounded-lg cursor-pointer transition-all duration-150">
                    <Image
                        width="500"
                        height="500"
                        src={template.previewImage}
                        alt={template.name}
                        className=""
                    />

                    <div className="p-5 font-medium text-gray-700 space-y-2">
                        <h4>{template.name}</h4>
                        <p className="text-xs">
                            {template.description.slice(100)}
                            {template.description.length > 100 ? " . . ." : ""}
                        </p>
                    </div>
                </div>
            ))}
        </>
    )
}
