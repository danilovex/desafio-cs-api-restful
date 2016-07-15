'use strict';
//var ObjectId = require('mongoose').Types.ObjectId,
//    Promise = require('bluebird');

module.exports = function(app){
  var User = app.models.user;

  var dao = {};

  dao.getUser = function(email){
      return User.find({ email: email }).then(function(rows){
        return rows ? rows : [];
      }).catch(function (err){
          return err;
      });
  };

dao.save = function(user){
    return User.createAsync(user).then(function(row){
      return row;
    }).catch(function (err){
      return err;
    });
  };

  return dao;
};
