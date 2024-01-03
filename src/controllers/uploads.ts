import express from "express";

import { get } from 'lodash'
import { deleteUploadsById, getUploads, getUploadsById, updateUploadsById, UploadsModel } from "../YTT_db/uploads";

export const getAllUploads = async (req: express.Request, res: express.Response) => {
    try {
        const uploads = await getUploads();

        return res.status(200).json(uploads);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const createUpload = async (req: express.Request, res: express.Response) => {
    try {
        const { title, description, coveredBy, originallyBy } = req.body;
        const currentUserId = get(req, 'identity._id') as string;

        if (!title || !description || !coveredBy || !originallyBy) {
            return res.status(403).send('Missing title, description, covered by or orginally by.')
        }

        const newUpload = await UploadsModel.create({
            title,
            description,
            uploadedBy: currentUserId,
            coveredBy,
            originallyBy,
        });

        return res.status(201).json(newUpload);
    } catch (error) {
        console.error('Error creating upload: ', error);
        return res.status(500).send('Internal Server Error');
    }
}

export const deleteUpload = async (req: express.Request, res: express.Response) => {
    try {
        const uploadId = req.params.id;
        const currentUserId = get(req, 'identity._id') as string;

        const upload = await getUploadsById(uploadId);

        if (!upload) {
            return res.status(404).send("Upload not found");
        }

        if (upload.uploadedBy != currentUserId) {
            return res.status(403).send("This video is not yours.")
        }

        await deleteUploadsById(uploadId, currentUserId);

        return res.status(200).send("Successfully deleted.")
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}

export const updateUploads = async (req: express.Request, res: express.Response) => {
    try {
        const uploadId = req.params.id;
        const currentUserId = get(req, 'identity._id') as string;
        const { title, description, coveredBy, originallyBy } = req.body;

        const upload = await getUploadsById(uploadId);

        if (!upload) {
            return res.status(404).send("Upload not found");
        }

        if (upload.uploadedBy != currentUserId) {
            console.log('Current User ID:', currentUserId);
            console.log('Uploaded By:', upload.uploadedBy);
            return res.status(403).send("This is not your video to update.")
        }

        const updatedFields: Record<string, any> = {};
        if (title) updatedFields.title = title;
        if (description) updatedFields.description = description;
        if (coveredBy) updatedFields.coveredBy = coveredBy;
        if (originallyBy) updatedFields.originallyBy = originallyBy;

        await updateUploadsById(uploadId, updatedFields);

        return res.status(200).send("Updated successfully");
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}