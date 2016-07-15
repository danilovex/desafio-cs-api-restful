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

var mockErro = 'Exception banco';
var mockSuccess = [
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

describe('Service Usuário', function() {

  var user = {
      nome: 'João',
      email: 'joao@gmail.com',
      senha: '123456'
  };

  before(function() {
    stubSave.returnsPromise().resolves(mockSuccess);
    stubGetUser.returnsPromise().resolves(mockSuccess);
  });

  it('Deve retornar mensagem que email já existe', function() {

  service(app).save(user).then(function(data){
    assert.equal(data, 'E-mail já existente!');
    stubGetUser.called.should.be.equal(true);
    stubSave.called.should.be.equal(false);
  });
});

before(function() {
  stubGetUser.returnsPromise().resolves(null);
  stubGetUser.returnsPromise().rejects(mockErro);
});

it('Deve exception ao validar se email existe', function() {

service(app).save(user).catch(function(err){
  assert.equal(err, mockErro);
  stubGetUser.called.should.be.equal(true);
  stubSave.called.should.be.equal(false);
});
});



});
