var ObjectId = require('mongoose').Types.ObjectId,
    Promise = require('bluebird');

module.exports = function(app){
  var Usuario = app.models.usuario;

  var dao = {};

dao.emailExists = function(email){
  return Usuario.findOne({ email: email })
  .then(function(usuario) {
    if(!usuario){
      return false;
    }else{
      return true;
    }
  });
};

dao.salvar = function(usuario){
    var model = new Usuario(usuario);
    return Promise.promisify(model.save, model)();
  };

  return dao;
};
