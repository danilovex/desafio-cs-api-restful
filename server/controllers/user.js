'use strict';

var schemaValidator = require('is-my-json-valid/require');
var validatorSignup = schemaValidator('../models/user.validation.signup.json');
var validatorSignin = schemaValidator('../models/user.validation.signin.json');

module.exports = function(app){ // jshint ignore:line
  var controller = {};
  var service = app.services.user;

  function _invalidSchema(errors, res){
    return res.status(404).json({
      mensagem:'Campos obrigatórios não informados!',
      data: errors
    });
  }
  function _error(res, err){
    return res.status(500).json({mensagem: err});
  }
  function _notAuthorized(res, msg){
    return res.status(401).json({mensagem: msg || 'Não autorizado'});
  }
  function _ok(res, data){
    return res.status(200).json(data);
  }

  controller.notFound = function(req, res){
    return res.status(404).json({mensagem: 'A API requisitada não foi encontrado!'});
  };

 controller.signup = function(req, res){
   var isValid = validatorSignup(req.body);
   if(isValid) {
        service.save(req.body).then(function(data){
          if (typeof data === 'string') {
            return res.status(406).json({mensagem: data});
          }else{
            return res.status(201).json(data);
          }
        }).catch(function(err){
          return _error(res, err);
        });
   }
   else {
        return _invalidSchema(validatorSignup.errors, res);
   }
 };

  controller.signin = function(req, res){
    var isValid = validatorSignin(req.body);
    if(isValid) {
      service.login(req.body).then(function(data){
        if (typeof data === 'string') {
          return _notAuthorized(res, data);
        }else{
          return _ok(res, data);
        }
      }).catch(function(err){
        return _error(res, err);
      });
    }
    else {
        return _invalidSchema(validatorSignin.errors, res);
    }

  };
  controller.getUser = function(req, res){
    var token = req.headers.bearer;
    if(!token || !req.params.hasOwnProperty('id')){
      return _notAuthorized(res);
    }else{
        service.getUser(token, req.params.id).then(function(data){
          return (typeof data === 'string') ? _notAuthorized(res, data) : _ok(res, data);
        }).catch(function(err){
          return _error(res, err);
        });
    }
  };

  return controller;

};
