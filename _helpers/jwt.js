const expressJwt = require('express-jwt');
// const userService = require('../users/user.service');

module.exports = jwt;

function jwt() {
    // const secret = process.env.SECRECT;
    const secret = 'fsgfhldjasduaiytfghjsadklcdacgdhusjakl'
    return expressJwt({ secret, algorithms: ['HS256'], isRevoked }).unless({
        path: [
            '/users/authenticate',
            '/users/register',
            '/users/sendForgetPwOtp',
            '/users/resetPw',
            '/users/verifyWithOtp'
        ]
    });
}

async function isRevoked(req, payload, done) {
    // const user = await userService.getById(payload.sub);

    // if (!user) {
    //     return done(null, true);
    // }

    done();
};