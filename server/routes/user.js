module.exports = function(app ){
  var uri = '/rest/users';
  var controller = app.controllers.user;
  app.get(uri, controller.listUsers);
  app.post(uri+'/singin', controller.login);
  app.get(uri+'/singup', controller.createUser);

};
