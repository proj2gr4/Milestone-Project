const router = require('express').Router();
const User = require('../../models');

const userRoutes = require('./user-routes.js');
const categoriesRoutes = require('./categories-routes');
const goalRoutes = require('./goal-routes');
const membergoalRoutes = require('./member_goal-routes');


router.use('/users', userRoutes);
router.use('/categories', categoriesRoutes);
router.use('/goals', goalRoutes);
router.use('/member_goals', membergoalRoutes);

module.exports = router;