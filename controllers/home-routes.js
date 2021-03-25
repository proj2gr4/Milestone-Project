const router = require('express').Router();
const sequelize = require('../config/connection');
const {Categories, Comment, Goal, Member_Goal, Step, User} = require('../models');

router.get('/', (req, res) => {
    Categories.findAll()
    .then(dbCategoriesData => {
        let categories = dbCategoriesData.map(cat => cat.get({ plain: true }));
        // User.findAll({
        //     include: [
        //         {
        //             model: Goal,
        //             include:[
        //                 {model: Categories}
        //             ]
        //         },
        //         {
        //             model: Comment
        //         }
        //     ]
        // })
        Goal.findAll({
            include:[{model:User}],
            limit: 10, 
            order: [['updatedAt', 'DESC']]
        })
        .then(dbUserData => {
            const goals = dbUserData.map(data => data.get({ plain: true }));
            // update profile image if empty:
            const updatedGoals = goals.map(item => {
                item.user.profile_img = item.user.profile_img === null ? '/images/default-img.jpg' : item.user.profile_img;
                return item;
            });
            // console.log(updatedGoals, goals);
            res.render('homepage', { updatedGoals, categories, loggedIn: req.session.loggedIn });
        })
        
    })
    .catch(err =>{res.status(500).json(err)});
    
});

module.exports = router;
