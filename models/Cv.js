import mongoose from "mongoose";

const educationSchema = new mongoose.Schema({
    school: String,
    degree: String,
    field: String,
    city: String,
    startDate: String,
    endDate: String,
    description: String,
})

const skillSchema = new mongoose.Schema({
    name: String,
    level: String,
})

const experienceSchema = new mongoose.Schema({
    jobTitle: String,
    employer: String,
    startDate: String,
    endDate: String,
    city: String,
    description: String,
})

const languageSchema = new mongoose.Schema({
    language: String,
    level: String,
})

const cvSchema = new mongoose.Schema({
    owner: { type: String, required: false },
    jobTitle: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    summary: String,
    photo: String,
    education: [educationSchema],
    skills: [skillSchema],
    experiences: [experienceSchema],
    languages: [languageSchema],
    template: { type: String, default: 'ModernTemplate' },
    status: { type: String, enum: ['draft','published'], default: 'draft' },
}, { timestamps: true, versionKey: '__v' })

export default mongoose.models.Cv || mongoose.model("Cv", cvSchema);