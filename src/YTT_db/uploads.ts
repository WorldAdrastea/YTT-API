import mongoose from 'mongoose';
import fs from 'fs/promises'

const UploadsSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: false,
        maxLength: 1000
    },
    file: {
        type: Buffer,
        required: true,
    },
    filePath: {
        type: String,
        required: true,
    },
    uploadedBy: {
        type: String,
        required: false,
    },
    coveredBy: { 
        type: String, 
        required: true,
    },
    originallyBy: { 
        type: String, 
        required: true
    },
    genre: {
        type: String,
        required: false,
    },
    releaseDate: {
        type: Date,
        required: false
    },
});

export const UploadsModel = mongoose.model('Upload', UploadsSchema);

// CRUD
export const getUploads = () => UploadsModel.find();
export const getUploadsByTitle = (title: string) => UploadsModel.findOne({ title });
export const getUploadsById = (id: string) => UploadsModel.findById(id);
export const createUploads = async (values: Record<string, any>, fileContent: Buffer) => {
    const filePath = `uploads/${Date.now()}.mp4`;

    await fs.writeFile(filePath, fileContent);

    values.file = fileContent;
    values.filePath = filePath;
    
    return new UploadsModel(values).save().then((upload) => upload.toObject());
}
export const deleteUploadsById = (id: string, currentUserId: string) => UploadsModel.findByIdAndDelete({ _id: id, uploadedBy: currentUserId });
export const updateUploadsById = (id: string, values: Record<string, any>) => UploadsModel.findByIdAndUpdate(id, values, {new: true });