const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ message: "No token provided" });
    }

    const secret = "secreteNumber"; // Use an environment variable for the secret in production
    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(500).json({ message: "Failed to authenticate token" });
        }

        // Save the decoded user ID in the request for use in other routes
        req.userId = decoded.id;
        next();
    });
};

module.exports = verifyToken;
