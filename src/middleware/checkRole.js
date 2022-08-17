const checkRole=(roles)=>{
return (async (req, res, next)=>{
        try {
            if(roles.includes(req.user.role)) return next();
            else throw new Error('Unauthorized');
        } 
        catch (error) {
            console.log(error);
            res.status(401).send("Unauthorized");
        }
    })

} 

module.exports = checkRole;