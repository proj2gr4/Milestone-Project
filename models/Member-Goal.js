const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Member_Goal extends Model {}

Member_Goal.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id'
        },
        allowNull: false
    },
    goal_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})
    
module.exports = Member_Goal;