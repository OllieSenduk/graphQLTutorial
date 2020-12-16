const jwt = require('jsonwebtoken')

function getTokenPayload(token) {
    return jwt.verify(token, APP_SECRET)
}

function getUserId(req) {
    if (req) {
        const authHeader = req.headers.authorization
        if (authHeader) {
            const token = authHeader.resplace('Bearer', '')
            if (!token) {
                throw new Error('No token was found')
            }

            const { userId } = getTokenPayload(token)
            return userId 
        } 
    }
}