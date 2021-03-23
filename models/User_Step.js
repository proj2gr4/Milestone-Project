const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Step = require('./Step');

class User_Step extends Model {}

User_Step.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },        
        step_id: {
            type: DataTypes.INTEGER,
            allowNull:false,
            references:{
                model: 'Step',
                key: 'id'
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model:'User',
                key: 'id'
            }
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'Not Started'
        },
        img_url: {
            type: DataTypes.STRING,
            allowNull: true
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'user_step'
    }
);

module.exports = User_Step;