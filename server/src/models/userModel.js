//const mongoose = require('mongoose');
//const bcrypt = require('bcrypt');
//const Schema = mongoose.Schema;
/*
// User DataBase Schema
const UserSchema = new Schema({
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true, 
    },
    username: {
      type: String,
      unique: true,
      require: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true
    },
    passwordConf: {
      type: String,
      required: true,
    }
  });

// Authenticate Input Against DataBase
UserSchema.statics.authenticate = function (email, password, callback) {
  User.findOne({ email: email })
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          return callback(null, user);
        } else {
          return callback();
        }
      })
    });
}

// Hashing a Password Before Saving it to the Database
UserSchema.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash){
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});
  
  const User = mongoose.model('User', UserSchema);
  module.exports = User;*/

  const mongoose = require('mongoose');
  const bcrypt   = require('bcrypt-nodejs');
  
  // define the schema for our user model
const userSchema = mongoose.Schema({
  local            : {
    email        : String,
    password     : String,
  },
  facebook         : {
    id           : String,
    token        : String,
    email        : String,
    name         : String
  },
  twitter          : {
    id           : String,
    token        : String,
    displayName  : String,
    username     : String
  },
  google           : {
    id           : String,
    token        : String,
    email        : String,
    name         : String
  }
});
  
  // methods ======================
  // generating a hash
  userSchema.methods.generateHash = function(password) {
      return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  };
  
  // checking if password is valid
  userSchema.methods.validPassword = function(password) {
      return bcrypt.compareSync(password, this.local.password);
  };
  
  // create the model for users and expose it to our app
  module.exports = mongoose.model('User', userSchema);