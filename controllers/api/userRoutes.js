const router = require('express').Router();
const session = require('express-session'); // do I want / need to use this?
const { User } = require('../../models');

// Create a user
router.post('/signup', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.dataValues.user_id;
      req.session.logged_in = true;
      res.status(200).json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(400).json({ message: 'Email is already in use. Please choose another.' });
    } else {
      res.status(400).json(err);
    }
  }
});

// Log in as an existing user
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res.status(401).json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(401).json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.dataValues.user_id;
      req.session.logged_in = true;
      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Logout
router.post('/logout', (req, res) => {
  try {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        console.log('User logged out successfully.');
        res.status(204).end();
      });
    } else {
      console.log('User attempted to log out without being logged in.');
      res.status(401).json({ error: 'Unauthorized' });
    }
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;
