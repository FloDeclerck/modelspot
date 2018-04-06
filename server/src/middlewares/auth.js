const jwt = require('jsonwebtoken');
const config = require('../../config');
const user = require('../models/userModel');

export default (req, res, next) => {
    const authorizationHeader = req.headers['authorization'];
    let token;
  
    if (authorizationHeader) {
      token = authorizationHeader.split(' ')[1];
    }
  
    if (token) {
      jwt.verify(token, config.jwtSecret, (err, decoded) => {
        if (err) {
          res.status(401).json({ error: 'Failed to authenticate' });
        } else {
          User.findOne({ _id: decoded.id }, 'email _id username').then(user => {
            if (!user) {
              res.status(404).json({ errors: { global: "User not found" } });
            } else {
              req.currentUser = User;
              next();
            }
          });
        }
      });
    } else {
      res.status(403).json({
        error: 'No token provided'
      });
    }
  }

