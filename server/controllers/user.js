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
   var validator;
   var isValid = validatorSignup(req.body);
   if(isValid) {
        service.save(req.body).then(function(data){
          console.log('controller>>');
          console.log(data);
          return res.status(201).json({success: true, data: data});
        }).catch(function(err){
          return res.status(500).json({success: false, mensagem: err});
        });
   }
   else {
        return invalidSchema(validator.errors, res);
   }
 };

  controller.signin = function(req, res){
    var validator;
    var isValid = validatorSignin(req.body);
    if(isValid) {
      //TODO Caso o e-mail exista e a senha seja a mesma que a senha persistida, retornar igual ao endpoint de sign_up.
      //TODO Caso o e-mail não exista, retornar erro com status apropriado mais a mensagem "Usuário e/ou senha inválidos"
      //TODO Caso o e-mail exista mas a senha não bata, retornar o status apropriado 401 mais a mensagem "Usuário e/ou senha inválidos"
      return res.status(201).json({success: true, data: 'TESTE'});
    }
    else {
        return invalidSchema(validator.errors, res);
    }

  };
  return controller;

};
