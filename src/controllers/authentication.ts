import express from "express";
import { createUser, getUserByEmail } from "../YTT_db/users";
import { authentication, random } from "../helpers/helpers";

export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send("Missing email or password!")
        }

        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');

        if (!user) {
            return res.status(400).send("No user found")
        }

        const expectedHash = authentication(user.authentication.salt, password);

        if (user.authentication.password !== expectedHash) {
            return res.status(403).send("Incorrect password")
        }

        const salt = random();
        user.authentication.sessionToken = authentication(salt, user._id.toString());

        await user.save();

        res.cookie('YTT_AUTH', user.authentication.sessionToken, { path: '/', secure: true, sameSite: 'none', httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7, });
        
        return res.status(200).json(user).end();
    } catch (error) {
        console.log(error);
        return res.status(400).send(error);
    }
}

export const register = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password, username } = req.body;

        if (!email || !password || !username) {
            return res.status(400).send("Missing either an email, password or username!");
        }

        const existingUser = await getUserByEmail(email);

        if (existingUser) {
            return res.status(400).send("Account already exists");
        }

        const salt = random();
        const user = await createUser({
            email,
            username,
            authentication: {
                salt,
                password: authentication(salt, password),
            },
        });

        return res.status(200).send("Successfully registered!").json(user).end();
    } catch (error) {
        console.log(error);
        return res.status(400).send(error);
    }
}