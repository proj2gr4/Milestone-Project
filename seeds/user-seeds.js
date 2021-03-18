const sequelize = require('../config/connection');
const { User } = require('../models');

const userdata = [
  {
    username: 'a1',
    password: 'password123'
  },
  {
    username: 'b2',
    password: 'password123'
  },
  {
    username: 'c3',
    password: 'password123'
  },
];

const seedUsers = () => User.bulkCreate(userdata, {individualHooks: true});

module.exports = seedUsers;
