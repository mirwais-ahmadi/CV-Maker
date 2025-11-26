import mongoose from "mongoose";

const templateSchema = new mongoose.Schema({
    slug: {type: String},
    name: {type: String},
    previewImage: {type: String},
});

const Template = mongoose.models.Template || mongoose.model("Template", templateSchema);
export default Template;