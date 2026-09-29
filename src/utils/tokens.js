const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            role: user.role,
            email: user.email
        },
        process.env.JWT_ACCESS_SECRET,
        {
            expiresIn: "1h"
        }
    );
};

module.exports = {
    generateAccessToken
};