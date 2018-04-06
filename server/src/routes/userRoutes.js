const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
/*
// GET route for reading data
router.get('/', function (req, res, next) {
    return res.sendFile(path.join(__dirname + '/index.html'));
});

// POST Route for Updating Data
router.post('/', function (req, res, next) {
// Confirm that user typed same Password Twice
     if (req.body.password !== req.body.passwordConf) {
         var err = new Error('Passwords do not match.');
         err.status = 400;
         return next(err);
        }
        if (req.body.email &&
            req.body.username &&
            req.body.password &&
            req.body.passwordConf) {
            var userData = {
              email: req.body.email,
              username: req.body.username,
              password: req.body.password,
              passwordConf: req.body.passwordConf,
            }
// Use Schema.create to insert Data into the DataBase
            User.create(userData, function (err, user) {
              if (err) {
                return next(err)
              } else {
                return res.redirect('/profile');
              }
            });
          } else if (req.body.logemail && req.body.logpassword) {
            User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
              if (error || !user) {
                var err = new Error('Wrong email or password.');
                err.status = 401;
                return next(err);
              } else {
                req.session.userId = user._id;
                return res.redirect('/profile');
              }
            });
          } else {
            var err = new Error('All fields required.');
            err.status = 400;
            return next(err);
          }
        });*/

// app/routes.js
module.exports = function(app, passport) {
    
        // =====================================
        // HOME PAGE (with login links) ========
        // =====================================
        app.get('/', function(req, res) {
            res.render('index.ejs'); // load the index.ejs file
        });
    
        // =====================================
        // LOGIN ===============================
        // =====================================
        // show the login form
        app.get('/login', function(req, res) {
    
            // render the page and pass in any flash data if it exists
            res.render('login.ejs', { message: req.flash('loginMessage') });
        });
    
        // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));
    
        // =====================================
        // SIGNUP ==============================
        // =====================================
        // show the signup form
        app.get('/signup', function(req, res) {
    
            // render the page and pass in any flash data if it exists
            res.render('signup.ejs', { message: req.flash('signupMessage') });
        });
    
        // process the signup form
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));
    
        // =====================================
        // PROFILE SECTION =========================
        // =====================================
        // we will want this protected so you have to be logged in to visit
        // we will use route middleware to verify this (the isLoggedIn function)
        app.get('/profile', isLoggedIn, function(req, res) {
            res.render('profile.ejs', {
                user : req.user // get the user out of session and pass to template
            });
        });
    
        // =====================================
        // LOGOUT ==============================
        // =====================================
        app.get('/logout', function(req, res) {
            req.logout();
            res.redirect('/');
        });
    };
    
    // route middleware to make sure
    function isLoggedIn(req, res, next) {
    
        // if user is authenticated in the session, carry on
        if (req.isAuthenticated())
            return next();
    
        // if they aren't redirect them to the home page
        res.redirect('/');
    }