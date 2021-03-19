const router = require('express').Router();
const User = require('../../models');

const userRoutes = require('./user-routes.js');
const categoriesRoutes = require('./categories-routes');
const goalRoutes = require('./goal-routes');
const membergoalRoutes = require('./member_goal-routes');
const stepRoutes = require('./step-routes');
const userstepRoutes = require('./user_step-routes');
const commentRoutes = require('./comment-routes');


router.use('/users', userRoutes);
router.use('/categories', categoriesRoutes);
router.use('/goals', goalRoutes);
router.use('/member_goals', membergoalRoutes);
router.use('/steps', stepRoutes);
router.use('/user_steps', userstepRoutes);
router.use('/comments', commentRoutes);

module.exports = router;