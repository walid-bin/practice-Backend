const { Router } = require('express');
const { findOne } = require('../db/Schemas/user');
const User = require('../db/Schemas/user');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');
const router = Router();

router.post('/user', async (req, res) => {
    try {
        const walletAddress = req.body.walletAddress;
        if (!walletAddress) return res.status(400).send('Bad request.');
        let user = await User.findOne({ walletAddress });
        if (!user) user = new User({ walletAddress, role: 'user' });
        const token = await user.generateToken();
        res.status(200).send({ user, token });
    } catch (err) {
        console.log(err);
        res.status(500).send('Something went wrong.');
    }
});

router.get('/user', auth, checkRole(['user', 'superAdmin', 'admin']), async (req, res) => {
    try {
        let options = {
            page: req.query.page || 1,
            limit: req.query.limit || 10,
        };
        const users = await User.paginate({}, options);
        res.status(200).send(users);
    } catch (e) {
        console.log(e);
        res.status(500).send('Something went wrong');
    }
})

router.get('/user/me', auth, async (req, res) => {
    try {
        res.status(200).send(req.user);
    } catch (error) {
        console.log(error);
        req.status(500).send('Something went wrong')
    }
})

router.get('/user/:walletAddr', auth, checkRole(['admin', 'superAdmin']), async (req, res) => {
    try {
        const walletAddr = req.params.walletAddr;
        if (!walletAddr) res.status(400).send('please provide an wallet address.');
        const user = await User.findOne({ walletAddress: walletAddr });
        if (!user) res.status(404).send('user not found.');
        res.status(200).send(user);
    } catch (error) {
        console.log(error);
        res.status(500).send('Something went wrong');
    }
})

router.get('/user/:id', auth, checkRole(['admin', 'superAdmin', 'user']), async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) res.status(400).send('please provide an user id.');
        const user = await findOne({ _id: id });
        if (!user) res.status(404).send('No user found for this id.');
        res.status(200).send(user);
    } catch (error) {
        console.log(error);
        res.status(500).send("Something went to wrong.");
    }
})

router.delete('/user/:id', auth, checkRole(['admin', 'superAdmin']), async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) res.status(400).send('Please provide an id please.');
        const user = await User.findOne({ _id: id });
        if (!user) res.status(404).send('NO user found for this id.');
        const result = await user.remove();
        // console.log(result);
        if (!result) res.status(500).send('Something went wrong');
        res.status(200).send(result);

    } catch (error) {
        console.log(error);
        res.status(500).send('Something went wrong.')
    }
})



module.exports = router;