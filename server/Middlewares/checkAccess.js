const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
    const token = req.header('Authorization');
    console.log(token);
    if (!token) {
        return res.status(401).send("Access denied. No token provided.");
    }
    const tokenWithoutBearer = token.startsWith('Bearer ') ? token.slice(7) : token;
    try {
        const decoded = jwt.verify(tokenWithoutBearer, process.env.SECRET_TOKEN);//checking if the token is valid and validity
        if (!decoded) {
            return res.status(401).send("Invalid token.");
        }
        req.user = decoded;//save the data of the user in the request object
        console.log("User authenticated:", req.user);
        next();//continue to the next middleware or crud function
    }
    catch (err) {
        return res.status(500).json({ error: err.message, message: "Invalid token." });
    }
}

// Middleware to check if the user has the required role
const checkRole = (requiredRole) => {
    return (req, res, next) => {
        const { activeRole } = req.user;

        if (activeRole !== requiredRole) {
            return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
        }

        next();
    };
};

// const checkOwnership = (req, res, next) => {
//     console.log("in checkOwnership")
//     // Middleware to check if the user is the owner of the resource
//     return (req, res, next) => {
//         const userIdFromToken = req.user.id; // ה-ID של המשתמש מהטוקן
//         const userIdFromRequest = req.params.id || req.body.userId; // ה-ID שנשלח בבקשה (לדוגמה, בפרמטרים או בגוף הבקשה)

//         if (!userIdFromRequest || userIdFromToken !== userIdFromRequest) {
//             return res.status(403).json({ message: 'Access denied. You can only modify your own data.' });
//         }

//         next();
//     };
// };


const checkOwnership = (req, res, next) => {
    console.log("in checkOwnership")

    const userIdFromToken = req.user.id;
    const userIdFromRequest = req.params.id || req.body.userId;

    if (!userIdFromRequest || userIdFromToken !== userIdFromRequest) {
        return res.status(403).json({ message: 'Access denied. You can only modify your own data.' });
    }
    console.log(token);
    if (!token) {
        return res.status(401).send("Access denied. No token provided.");
    }
    next();
}

module.exports = { authenticateUser, checkRole, checkOwnership };