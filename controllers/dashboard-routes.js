const router = require('express').Router();
const sequelize = require('../config/connection');
const {Categories, Comment, Goal, Member_Goal, Step, User} = require('../models');
// let goals;
router.get('/', (req, res) => {
    Goal.findAll({
      include: [
        {model: Member_Goal},
        {model: Categories},
      ]
    }).then(dbGoalData => {
        // serialize data before passing to template
        goals = dbGoalData.map(goal => goal.get({ plain: true }));
        // console.log(goals);

      Categories.findAll()
      .then(dbCatData => {
        // serialize data before passing to template
        const categories = dbCatData.map(category => category.get({ plain: true }));
        // console.log(categories);
        res.render('dashboard', { goals, categories, loggedIn: req.session.loggedIn  });
      })
    }).catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get dashboard by categories
router.get('/:id', (req, res) => {
  Goal.findAll({
    where:{category_id:req.params.id},
    include: [
      {model: Member_Goal},
      {model: Categories},
    ]
  }).then(dbGoalData => {
      // serialize data before passing to template
      goals = dbGoalData.map(goal => goal.get({ plain: true }));
      // console.log(goals);

    Categories.findAll()
    .then(dbCatData => {
      // serialize data before passing to template
      const categories = dbCatData.map(category => category.get({ plain: true }));
      // console.log(categories);
      res.render('dashboard', { goals, categories, loggedIn: req.session.loggedIn  });
    })
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;