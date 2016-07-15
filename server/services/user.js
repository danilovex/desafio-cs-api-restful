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
    nome: data.nome,
    email: data.email,
    telefones: data.telefones,
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
      return dao.save(user).then(function(data){
        return bindUser(data);
      });
    }
  });
};

  return service;
};
