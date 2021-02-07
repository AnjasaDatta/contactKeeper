const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../models/User');

//Register a user
router.post(
  '/',
  [
    body('name', 'name is required').not().isEmpty(),
    body('email', 'please enter a valid email').isEmail(),
    body('password', 'password should be of 6 characters').isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { name, email, password } = req.body;
      var user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'User Already Exists' });
      }
      user = new User({
        name,
        email,
        password,
      });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ msg: 'Internal Server Error' });
    }
  }
);
module.exports = router;
