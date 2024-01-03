import express from 'express';

import { getAllUploads, deleteUpload, updateUploads, createUpload } from '../controllers/uploads';
import { isAuthenticated } from '../middlewares/middlewares';

export default (router: express.Router) => {
    router.get('/uploads', isAuthenticated, getAllUploads);
    router.post('/uploads', isAuthenticated, createUpload);
    router.delete('/uploads/:id', isAuthenticated, deleteUpload);
    router.patch('/uploads/:id', isAuthenticated, updateUploads);
}