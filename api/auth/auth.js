const express = require('express');
const router = express.Router();
const Users = require('../../models/Users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const authMiddleware = require('../../middlewares/authMiddleware');

// Register new user route
router.post('/register', async (req, res) => {
  const { username, mail, password } = req.body;

  try {
    // Simple check for empty fields
    if (!username || !mail || !password) {
      return res.status(400).json({ msg: 'All fields must be filled' });
    }

    //Password crypting
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;

    // Create new user
    const newUser = await Users.create(req.body);

    // Generate JWT
    const token = jwt.sign(
      { id: newUser._id, name: newUser.username },
      process.env.JWT_SECRET
    );

    // Set JWT to cookie
    res.cookie('jwt', token, {
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
    });

    //return user and token
    return res
      .status(200)
      .json({ msg: 'User added to DB', user: newUser, token });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ err: error.message });
  }
});

// Log in router
router.post('/login', async (req, res) => {
  const { mail, password } = req.body;

  try {
    // Simple check for empty fields
    if (!mail || !password) {
      return res.status(400).json({ msg: 'All fields must be filled' });
    }

    // Check first if user is in DB
    const userInDB = await Users.findOne({ mail });

    if (!userInDB) {
      return res
        .status(404)
        .json({ msg: `there is no user in DB with email ${email}` });
    }

    // Check if password matches
    const checkPassword = await bcrypt.compare(password, userInDB.password);
    if (!checkPassword) {
      return res.status(400).json({ msg: 'Wrong password' });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: userInDB._id, name: userInDB.username },
      process.env.JWT_SECRET
    );

    // Set JWT to cookie
    res.cookie('jwt', token, {
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
    });

    //return user and token
    res.status(200).json({ user: userInDB, token });
  } catch (error) {
    return res.status(400).json({ err: error.message });
  }
});

router.get('/users', authMiddleware, async (req, res) => {
  const user = await Users.findById(req.user.id).select('-password');
  return res.status(200).json({ user });
});

module.exports = router;
