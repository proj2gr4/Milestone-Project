const router = require('express').Router();
const sequelize = require('../config/connection');
const {Categories, Comment, Goal, Member_Goal, Step, User} = require('../models');

let goals;


router.get('/', (req, res) => {
    Goal.findAll({
      attributes: [
        'id',
        'title',
        'description',
        'subcategory',
        'due_date',
        'created_at',
      ],
      include: [
        {
          model: User,
          attributes: ['username', 'profile_img'],
        },
        {
            model: Categories,
            attributes: ['category_name'],
        },
      ]
    })
      .then(dbGoalData => {
        // serialize data before passing to template
        goals = dbGoalData.map(goal => goal.get({ plain: true }));
       // res.render('dashboard', { goals });
      })

      Categories.findAll({
        attributes: [
          'id',  
          'category_name'
        ]
      })
      .then(dbCatData => {
        // serialize data before passing to template
        const categories = dbCatData.map(category => category.get({ plain: true }));
        res.render('dashboard', { goals, categories  });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });



module.exports = router;