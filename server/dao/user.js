'use strict';
//var ObjectId = require('mongoose').Types.ObjectId,
//    Promise = require('bluebird');

module.exports = function(app){
  var User = app.models.user;

  var dao = {};

  dao.getUser = function(email){
      return User.findOne({ email: email }).then(function(row){
        return row ? row : null;
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

dao.update = function(user){
    return User.findOneAndUpdate({ _id: user._id }, user, { new: true }).then(function(row){
      return row;
    }).catch(function (err){
      return err;
    });
  };

  return dao;
};
