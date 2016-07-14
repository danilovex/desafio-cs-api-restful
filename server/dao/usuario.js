'use strict';
var ObjectId = require('mongoose').Types.ObjectId,
    Promise = require('bluebird');

module.exports = function(app){
  var Usuario = app.models.usuario;

  var dao = {};

dao.getUsuario = function(email){
  return new Promise(function(resolve, reject){
    Usuario.findOne({ email: email }, function(err, rows) {
      if (err) {
        reject(err);
      } else {
        resolve((rows ? rows : []));
      }
    });
  });
};

dao.salvar = function(usuario){
    var model = new Usuario(usuario);
    return Promise.promisify(model.save, model)();
  };

  return dao;
};
