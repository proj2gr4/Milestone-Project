const router = require('express').Router();
const {Categories, Comment, Goal, Member_Goal, Step, User} = require('../../models');

// GET /api/categories
router.get('/', (req, res) =>{
    Categories.findAll()
    .then(dbCategoriesData => res.json(dbCategoriesData))
    .catch(err =>{res.status(500).json(err)});
});

// GET /api/categories/:id
router.get('/:id', (req, res) =>{
    Categories.findOne({
        where:{
            id: req.params.id
        },
        // Include all goals that belong to this category:
        include:[
            {
                model: Goal
            }
        ]
    })
    .then(dbCategoriesData => res.json(dbCategoriesData))
    .catch(err =>{res.status(500).json(err)});
});

// POST /api/categories
router.post('/', (req, res) =>{
    Categories.create({
        category_name: req.body.category_name
    })
    .then(dbCategoriesData => res.json(dbCategoriesData))
    .catch(err =>{res.status(500).json(err)});
});

// Delete /api/categories/:id
router.delete('/:id', (req, res) => {
    Categories.destroy({
        where:{id: req.params.id}
    })
    .then(dbCategoriesData => res.json(dbCategoriesData))
    .catch(err => res.status(500).json(err));
})

module.exports = router;