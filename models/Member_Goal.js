const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Member_Goal extends Model {}

Member_Goal.init(
    {
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
            references:{
                model: 'goal',
                key: 'id'
            },
            allowNull: false
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'member_goal'
    }
);
    
module.exports = Member_Goal;