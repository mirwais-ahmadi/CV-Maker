'use client'

import {HiOutlineMail} from "react-icons/hi";
import {BiPhoneCall} from "react-icons/bi";
import {FaMapMarkerAlt, FaLanguage} from "react-icons/fa";
import {MdWork, MdSchool} from "react-icons/md";
import {RiProfileFill} from "react-icons/ri";

export default function ClassicTemplate({formData}) {
    return (
        <div
            className=" p-10 space-y-8 font-serif">

            {/* Header */}
            <div className="border-b border-gray-400 pb-4">
                <h1 className="text-3xl font-bold uppercase tracking-wide text-gray-800">
                    {formData.firstName} {formData.lastName}
                </h1>
                <p className="text-lg text-gray-600 italic">{formData.jobTitle}</p>

                <div className="flex flex-wrap gap-5 text-sm text-gray-700 mt-3">
                    {formData.email && (
                        <p className="flex items-center gap-2"><HiOutlineMail size={16}/> {formData.email}</p>
                    )}
                    {formData.phone && (
                        <p className="flex items-center gap-2"><BiPhoneCall size={16}/> {formData.phone}</p>
                    )}
                    {formData.address && (
                        <p className="flex items-center gap-2"><FaMapMarkerAlt
                            size={16}/> {formData.address}, {formData.city}</p>
                    )}
                </div>
            </div>

            {/* Summary */}
            {formData.summary && (
                <section>
                    <h2 className="text-xl font-semibold border-b border-gray-400 mb-2 pb-1 text-gray-800">Profile
                        Summary</h2>
                    <p className="text-gray-700 leading-relaxed text-sm">{formData.summary}</p>
                </section>
            )}

            {/* Education */}
            {formData.education?.length > 0 && (
                <section>
                    <h2 className="text-xl font-semibold border-b border-gray-400 mb-2 pb-1 flex items-center gap-2 text-gray-800">
                        <MdSchool size={20}/> Education
                    </h2>
                    <div className="space-y-3">
                        {formData.education.map((edu, i) => (
                            <div key={i}>
                                <div className="flex justify-between text-sm">
                                    <p className="font-semibold text-gray-800">{edu.degree} in {edu.field}</p>
                                    <p className="text-gray-500">{edu.startDate} - {edu.endDate}</p>
                                </div>
                                <p className="text-gray-600 text-sm">{edu.school}, {edu.city}</p>
                                {edu.description && <p className="text-gray-700 text-sm mt-1">{edu.description}</p>}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Experience */}
            {formData.experiences?.length > 0 && (
                <section>
                    <h2 className="text-xl font-semibold border-b border-gray-400 mb-2 pb-1 flex items-center gap-2 text-gray-800">
                        <MdWork size={20}/> Experience
                    </h2>
                    <div className="space-y-3">
                        {formData.experiences.map((exp, i) => (
                            <div key={i}>
                                <div className="flex justify-between text-sm">
                                    <p className="font-semibold text-gray-800">{exp.jobTitle}</p>
                                    <p className="text-gray-500">{exp.startDate} - {exp.endDate}</p>
                                </div>
                                <p className="text-gray-600 text-sm">{exp.city}</p>
                                {exp.description && <p className="text-gray-700 text-sm mt-1">{exp.description}</p>}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills */}
            {formData.skills?.length > 0 && (
                <section>
                    <h2 className="text-xl font-semibold border-b border-gray-400 mb-2 pb-1 flex items-center gap-2 text-gray-800">
                        <RiProfileFill size={20}/> Skills
                    </h2>
                    <ul className="grid grid-cols-2 md:grid-cols-3 gap-x-4 text-sm text-gray-700">
                        {formData.skills.map((skill, i) => (
                            <li key={i} className="flex justify-between">
                                <span>{skill.name}</span>
                                <span className="text-gray-500">{skill.level}</span>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {/* Languages */}
            {formData.languages?.length > 0 && (
                <section>
                    <h2 className="text-xl font-semibold border-b border-gray-400 mb-2 pb-1 flex items-center gap-2 text-gray-800">
                        <FaLanguage size={18}/> Languages
                    </h2>
                    <ul className="grid grid-cols-2 gap-x-4 text-sm text-gray-700">
                        {formData.languages.map((lang, i) => (
                            <li key={i} className="flex justify-between">
                                <span>{lang.language}</span>
                                <span className="text-gray-500">{lang.level}</span>
                            </li>
                        ))}
                    </ul>
                </section>
            )}
        </div>
    )
}
