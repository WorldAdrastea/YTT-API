import express from 'express';

import authentication from './authentication';
import users from './users';
import uploads from './uploads';

const router = express.Router();

export default (): express.Router => {
    authentication(router);
    users(router);
    uploads(router);

    return router;
};