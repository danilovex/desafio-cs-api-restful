var schemaValidator = require('is-my-json-valid/require');
var validator = schemaValidator('../models/usuario.validacao.json');

module.exports = function(app){
  'use strict';
  var controller = {};
  /*var service = app.service.usuario;*/

 controller.salvar = function(req, res, next){
   var isValid = validator(req.body);
   if(isValid) {
       return res.status(201).json({message: 'É valido'});
   }
   else {
       return res.status(404).json(validator.errors);
   }
 };

  return controller;

};
