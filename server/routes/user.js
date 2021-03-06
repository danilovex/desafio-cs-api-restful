'use strict';
module.exports = function(app ){
  var uri = '/rest/usuario';
  var controller = app.controllers.user;
  app.post(uri+'/signup', controller.signup);
  app.post(uri+'/signin', controller.signin);
  app.get(uri+'/:id', controller.getUser);
  app.use('/', controller.notFound);
};
