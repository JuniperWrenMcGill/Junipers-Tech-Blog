const sequelize = require('../config/connection');
const { User, Post } = require('../models'); // Assuming your models are named User and Post

const userData = require('./user.json'); // Renamed variable
const postData = require('./post.json'); // Renamed variable

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Post.bulkCreate(postData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
