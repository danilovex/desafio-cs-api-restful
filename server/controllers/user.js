'use strict';

var schemaValidator = require('is-my-json-valid/require');
var validator = schemaValidator('../models/user.validation.json');

module.exports = function(app){ // jshint ignore:line
  var controller = {};
  var service = app.services.user;

  controller.notFound = function(req, res){
    return res.status(404).json({mensagem: 'A API requisitada não foi encontrado!'});
  };

 controller.save = function(req, res){
   var isValid = validator(req.body);
   if(isValid) {
        service.save(req.body).then(function(data){
          return res.status(201).json({success: true, data: data});
        }).catch(function(err){
          return res.status(500).json({success: false, mensagem: err});
        });
   }
   else {
       return res.status(404).json({
         mensagem:'Campos obrigatórios não informados!',
         success: false,
         data: validator.errors
       });
   }
 };

  return controller;

};
