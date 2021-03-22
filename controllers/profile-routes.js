const router = require('express').Router();
const sequelize = require('../config/connection');
const {Categories, Comment, Goal, Member_Goal, Step, User} = require('../models');

router.get('/:id', (req, res) => {
    User.findOne({
        attributes: {exclude: ['password']},
        where:{
            id: req.params.id
        },
        include:[
            {
                model:Goal,
                include:[
                    {
                        model:Member_Goal,
                        include:[{model:User}]
                    },
                    {
                        model:Categories
                    }
                ]
            }
        ]
    }).then(dbProfileData=>{
        const profile = dbProfileData.get({ plain: true});
        // console.log(profile.goals[0].category.category_name);
        // if(profile.goal)
        res.render('profile', {profile: profile});
    }).catch(err =>{res.status(500).json(err)});
});

router.get('/', (req, res) => {
    User.findOne({
        attributes: {exclude: ['password']},
        where:{
            id: req.session.user_id
        },
        include:[
            {
                model:Goal,
                include:[
                    {
                        model:Member_Goal,
                        include:[{model:User}]
                    },
                    {
                        model:Categories
                    }
                ]
            }
        ]
    }).then(dbProfileData=>{
        const profile = dbProfileData.get({ plain: true});
        // console.log(profile.goals[0].category.category_name);
        // if(profile.goal)
        res.render('profile', {profile: profile});
    }).catch(err =>{res.status(500).json(err)});

})
module.exports = router;