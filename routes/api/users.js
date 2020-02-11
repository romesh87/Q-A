const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

const User = require('../../models/User');
const auth = require('../../middleware/auth');

// @route   POST api/users/signup
// @desc    Register user
// @access  Public
router.post(
  '/signup',
  [
    check('name', 'name is required').notEmpty(),
    check('email', 'please include valid email').isEmail(),
    check(
      'password',
      'please include password with at least 6 characters'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    const avatar = gravatar.url(email, {
      size: '200',
      rating: 'pg',
      default: 'mm'
    });

    try {
      const user = await User.findOne({ email: email });
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      const newUser = new User({
        name,
        email,
        password,
        avatar
      });

      // Encrypting password
      newUser.password = await bcrypt.hash(password, 10);

      await newUser.save();

      const payload = {
        user: newUser.id
      };
      const secret = config.get('jwtSecret');
      jwt.sign(payload, secret, { expiresIn: '1d' }, (err, token) => {
        if (err) throw err;
        res.json({ token: token });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   POST api/users/signin
// @desc    Sign in user
// @access  Public
router.post(
  '/signin',
  [
    check('email', 'please include valid email').isEmail(),
    check(
      'password',
      'please include password with at least 6 characters'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      const match = await bcrypt.compare(password, user.password);
      if (match === false) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      const payload = {
        user: user.id
      };
      const secret = config.get('jwtSecret');
      jwt.sign(payload, secret, { expiresIn: '1d' }, (err, token) => {
        if (err) throw err;
        res.json({ token: token });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   GET api/users
// @desc    Get user info
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId, '-password');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
