const router = require('express').Router();
const sequelize = require('../config/connection');
const {Categories, Comment, Goal, Member_Goal, Step, User, User_Step} = require('../models');
const withAuth = require('../utils/auth');

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
            {model:User}, 
            {
                model: Member_Goal,
                include:[{ model: User}],
                limit: 5, 
                order: [['updated_at', 'DESC']]
            },
            {
                model: Comment,
                attributes: ['id', 'user_id', 'comment', 'created_at'],
                include: {model: User}
            },
            {model:User}
        ]
    }).then(dbGoalData=>{
        let goal = dbGoalData.get({ plain: true});
        let owner = (req.session.user_id === goal.user.id) ? true : false
        // if User is logged in:
        if(req.session.user_id){
            // Show logged in users infromation using session id:
            User.findOne({
                where:{
                    id:req.session.user_id
                },
                include:[{model:Member_Goal}]
            }).then(dbCurrentUserData =>{
                const currentUser = dbCurrentUserData.get({ plain: true});
                let member_goal = false;
                for(let i=0; i<currentUser.member_goals.length; i++){
                    if(currentUser.member_goals[i].goal_id === goal.id){
                        member_goal = currentUser.member_goals[i];
                    }
                }
                // goal.postOwner = owner;
                // console.log(goal);
                res.render('goalspage', {goal: goal, time: calculateTime(goal.due_date), loggedIn: req.session.loggedIn, postOwner: owner, currentUser:currentUser, member_goal:member_goal });
            })
        }else{
            // if user not logged in:
            res.render('goalspage', {goal: goal, time: calculateTime(goal.due_date), loggedIn: req.session.loggedIn, postOwner: owner });
        }
    }).catch(err =>{res.status(500).json(err)});

})

module.exports = router;