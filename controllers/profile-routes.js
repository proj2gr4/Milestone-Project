const router = require('express').Router();
const sequelize = require('../config/connection');
const {Categories, Comment, Goal, Member_Goal, Step, User} = require('../models');

router.get('/', (req, res) => {
    res.render('profile');
})

module.exports = router;