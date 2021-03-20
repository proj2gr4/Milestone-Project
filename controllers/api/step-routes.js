const sequelize = require('../../config/connection');
const router = require('express').Router();
const {Categories, Comment, Goal, Member_Goal, Step, User_Step, User} = require('../../models');

// Get /api/steps:
router.get('/', (req, res) =>{
    Step.findAll()
    .then(dbStepData => res.json(dbStepData))
    .catch(err =>{res.status(500).json(err)});
});

// Get /api/steps/id:
router.get('/:id', (req, res) =>{
    Step.findOne({
        where:{
            id:req.params.id
        },
        include:[
            {
                model: Goal,
                include: {model: User}
            }
        ]
    })
    .then(dbStepData => res.json(dbStepData))
    .catch(err =>{
        console.log(err);
        res.status(500).json(err)
    });
});

//Post /api/steps:
router.post('/', (req, res) =>{
    Step.create({
        title: req.body.title,
        goal_id: req.body.goal_id,
        description: req.body.description,
        start_date: req.body.start_date,
        due_date: req.body.due_date
    })
    .then(dbStepData => res.json(dbStepData))
    .catch(err =>{res.status(500).json(err)});
});

// Delete /api/steps/:id
router.delete('/:id', (req, res) => {
    Step.destroy({
        where:{id: req.params.id}
    })
    .then(dbStepData => res.json(dbStepData))
    .catch(err => res.status(500).json(err));
});

// Put /api/steps/:id
router.put('/:id', (req, res) => {
    Step.update(
        {
            title: req.body.title,
            goal_id: req.body.goal_id,
            description: req.body.description,
            start_date: req.body.start_date,
            due_date: req.body.due_date
        },
        {
            where:{
                id: req.params.id
            }
        }
    ).then(dbStepData =>{
        if (!dbStepData[0]) {
            res.status(404).json({ message: 'No steps found with this id' });
            return;
        }
        res.json(dbStepData);

    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;