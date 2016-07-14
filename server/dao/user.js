'use strict';
var ObjectId = require('mongoose').Types.ObjectId,
    Promise = require('bluebird');

module.exports = function(app){
  var User = app.models.user;

  var dao = {};

dao.getUser = function(email){
  return new Promise(function(resolve, reject){
    User.find({ email: email }, function(err, rows) {
      if (err) {
        reject(err);
      } else {
        resolve((rows ? rows : []));
      }
    });
  });
};

dao.save = function(user){
  console.log('tese');
    var model = new User(user);
    return Promise.promisify(model.save, model)();
  };

  return dao;
};
