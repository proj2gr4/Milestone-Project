const router = require('express').Router();
const sequelize = require('../config/connection');
const {Categories, Comment, Goal, Member_Goal, Step, User} = require('../models');

router.get('/', (req, res) => {
    Categories.findAll()
    .then(dbCategoriesData => {
        let categories = dbCategoriesData.map(cat => cat.get({ plain: true }));
            
        User.findAll({
            include: [
                {
                    model: Goal,
                    include:[
                        {model: Categories}
                    ]
                },
                {
                    model: Comment
                }
            ]
        })
        .then(dbUserData => {
            const users = dbUserData.map(data => data.get({ plain: true }));
            // console.log(users);
            res.render('homepage', { users: users, categories: categories });
        })
        
    })
    .catch(err =>{res.status(500).json(err)});
    
});

module.exports = router;
