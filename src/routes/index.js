const userRoutes = require('./userRouts');
const { Router } = require('express')
const router = Router();
const v1 = [
    userRoutes,
]
router.use('/v1', v1);

module.exports = router;