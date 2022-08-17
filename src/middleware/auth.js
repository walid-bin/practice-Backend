const jwt = require('jsonwebtoken');
const User = require('../db/Schemas/user');
const auth = async (req, res, next)=>{
try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token,process.env.SECRET);
    // console.log(token);
    const user = await User.findOne({_id: decoded._id, "tokens.token":token});
    if(!user) throw new Error();
    req.token = token;
    req.user = user;
    next();
} catch (err) {
    console.log(err);
    res.status(401).send('Please authenticate first.');
}
}

module.exports = auth;