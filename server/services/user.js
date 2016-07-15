'use strict';
var Promise = require('bluebird'),
  jwt = require('jsonwebtoken'),
  crypto = require('crypto');

module.exports = function(app) { // jshint ignore:line
  var service = {};
  var dao = app.dao.user;

  function bindUser(data) {
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
  function cryptoPassword(data){
    return crypto.createHash('sha1').update(data).digest('hex');
  }
  function generateToken(data){
    return jwt.sign({
      email: data
    }, app.get('secret'), {
      expiresIn: 1800
    });
  }

  service.save = function(user) {
    return dao.getUser(user.email).then(function(data) {
      if (data) {
        return 'E-mail já existente!';
      } else {
        user.senha = cryptoPassword(user.senha);
        user.token = generateToken(user.email);
        return dao.save(user).then(function(data) {
          return bindUser(data);
        });
      }
    });
  };
  //TODO Caso o e-mail não exista, retornar erro com status apropriado mais a mensagem "Usuário e/ou senha inválidos"
  //TODO Caso o e-mail exista mas a senha não bata, retornar o status apropriado 401 mais a mensagem "Usuário e/ou senha inválidos"
  //TODO Caso o e-mail exista e a senha seja a mesma que a senha persistida, retornar igual ao endpoint de sign_up.
  service.login = function(user) {
    var msgUserPassword = 'Usuário e/ou senha inválidos';
    return dao.getUser(user.email).then(function(data) {
      if (data) {
        if(data.senha === cryptoPassword(user.senha)){
          data.token = generateToken(user.email);
          data.ultimo_login = new Date();
          return dao.update(data).then(function(row){
            return bindUser(row);
          });
        }else{
          return msgUserPassword;
        }
      }else{
        return msgUserPassword;
      }
    });
  };

  return service;
};
