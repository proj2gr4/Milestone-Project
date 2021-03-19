const sequelize = require('../../config/connection');
const router = require('express').Router();
const {Categories, Comment, Goal, Member_Goal, Step, User} = require('../../models');

// Get /api/member_goals:
router.get('/', (req, res) =>{
    Member_Goal.findAll()
    .then(dbGoalData => res.json(dbGoalData))
    .catch(err =>{res.status(500).json(err)});
});

// Get /api/member_goals/id:
router.get('/:id', (req, res) =>{
    Member_Goal.findOne({where:{id:req.params.id}})
    .then(dbGoalData => res.json(dbGoalData))
    .catch(err =>{res.status(500).json(err)});
});

// Post /api/member_goals/
router.post('/', (req, res) =>{
    Member_Goal.create({
        user_id: req.body.user_id,
        goal_id: req.body.goal_id,
        status: req.body.status
    })
    .then(dbGoalData => res.json(dbGoalData))
    .catch(err =>{res.status(500).json(err)});
});

// Delete /api/member_goals/:id
router.delete('/:id', (req, res) => {
    Member_Goal.destroy({
        where:{id: req.params.id}
    })
    .then(dbGoalData => res.json(dbGoalData))
    .catch(err => res.status(500).json(err));
});

// Put /api/member_goals/1
router.put('/:id', (req, res) => {
    Member_Goal.update(
        {
            user_id: req.body.user_id,
            goal_id: req.body.goal_id,
            status: req.body.status
        },
        {
            where:{
                id: req.params.id
            }
        }
    ).then(dbGoalData =>{
        if (!dbGoalData[0]) {
            res.status(404).json({ message: 'No Members goal found with this id' });
            return;
        }
        res.json(dbGoalData);

    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;