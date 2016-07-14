'use strict';
var ObjectId = require('mongoose').Types.ObjectId,
    Promise = require('bluebird');

module.exports = function(app){
  var User = app.models.user;

  var dao = {};
  
  dao.getUser = function(email){
    return Promise.promisify(User.find)({ email: email }).then(function (rows){
            return rows ? rows : [];
            }).catch(function (err){
                return err;
            })
    };

dao.save = function(user){
    var model = new User(user);
    return Promise.promisify(model.save, model)();
  };

  return dao;
};
