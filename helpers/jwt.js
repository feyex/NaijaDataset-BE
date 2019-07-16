//checks if JWT token received in the http request from the client is valid before allowing access to the api.

const expressJwt = require('express-jwt');
const config = require('../config/config.json');
const userService = require('../controllers/user');

module.exports = jwt;

function jwt() {
    const secret = config.secret;
    return expressJwt({ secret, isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/api/users/5cd580a30e5f2f35f802f80b',
            '/api/users',
            '/api/login',
        ]
    });
}

async function isRevoked(req, payload, done) {
    const user = await userService.getById(payload.sub);

    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }

    done();
};