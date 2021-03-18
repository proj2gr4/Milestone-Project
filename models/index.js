const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');
const Categories = require("./Categories");
const Comment = require("./Comment");
const Goal = require("./Goal");
const Member_Goal = require("./Member-goal");
const Step = require("./Step");
const User = require("./User");

//When dealing with routes or models, make sure you specify the changes before moving on

