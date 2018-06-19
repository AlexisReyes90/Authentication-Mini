const jwt = require('jsonwebtoken');
const SECRET = 'Secret Secret I like keeping Secrets';

const createToken = (user) => {
    const payload = {
        sub: user._id,
        name: user.username,
    }

    const options = {
        expiresIn: '24h'
    }

    return jwt.sign(payload, SECRET, options)
}


// middleware, needs a next()

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    if(token === undefined) {
        res.status(401);
        return;
    }
    jwt.verify(token, SECRET, (err, payload) => {
        if(err) {
            res.status(401);
            return;
        }
        req.jwtpayload = payload;
        next();
    })
}

module.exports = {
    createToken,
    verifyToken
}