const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const loginRoutes = require('./login-routes');
const profileRoutes = require('./profile-routes');
const goalsRoutes = require('./goalpage-routes');
const dashboardRoutes = require('./dashboard-routes');
const categoriesRoutes = require('./categories-routes');


router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/login', loginRoutes);
router.use('/profile', profileRoutes);
router.use('/goals', goalsRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/categories', categoriesRoutes);

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;