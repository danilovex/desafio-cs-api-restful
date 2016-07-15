'use strict';

var schemaValidator = require('is-my-json-valid/require');
var validatorSignup = schemaValidator('../models/user.validation.signup.json');
var validatorSignin = schemaValidator('../models/user.validation.signin.json');

module.exports = function(app){ // jshint ignore:line
  var controller = {};
  var service = app.services.user;

  function invalidSchema(errors, res){
    return res.status(404).json({
      mensagem:'Campos obrigatórios não informados!',
      success: false,
      data: errors
    });
  }

  controller.notFound = function(req, res){
    return res.status(404).json({mensagem: 'A API requisitada não foi encontrado!'});
  };

 controller.signup = function(req, res){
   var isValid = validatorSignup(req.body);
   if(isValid) {
        service.save(req.body).then(function(data){
          if (typeof data === 'string') {
            return res.status(406).json({success: true, data: data});
          }else{
            return res.status(201).json({success: true, data: data});
          }
        }).catch(function(err){
          return res.status(500).json({success: false, mensagem: err});
        });
   }
   else {
        return invalidSchema(validatorSignup.errors, res);
   }
 };

  controller.signin = function(req, res){
    var isValid = validatorSignin(req.body);
    if(isValid) {
      service.login(req.body).then(function(data){
        if (typeof data === 'string') {
          return res.status(401).json({success: false, data: data});
        }else{
          return res.status(200).json({success: true, data: data});
        }
      }).catch(function(err){
        return res.status(500).json({success: false, mensagem: err});
      });
    }
    else {
        return invalidSchema(validatorSignin.errors, res);
    }

  };
  controller.getUser = function(req, res){

  };
  
  return controller;

};
