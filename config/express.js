'use strict';

/*jshint esversion: 6 */
const express = require('express'),
      load = require('express-load'),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose');

// Connect to database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admin:admin2016@ds011790.mlab.com:11790/desafiocsnodejs');


module.exports = function(){
  var app = express();
    // all environments
  app.set('port', process.env.PORT || 3000);

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  load('models', {cwd: 'server'})
    .then('dao')
    .then('services')
    .then('controllers')
    .then('routes')
    .into(app);

    return app;
};
