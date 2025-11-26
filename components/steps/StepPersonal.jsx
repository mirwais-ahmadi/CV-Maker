'use client'

import { useState } from 'react'



export default function StepPersonal({ formData, setFormData }) {
    const [uploading, setUploading] = useState(false)

    const handlePhotoUpload = async (file) => {
        setUploading(true);
        try {

            const uploadFormData = new FormData();
            uploadFormData.append('photo', file);

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: uploadFormData,
            });


            if (!response.ok) {
                throw new Error('Upload failed');
            }

            const result = await response.json();

            // ذخیره آدرس عکس در formData
            setFormData(prevData => {
                const newData = { ...prevData, photo: result.fileUrl };
                return newData;
            });

        } catch (error) {
            console.error('Error uploading photo:', error);
            alert('Error uploading photo');
        } finally {
            setUploading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;


        if (name === 'photo' && files && files[0]) {
            const file = files[0];
            handlePhotoUpload(file);
        } else {
            setFormData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    }

    return (
        <div className="">
            <div className="grid gap-7 p-7 shadow-xs rounded-xl">
                <div className="flex gap-5">
                    <label className="form-label">
                        <span className="text-sm mx-2">Job Title</span>
                        <input
                            type="text"
                            name="jobTitle"
                            placeholder="The role you want"
                            className="text-input"
                            onChange={handleChange}
                            value={formData.jobTitle || ''}
                        />
                    </label>

                    <label className="form-label">
                        <span className="text-sm mx-2">
                            Photo {uploading && '(Uploading...)'}
                        </span>
                        <input
                            type="file"
                            name="photo"
                            accept="image/*"
                            className="text-input"
                            onChange={handleChange}
                            disabled={uploading}
                        />
                    </label>
                </div>

                {/* بقیه فیلدها */}
                <div className="flex gap-5">
                    <label className="form-label">
                        <span className="text-sm mx-2">First Name</span>
                        <input
                            type="text"
                            name="firstName"
                            className="text-input"
                            onChange={handleChange}
                            value={formData.firstName || ''}
                        />
                    </label>

                    <label className="form-label">
                        <span className="text-sm mx-2">Last Name</span>
                        <input
                            type="text"
                            name="lastName"
                            className="text-input"
                            onChange={handleChange}
                            value={formData.lastName || ''}
                        />
                    </label>
                </div>

                <div className="flex gap-5">
                    <label className="form-label">
                        <span className="text-sm mx-2">Email</span>
                        <input
                            type="email"
                            name="email"
                            className="text-input"
                            onChange={handleChange}
                            value={formData.email || ''}
                        />
                    </label>

                    <label className="form-label">
                        <span className="text-sm mx-2">Phone Number</span>
                        <input
                            type="text"
                            name="phone"
                            className="text-input"
                            onChange={handleChange}
                            value={formData.phone || ''}
                        />
                    </label>
                </div>

                <label className="form-label">
                    <span className="text-sm mx-2">Address</span>
                    <input
                        type="text"
                        name="address"
                        className="text-input"
                        onChange={handleChange}
                        value={formData.address || ''}
                    />
                </label>

                <label className="form-label">
                    <span className="text-sm mx-2">About Me</span>
                    <textarea
                        name="summary"
                        value={formData.summary || ''}
                        onChange={handleChange}
                        className="text-input min-h-[100px]"
                    />
                </label>
            </div>
        </div>
    )
}