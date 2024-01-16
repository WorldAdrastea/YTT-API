import express from 'express';
import { get, merge } from 'lodash';

import { getUserBySessionToken } from '../YTT_db/users';


// Takes id and checks if current user id matches the id of owner of account
export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { id } = req.params;
        const currentUserId = get(req, 'identity._id') as string;

        if (!currentUserId || currentUserId.toString() !== id) {
            console.log('isOwner: Unauthorized - Current User ID:', currentUserId);
            return res.sendStatus(403);
        }

        console.log('isOwner: Authorized - Current User ID:', currentUserId);
        next();
    } catch (error) {
        console.log('isOwner: Error -', error);
        return res.sendStatus(500);
    }
}

// Checks if there is session token from login which then confirms user is authenticated
export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const sessionToken = req.cookies['YTT_AUTH'];

        if (!sessionToken) {
            console.log('isAuthenticated: No Session Token');
            return res.sendStatus(403);
        }

        const existingUser = await getUserBySessionToken(sessionToken);

        if (!existingUser) {
            console.log('isAuthenticated: Invalid Session Token');
            return res.sendStatus(403);
        }

        merge(req, { identity: existingUser});

        console.log('isAuthenticated: User Authenticated - User ID:', existingUser._id);
        return next();
    } catch (error) {
        console.log('isAuthenticated: Error -', error);
        return res.sendStatus(500);
    }
}