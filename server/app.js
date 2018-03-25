const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

//server configuration
const basePath = '/login';
const port = 8080;

// Connection to DB
mongoose.connect('mongodb://mongodb')
    .then(() => {
      console.log('Backend Started');
    })
    .catch(err => {
        console.error('Backend error:', err.stack);
        process.exit(1);
    });

// Routes and Backend Funcioncalities
const ModelSpotRoutes = require('./src/routes/ModelSpotRoutes');

// App Instance
const app = express();
app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(basePath, ModelSpotRoutes);

// Execute App
app.listen(port, () => {
  console.log('TodoList Backend running on Port: ', port);
});