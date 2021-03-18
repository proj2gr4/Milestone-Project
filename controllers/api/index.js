const router = require('express').Router();
const User = require('../../models');

const userRoutes = require('./user-routes.js');

router.use('/users', userRoutes);

module.exports = router;