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
          model: Comment
        },
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
        res.render('dashboard', { goals, categories, loggedIn: req.session.loggedIn  });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  // get dashboard by categories
  router.get('/:id', (req, res) => {
    Goal.findAll({
      where:{
        category_id:req.params.id
      },
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
          model: Comment
        },
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
        // console.log(goals[0].category.category_name);
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
        // console.log(goals);
        let categoryPage = goals[0].category.category_name;
        // .category.cateogry_name; categoryPage[0].category.category_name
        console.log(categoryPage);
        res.render('dashboard', { goals, categories, loggedIn: req.session.loggedIn, categoryPage });
      })
      .catch(err => {
        console.log(err);
        
        res.status(500).json(err);
        
      });
  });

module.exports = router;