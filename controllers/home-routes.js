const router = require('express').Router();
const sequelize = require('../config/connection');
const {Categories, Comment, Goal, Member_Goal, Step, User} = require('../models');

router.get('/', (req, res) => {
    Categories.findAll()
    .then(dbCategoriesData => {
        let categories = dbCategoriesData.map(cat => cat.get({ plain: true }));
            
        User.findAll({
            // limit : 15,
            // order: [
            //     // Will escape full_name and validate DESC against a list of valid direction parameters
            //     ['id', 'DESC']
            // ],
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
