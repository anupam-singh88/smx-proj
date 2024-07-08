const UnauthenticatedError = require("../errors/unauthenticated");
const UnauthorizedError = require("../errors/unauthorized");

const authenticate = (req, res, next) => {
    const auth = req.headers.authorization;

    if (!auth || !auth.startsWith('Basic ')) {
        throw new UnauthenticatedError('Please send auth credential as basic auth, /api/credentials');
    }

    const base64Credentials = auth.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');

    if (
        username === process.env.TEST_USERNAME &&
        password === process.env.TEST_PASSWORD
    ) {
        next();
    } else {
        throw new UnauthorizedError('Invalid Credentials not authorized!!!')
    }
};

module.exports = { authenticate };
