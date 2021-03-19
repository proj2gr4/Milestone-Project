const User = require('./User');
const Categories = require('./Categories');
const Comment = require('./Comment');
const Goal = require('./Goal');
const Step = require('./Step');
const Member_Goal = require('./Member_Goal');
const User_Step = require('./User_Step');

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

//Goal-Member_goal association:
Goal.hasMany(Member_Goal, {
    foreignKey: 'goal_id'
})
Member_Goal.belongsTo(Goal, {
    foreignKey: 'goal_id'
})

//Step-User_Step association:
Step.hasMany(User_Step, {
    foreignKey: 'step_id'
})
User_Step.belongsTo(Step, {
    foreignKey: 'step_id'
})

//User-User_Step association:
User.hasMany(User_Step, {
    foreignKey: 'user_id'
})
User_Step.belongsTo(User, {
    foreignKey:'user_id'
})

module.exports = { User, Categories, Comment, Goal, Step, Member_Goal, User_Step };