const sequelize = require('../../config/connection');
const router = require('express').Router();
const {Categories, Comment, Goal, Member_Goal, Step, User_Step, User} = require('../../models');

// Get /api/user_steps:
router.get('/', (req, res) =>{
    User_Step.findAll()
    .then(dbStepData => res.json(dbStepData))
    .catch(err =>{res.status(500).json(err)});
});

// Get /api/user_steps/:id:
router.get('/:id', (req, res) =>{
    User_Step.findOne({
        where:{id:req.params.id},
        include:[
            {model:User},
            {model:Step, include: {model:Goal}}
        ]
    })
    .then(dbStepData => res.json(dbStepData))
    .catch(err =>{res.status(500).json(err)});
});

//Post /api/user_steps
router.post('/', (req, res) =>{
    let filePath = req.file ? req.file.path : null
    User_Step.create({
        step_id: req.body.step_id,
        user_id: req.body.user_id,
        status: req.body.status,
        img_url: filePath
    })
    .then(dbStepData => res.json(dbStepData))
    .catch(err =>{res.status(500).json(err)});
});

// Delete /api/user_steps/:id
router.delete('/:id', (req, res) => {
    User_Step.destroy({
        where:{id: req.params.id}
    })
    .then(dbStepData => res.json(dbStepData))
    .catch(err => res.status(500).json(err));
});

// Put /api/user_steps/:id
router.put('/:id', (req, res) => {
    let filePath = req.file ? req.file.path : null
    User_Step.update(
        {
            step_id: req.body.step_id,
            user_id: req.body.user_id,
            status: req.body.status,
            img_url: filePath
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