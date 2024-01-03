import crypto from 'crypto';

// Generates random string of 128 random bytes and converts to a base64 encoded string
export const random = () => crypto.randomBytes(128).toString('base64');
// Performs HMAC based authentication, uses SHA-256 hashing algorithm and key derived from salt and password. Then updates HMAC with env variable and produces and returns final digest of HMAC in hex format.
export const authentication = (salt: string, password: string) => {
    return crypto.createHmac('sha256', [salt, password].join('/')).update(process.env.SECRET).digest('hex')
};