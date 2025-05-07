const jwt = require('jsonwebtoken');

const authenticateUser=(req,res,next)=>{
    const token=req.header('Authorization');
    if(!token){
        return res.status(401).send("Access denied. No token provided.");
    }
    const tokenWithoutBearer = token.startsWith('Bearer ') ? token.slice(7) : token;
    try{
        const decoded=jwt.verify(tokenWithoutBearer,process.env.SECRET_TOKEN);//checking if the token is valid and validity
        if(!decoded){
            return res.status(401).send("Invalid token.");
        }
        req.user=decoded;//save the data of the user in the request object

        next();//continue to the next middleware or crud function
    }
    catch(err){
        return res.status(500).json({error:err.message,message:"Invalid token."});
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

const checkOwnership = () => {
    return (req, res, next) => {
        const userIdFromToken = req.user.id; // ה-ID של המשתמש מהטוקן
        const userIdFromRequest = req.params.id || req.body.userId; // ה-ID שנשלח בבקשה (לדוגמה, בפרמטרים או בגוף הבקשה)

        if (!userIdFromRequest || userIdFromToken !== userIdFromRequest) {
            return res.status(403).json({ message: 'Access denied. You can only modify your own data.' });
        }

        next(); 
    };
};


module.exports = { authenticateUser, checkRole, checkOwnership };