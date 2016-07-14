'use strict';
module.exports = function(app ){
  var uri = '/rest/usuario';
  var controller = app.controllers.user;
  app.post(uri, controller.save);
  app.use('/', controller.notFound);
  /*app.post(uri+'/singin', controller.login);
  app.get(uri, controller.listUsers);
  app.get(uri+'/singup', controller.createUser);*/

};
