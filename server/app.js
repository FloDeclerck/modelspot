/*const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Routes and Backend Funcioncalities
const users = require('./src/routes/userRoutes');
const auth = require('./src/routes/authRoutes');

// Connection to DB
mongoose.connect('mongodb://mongodb')
.then(() => {
  console.log('Backend Started');
})
.catch(err => {
  console.error('Backend error:', err.stack);
  process.exit(1);
});

mongoose.Promise = global.Promise;

// App Instance
const app = express();

app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(basePath, ModelSpotRoutes);
app.use('/api/users', users);
app.use('/api/auth', auth);

// Execute App
app.listen(8080, () => {
  console.log('TodoList Backend running on Port: ', 8080);
});*/


// server.js

// set up ======================================================================
// get all the tools we need
const express  = require('express');
const app      = express();
const port     = process.env.PORT || 8080;
const mongoose = require('mongoose');
const passport = require('passport');
const flash    = require('connect-flash');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

const configDB = require('./src/config/config');

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

require('./src/config/passport')(passport); // pass passport for configuration

	// set up our express application
	app.use(logger('dev')); // log every request to the console
	app.use(cookieParser()); // read cookies (needed for auth)
	app.use(bodyParser()); // get information from html forms

	app.set('view engine', 'ejs'); // set up ejs for templating

	// required for passport
	app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
	app.use(passport.initialize());
	app.use(passport.session()); // persistent login sessions
	app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./src/routes/userRoutes')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);