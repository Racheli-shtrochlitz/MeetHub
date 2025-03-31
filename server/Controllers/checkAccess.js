
const checkRole=(req,res,next)=>{
    const {role}=req.user;
    if(role!='teacher'){
        return res.status(403).json({message:"Access denied"});
    }
    next();
}

module.exports = {
    checkRole
};