const sequelize = require('../../config/connection');
const router = require('express').Router();
const {Categories, Comment, Goal, Member_Goal, Step, User} = require('../../models');

// Get /api/goals:
router.get('/', (req, res) =>{
    Goal.findAll()
    .then(dbGoalData => res.json(dbGoalData))
    .catch(err =>{res.status(500).json(err)});
});

// Get /api/goals/id:
router.get('/:id', (req, res) =>{
    Goal.findOne({
        where:{
            id:req.params.id
        },
        // Include member (users) participating in this goal:
        include:[
            {
                model: Member_Goal,
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
    .then(dbGoalData => res.json(dbGoalData))
    .catch(err =>{
        console.log(err);
        res.status(500).json(err)
    });
});

//Post /api/goals/
router.post('/', (req, res) =>{
    Goal.create({
        title: req.body.title,
        user_id: req.session.user_id,
        description: req.body.description,
        category_id: req.body.category,
        subcategory: req.body.subcategory,
        due_date: req.body.dueDate,
        status: req.body.status
    })
    .then(dbGoalData => res.json(dbGoalData))
    .catch(err =>{res.status(500).json(err)});
});

// Delete /api/goals/:id
router.delete('/:id', (req, res) => {
    Goal.destroy({
        where:{id: req.params.id}
    })
    .then(dbGoalData => res.json(dbGoalData))
    .catch(err => res.status(500).json(err));
});

// Put /api/goals/:id
router.put('/:id', (req, res) => {
    Goal.update(
        {
            title: req.body.title,
            user_id: req.body.user_id,
            description: req.body.description,
            category_id: req.body.category_id,
            subcategory: req.body.subcategory,
            due_date: req.body.due_date,
            status: req.body.status
        },
        {
            where:{
                id: req.params.id
            }
        }
    ).then(dbGoalData =>{
        if (!dbGoalData[0]) {
            res.status(404).json({ message: 'No goal found with this id' });
            return;
        }
        res.json(dbGoalData);

    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;