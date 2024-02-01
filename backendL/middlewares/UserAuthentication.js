const jwt = require('jsonwebtoken');

const config = process.env;

verifyToken = async (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["Authorization"] || req.get('Authorization');

    if(!token) {
        return res.status(403).json({success: "false", message: "A token is required for Authenticating Access"});
    }

    try {
        const decoded = await jwt.verify(token, config.USER_TOKEN_KEY);
        req.user = decoded;
    } catch (error) {
        return res.status(401).json({success: "false", message: "Invalid Token!"});
    }

    return next();
};

module.exports = verifyToken;