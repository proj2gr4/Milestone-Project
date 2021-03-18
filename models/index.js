const User = require('./User');
const Categories = require('./Categories');
const Comment = require('./Comment');
const Goal = require('./Goal');
const Step = require('./Step');
const Member_Goal = require('./Member_Goal');

// User-goal association:
User.hasMany(Goal, {
    foreignKey: 'user_id'
});
Goal.belongsTo(User, {
    foreignKey: 'user_id'
})

//User-comment association:
User.hasMany(Comment, {
    foreignKey: 'user_id'
})
Comment.belongsTo(User, {
    foreignKey: 'user_id'
})

//User-member_goal association:
User.hasMany(Member_Goal, {
    foreignKey: 'user_id'
})
Member_Goal.belongsTo(User, {
    foreignKey: 'user_id'
})

//Categories-Goal association:
Categories.hasMany(Goal, {
    foreignKey: 'category_id'
})
Goal.belongsTo(Categories, {
    foreignKey: 'category_id'
})

//Goal-Step association
Goal.hasMany(Step, {
    foreignKey: 'goal_id'
})
Step.belongsTo(Goal, {
    foreignKey: 'goal_id'
})

//Goal-Comment association:
Goal.hasMany(Comment, {
    foreignKey: 'goal_id'
})
Comment.belongsTo(Goal, {
    foreignKey: 'goal_id'
})

module.exports = { User, Categories, Comment, Goal, Step, Member_Goal };