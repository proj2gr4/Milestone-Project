const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Step extends Model {}

Step.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },        
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        goal_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model:'goal',
                key: 'id'
            }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        start_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        due_date: {
            type: DataTypes.DATE,
            allowNull: false
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'step'
    }
);
    
module.exports = Step;