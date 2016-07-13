'use strict';
module.exports = function(app ){
  var uri = '/rest/usuario';
  var controller = app.controllers.usuario;
  app.post(uri, controller.salvar);
  /*app.post(uri+'/singin', controller.login);
  app.get(uri, controller.listUsers);
  app.get(uri+'/singup', controller.createUser);*/

};
