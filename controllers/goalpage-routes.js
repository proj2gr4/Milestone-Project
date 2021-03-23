const router = require('express').Router();
const sequelize = require('../config/connection');
const {Categories, Comment, Goal, Member_Goal, Step, User, User_Step} = require('../models');

function calculateTime(exam_end_at) {
    const exam_ending_at    = new Date(exam_end_at);
    const current_time      = new Date();

    const totalSeconds     = Math.floor((exam_ending_at - (current_time))/1000);;
    const totalMinutes     = Math.floor(totalSeconds/60);
    const totalHours       = Math.floor(totalMinutes/60);
    const totalDays        = Math.floor(totalHours/24);
    const hours   = totalHours - ( totalDays * 24 );
    const minutes = totalMinutes - ( totalDays * 24 * 60 ) - ( hours * 60 );
    const seconds = totalSeconds - ( totalDays * 24 * 60 * 60 ) - ( hours * 60 * 60 ) - ( minutes * 60 );
    return {totalDays, hours, minutes, seconds}
}
               
router.get('/:id', (req, res) => {
    Goal.findOne({
        where:{
            id:req.params.id
        },
        include:[
            {
                model:Step,
                include:[
                    {
                        model: User_Step,
                        include:[{model: User}]
                    }
                ]
            },
<<<<<<< HEAD
            {model:User}, {model:Member_Goal}
=======
            {
                model: Comment,
                attributes: ['id', 'user_id', 'comment', 'created_at'],
                include: {
                  model: User,
                  attributes: ['username']
                }
            },
            {model:User}
>>>>>>> 1450c7ccc7fbc25ad7d18385ab35652740802a8f
        ]
    }).then(dbGoalData=>{
        const goal = dbGoalData.get({ plain: true});
        let owner = (req.session.user_id === goal.user.id) ? true : false
        console.log(goal);
        res.render('goalspage', {goal: goal, time: calculateTime(goal.due_date), loggedIn: req.session.loggedIn, postOwner: owner });
    }).catch(err =>{res.status(500).json(err)});

})

module.exports = router;