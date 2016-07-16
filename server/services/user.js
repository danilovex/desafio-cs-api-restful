'use strict';
var jwt = require('jsonwebtoken'),
    crypto = require('crypto');

module.exports = function(app) { // jshint ignore:line
  var service = {};
  var dao = app.dao.user;

  function _bindUser(data) {
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
  function _crypto(data){
    return crypto.createHash('sha1').update(data).digest('hex');
  }
  function _token(data){
    return jwt.sign({
      email: data
    }, 'DesafioConcreteSolutions', {
      expiresIn: 1800
    });
  }

  service.save = function(user) {
    return dao.getUser({email: user.email}).then(function(data) {
      if (data) {
        return 'E-mail já existente!';
      } else {
        user.senha = _crypto(user.senha);
        user.token = _token(user.email);
        return dao.save(user).then(function(data) {
          return _bindUser(data);
        });
      }
    });
  };

  service.login = function(user) {
    var msgUserPassword = 'Usuário e/ou senha inválidos';
    return dao.getUser({email: user.email}).then(function(data) {
      if (data) {
        if(data.senha === _crypto(user.senha)){
          data.token = _token(user.email);
          data.ultimo_login = new Date();
          return dao.update(data).then(function(row){
            return _bindUser(row);
          });
        }else{
          return msgUserPassword;
        }
      }else{
        return msgUserPassword;
      }
    });
  };

  service.getUser = function(token, id){
    return dao.getUser({_id: id, token: token}).then(function(data){
      if(data){
        return (((Math.abs(new Date()- data.ultimo_login) / 36e5)*60)>30) ? 'Sessão inválida' : _bindUser(data);
      }else{
        return 'Não autorizado';
      }
    });
  };

  return service;
};
