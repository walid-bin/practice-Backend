const { Router } = require('express');
const User = require('../db/Schemas/user');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');
const router = Router();

router.post('/user',async (req, res)=>{
try {
    const walletAddress = req.body.walletAddress;
    if(!walletAddress) return res.status(400).send('Bad request.');
    let user =await User.findOne({walletAddress});
    if(!user) user = new User({walletAddress, role:'user'});
    const token = await user.generateToken();
    res.status(200).send({user,token});
} catch (err) {
    console.log(err);
    res.status(500).send('Something went wrong.');
}
});

router.get('/user', auth , checkRole(['user', 'superAdmin', 'admin']), async(req, res)=>{
    try{
        let options = {
            page: req.query.page || 1,
            limit: req.query.limit || 10,
        };
        const users = await User.paginate({}, options);
        res.status(200).send(users);
    }catch(e){
        console.log(e);
        res.status(500).send('Something went wrong');
    }
})

router.get('/user/me', auth, async(req, res)=>{
    try {
        res.status(200).send(req.user);
    } catch (error) {
        console.log(error);
        req.status(500).send('Something went wrong')
    }
})

module.exports= router;