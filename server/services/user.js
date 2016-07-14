'use strict';
var Promise = require('bluebird'),
    jwt = require('jsonwebtoken'),
    crypto = require('crypto');

module.exports = function(app){ // jshint ignore:line
  var service = {};
  var dao = app.dao.user;

function bindUser(data){
  return {
    id: data._id,
    data_criacao: data.data_criacao,
    data_atualizacao: data.data_atualizacao,
    ultimo_login: data.ultimo_login,
    token: data.token
  };
}


service.save = function(user) {
  return dao.getUser(user.email).then(function(data) {
    if(data.length > 0){
        return 'E-mail já existente!';
    }else{
      user.senha = crypto.createHash('sha1').update(user.senha).digest('hex');
      user.token = jwt.sign({ email: user.email }, app.get('secret'), { expiresIn: 3600 });
      dao.save(user).then(function(data){
        return bindUser(data);
      });
    }
  });
};


 /*service.save = function(user){

   return new Promise(function(resolve, reject){
     dao.getUser(user.email).then(function(data){
       if(data.length > 0){
         resolve('E-mail já existente!');
       }else{

         user.senha = crypto.createHash('sha1').update(user.senha).digest('hex');
         user.token = jwt.sign({ email: user.email }, app.get('secret'), { expiresIn: 3600 });

         dao.save(user).then(function(data){
           console.log(data);
           resolve(bindUser(data));
         }).catch(function(err){
           console.log(err);
           reject(err);
         });
      }
     }).catch(function(err){
       reject(err);
     });

   });

 };*/

  return service;
};
