const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');

const app = express();
const router = express.Router();

const user = require('../models/userModel');

//Schema
router.route('/').post((req, res) => {
  const { id, password } = req.body;
  User.findOne({
    $or: [
      { username: id },
      { email: id }
    ]
  }).then(user => {
    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({
          id: user._id,
          username: user.username
        }, config.jwtSecret);
        res.json({ token });
      } else {
        res.status(401).json({ errors: { form: 'Invalid Credentials' } });
      }
    } else {
      res.status(401).json({ errors: { form: 'Invalid Credentials' } });
    }
  });
});

module.exports = router;