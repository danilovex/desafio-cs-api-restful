'use strict';
/*jshint esversion: 6 */
/*jshint unused: false */
const sinon = require('sinon'),
  assert = require('assert'),
  should = require('should'),
  service = require('../../server/services/user'),
  sinonStubPromise = require('sinon-stub-promise');

sinonStubPromise(sinon);

var dao = {
  save: function(err, data) {},
  getUser: function(err, data) {}
};

var app = {
  dao: {
    user: dao
  }
};

var stubSave = sinon.stub(app.dao.user, 'save');
var stubGetUser = sinon.stub(app.dao.user, 'getUser');

var res = {
  status: function(x) {
    return res;
  },
  json: function(x) {
    return res;
  }
};

before(function() {
  var mock = [
    {
      _id: '5786cf8373e4513352c1aaa3',
      nome: 'João',
      email: 'joao@gmail.com',
      senha: 'UAFDF4343434343DDD',
      telefones: [
        {ddd: 11, numero: 33905221},
        {ddd: 12, numero: 33905221}
      ],
      data_criacao: '2016-07-13T23:32:19.233Z',
      data_atualizacao: '2016-07-13T23:32:19.233Z',
      ultimo_login: '2016-07-13T23:32:19.233Z'
    }
  ];
  stubSave.returnsPromise().resolves(mock);
  stubGetUser.returnsPromise().resolves(mock);
});

describe('Service Usuário', function() {

  var user = {
      nome: 'João',
      email: 'joao@gmail.com',
      senha: '123456'
  };

  it('Deve retornar mensagem que email já existe', function() {

  service(app).save(user).then(function(data){
    assert.equal(data, 'E-mail já existente!');
    stubGetUser.called.should.be.equal(true);
    stubSave.called.should.be.equal(false);
  });
});


});
