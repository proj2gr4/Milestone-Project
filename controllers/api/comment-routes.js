const sequelize = require('../../config/connection');
const router = require('express').Router();
const {Categories, Comment, Goal, Member_Goal, Step, User_Step, User} = require('../../models');

// Get /api/comments:
router.get('/', (req, res) =>{
    Comment.findAll()
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err =>{res.status(500).json(err)});
});

// Get /api/comments/:id:
router.get('/:id', (req, res) =>{
    Comment.findOne({
        where:{id:req.params.id},
        include:[
            {model:User},
        ]
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err =>{res.status(500).json(err)});
});

//Post /api/comments
router.post('/', (req, res) =>{
    if (req.session) {
        Comment.create({
            user_id: req.session.user_id,
            goal_id: req.body.goal_id,
            comment: req.body.comment
        })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err =>{res.status(500).json(err)});
    }
});

// Delete /api/comments/:id
router.delete('/:id', (req, res) => {
    Comment.destroy({
        where:{id: req.params.id}
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => res.status(500).json(err));
});

// Put /api/comments/:id
router.put('/:id', (req, res) => {
    let filePath = req.file ? req.file.path : null
    Comment.update(
        {
            user_id: req.body.user_id,
            goal_id: req.body.goal_id,
            comment: req.body.comment
        },
        {
            where:{
                id: req.params.id
            }
        }
    ).then(dbCommentData =>{
        if (!dbCommentData[0]) {
            res.status(404).json({ message: 'No Comments found with this id' });
            return;
        }
        res.json(dbCommentData);

    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;