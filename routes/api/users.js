const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
//const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const User = require('../../models/User');
const auth = require('../../middleware/auth');
const uploadUserPhoto = require('../../middleware/uploadUserPhoto');
const resizeUserPhoto = require('../../middleware/resizeUserPhoto');

// @route   POST api/users/signup
// @desc    Register user
// @access  Public
router.post(
  '/signup',
  [
    check('name', 'name is required').notEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please include password with at least 6 characters'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    // const avatar = gravatar.url(email, {
    //   size: '200',
    //   rating: 'pg',
    //   default: 'mm'
    // });

    try {
      const user = await User.findOne({ email: email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      const newUser = new User({
        name,
        email,
        password
        // avatar
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

// @route   POST api/users/login
// @desc    Log In user
// @access  Public
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please include password with at least 6 characters'
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
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials' }] });
      }

      const match = await bcrypt.compare(password, user.password);
      if (match === false) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials' }] });
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
    const user = await User.findById(req.userId, 'name email avatar');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PATCH api/users
// @desc    Update user info
// @access  Private
router.patch(
  '/',
  [
    auth,
    uploadUserPhoto.single('photo'),
    resizeUserPhoto,
    check('name', 'name is required').notEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'password update is not allowed').isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.userId, '-password');
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }

      if (!req.file) {
        req.body.avatar = 'default.jpg';
      } else {
        req.body.avatar = req.file.filename;
      }

      await user.updateOne(req.body);

      const updated = await User.findById(req.userId, 'name email avatar');

      res.json(updated);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   POST api/users/forgotPassword
// @desc    Forgot password route
// @access  Public
router.post(
  '/forgotPassword',
  check('email', 'Please include a valid email').isEmail(),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }

      const resetToken = await crypto.randomBytes(32).toString('hex');

      const resetTokenHashed = await crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

      user.passwordResetToken = resetTokenHashed;
      user.passwordResetExpiresIn = Date.now() + 10 * 60 * 1000;
      await user.save();

      let transport = nodemailer.createTransport({
        host: 'smtp.mailtrap.io',
        port: 2525,
        auth: {
          user: config.get('mailtrapUser'),
          pass: config.get('mailtrapPassword')
        }
      });

      let message = await transport.sendMail({
        from: '"Admin" <admin@q-and-a.com>',
        to: user.email,
        subject: 'Password reset(expires in 10min)',
        text: `Hello ${
          user.name.split(' ')[0]
        },\nThis is your password reset link:\n${
          req.protocol
        }://localhost:3000/resetPassword/${resetToken}`,
        html: `<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Reset Password</title>
          </head>
          <body>
            <p>Hello ${user.name},</p>
            <p>This is your password reset link:</p>
            <a href=${req.protocol}://localhost:3000/resetPassword/${resetToken}>${req.protocol}://localhost:3000/resetPassword/${resetToken}</a>
          </body>
        </html>`
      });

      console.log('Message sent: ', message.messageId);

      res.json({ msg: 'Email sent' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   POST api/users/resetPassword/:resetToken
// @desc    Reset password
// @access  Public
router.post(
  '/resetPassword/:resetToken',
  check(
    'newPassword',
    'Please include password with at least 6 characters'
  ).isLength({ min: 6 }),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const resetTokenHashed = crypto
        .createHash('sha256')
        .update(req.params.resetToken)
        .digest('hex');

      const user = await User.findOne({ passwordResetToken: resetTokenHashed });
      if (!user) {
        return res.status(400).json({ msg: 'Invalid reset token' });
      }

      if (Date.now() > user.passwordResetExpiresIn) {
        return res.status(400).json({ msg: 'Reset token has expired' });
      }

      user.password = await bcrypt.hash(req.body.newPassword, 10);
      user.passwordChangedAt = Date.now();
      await user.save();

      res.json({ msg: 'Password has been reset' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
