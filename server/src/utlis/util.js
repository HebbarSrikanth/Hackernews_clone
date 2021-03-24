const jwt = require("jsonwebtoken");

const getTokenPayload = (token) => {
    return jwt.verify(token, process.env.APP_SECRET);
};

const getUserID = async (req, authToken) => {
    if (req) {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.replace("Bearer ", "");
            if (!token) {
                throw new Error("Token not found!!");
            }
            const userId = await getTokenPayload(token);
            return parseInt(userId);
        }
    } else if (authToken) {
        const userId = await getTokenPayload(authToken);
        return parseInt(userId);
    }
    throw new Error("Not authenticated");
};

module.exports = { getUserID };
