'use client'

import {HiOutlineMail} from "react-icons/hi"
import {BiPhoneCall} from "react-icons/bi"
import {FaMapMarkerAlt, FaLanguage} from "react-icons/fa"
import {MdWork, MdSchool} from "react-icons/md"
import {RiProfileFill} from "react-icons/ri"

export default function ModernTemplate({formData}) {
    return (
        <div
            className=" mx-auto overflow-hidden grid grid-cols-3">
            {/* Left Sidebar */}
            <div className="bg-gray-100 p-6 col-span-1 flex flex-col gap-6">
                {/* Profile & Photo */}
                <div>
                    <div className="flex flex-col">
                        {formData.photo && (
                            <div
                                className="w-24 h-24 rounded-full overflow-hidden mb-3 border-2 border-gray-300 bg-white">
                                <img
                                    src={formData.photo}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}
                        <h2 className="text-lg font-bold text-gray-800">{formData.firstName} {formData.lastName}</h2>
                        <p className="text-primary text-sm">{formData.jobTitle}</p>
                    </div>
                </div>

                {/* Contact Info */}
                <div className="text-sm text-gray-700 space-y-2">
                    {formData.email && (
                        <p className="flex items-center gap-2"><HiOutlineMail/> {formData.email}</p>
                    )}
                    {formData.phone && (
                        <p className="flex items-center gap-2"><BiPhoneCall/> {formData.phone}</p>
                    )}
                    {(formData.address || formData.city) && (
                        <p className="flex items-center gap-2">
                            <FaMapMarkerAlt/> {[formData.address, formData.city].filter(Boolean).join(', ')}
                        </p>
                    )}
                </div>

                {/* Skills */}
                {formData.skills?.length > 0 && (
                    <div>
                        <h3 className="text-base font-semibold mb-2 border-b border-gray-300 pb-1 flex items-center gap-2">
                            <RiProfileFill size={18}/> Skills
                        </h3>
                        <ul className="text-sm space-y-1">
                            {formData.skills.map((skill, i) => (
                                <li key={i} className="flex justify-between">
                                    <span>{skill.name}</span>
                                    {skill.level && <span className="text-gray-500 text-xs">{skill.level}</span>}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Languages */}
                {formData.languages?.length > 0 && (
                    <div>
                        <h3 className="text-base font-semibold mb-2 border-b border-gray-300 pb-1 flex items-center gap-2">
                            <FaLanguage size={18}/> Languages
                        </h3>
                        <ul className="text-sm space-y-1">
                            {formData.languages.map((lang, i) => (
                                <li key={i} className="flex justify-between">
                                    <span>{lang.language}</span>
                                    {lang.level && <span className="text-gray-500 text-xs">{lang.level}</span>}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* Right Content */}
            <div className="col-span-2 bg-white p-8 space-y-6">
                {/* Summary */}
                {formData.summary && (
                    <div>
                        <h3 className="text-lg font-semibold mb-2 text-gray-800">About Me</h3>
                        <p className="text-gray-700 text-sm leading-relaxed">{formData.summary}</p>
                    </div>
                )}

                {/* Education */}
                {formData.education?.length > 0 && (
                    <div>
                        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2 text-gray-800">
                            <MdSchool size={20}/> Education
                        </h3>
                        <div className="space-y-3">
                            {formData.education.map((edu, i) => (
                                <div key={i}>
                                    <p className="font-medium">{edu.degree} in {edu.field}</p>
                                    <p className="text-sm text-gray-600">{edu.school} {edu.city && `– ${edu.city}`}</p>
                                    <p className="text-xs text-gray-500">{edu.startDate} - {edu.endDate}</p>
                                    {edu.description && (
                                        <p className="text-sm text-gray-700 mt-1">{edu.description}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Experience */}
                {formData.experiences?.length > 0 && (
                    <div>
                        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2 text-gray-800">
                            <MdWork size={20}/> Experience
                        </h3>
                        <div className="space-y-3">
                            {formData.experiences.map((exp, i) => (
                                <div key={i}>
                                    <p className="font-medium">{exp.jobTitle}</p>
                                    <p className="text-sm text-gray-600">{exp.employer} {exp.city && `– ${exp.city}`}</p>
                                    <p className="text-xs text-gray-500">{exp.startDate} - {exp.endDate}</p>
                                    {exp.description && (
                                        <p className="text-sm text-gray-700 mt-1">{exp.description}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
