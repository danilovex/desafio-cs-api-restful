'use strict';

var schemaValidator = require('is-my-json-valid/require');
var validator = schemaValidator('../models/usuario.validacao.json');

module.exports = function(app){ // jshint ignore:line
  var controller = {};
  var service = app.services.usuario;

 controller.salvar = function(req, res){
   var isValid = validator(req.body);
   if(isValid) {
        service.salvar(req.body).then(function(data){
          return res.status(201).json({success: true, data: data});
        }).catch(function(err){
          return res.status(500).json({success: false, data: err});
        });
   }
   else {
       return res.status(404).json({success: false, data: validator.errors});
   }
 };

  return controller;

};
