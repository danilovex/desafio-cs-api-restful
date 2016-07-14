'use strict';
var Promise = require('bluebird');

module.exports = function(app){ // jshint ignore:line
  var service = {};
  var dao = app.dao.usuario;

function bindUsuario(data){
  return {
    id: data._id,
    data_criacao: data.data_criacao,
    data_atualizacao: data.data_atualizacao,
    ultimo_login: data.ultimo_login,
    token: data.token
  };
}

 service.salvar = function(usuario){

   return new Promise(function(resolve, reject){
     dao.getUsuario(usuario.email).then(function(data){
       if(data.length > 0){
         resolve('E-mail já existente!');
       }else{
         dao.salvar(usuario).then(function(data){
           resolve(bindUsuario(data));
         }).catch(function(err){
           reject(err);
         });
      }
     }).catch(function(err){
       reject(err);
     });

   });

 };

  return service;
};
