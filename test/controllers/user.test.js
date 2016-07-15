'use strict';
/*jshint esversion: 6 */
/*jshint unused: false */
const sinon = require('sinon'),
  assert = require('assert'),
  should = require('should'),
  controller = require('../../server/controllers/user'),
  sinonStubPromise = require('sinon-stub-promise');

sinonStubPromise(sinon);

var service = {
  save: function(err, data) {}
};

var app = {
  services: {
    user: service
  }
};

var stub = sinon.stub(app.services.user, 'save');

var res = {
  status: function(x) {
    return res;
  },
  json: function(x) {
    return res;
  }
};

before(function() {
  stub.returnsPromise().resolves({
    success: true,
    data: {
      id: '5786cf8373e4513352c1aaa3',
      nome: 'Joao',
      email: 'joao@gmail.com',
      telefones: [{ddd: 11, numero: 42513698}],
      data_criacao: '2016-07-13T23:32:19.233Z',
      data_atualizacao: '2016-07-13T23:32:19.233Z',
      ultimo_login: '2016-07-13T23:32:19.233Z',
      token: 'HUDAHUADH44545JH45JH43534KHK35'
    }
  });
});

describe('Controller Usuário', function() {
  it('Deve retornar false quando não passar nome', function() {

    var user = {
      body: {
        email: 'teste@teste.com',
        senha: 'teste123'
      }
    };
    res = {
      status: function(status){
        assert.equal(404, status);
        return this;
      },
      json: function(json){
        assert.equal(false,json.success);
        assert.equal('data.nome',json.data[0].field);
        assert.equal('is required',json.data[0].message);
        return this;
      }
    };
controller(app).signup(user, res);
    stub.called.should.be.equal(false);
});

  it('Deve retornar false quando não passar email', function() {

    var user = {
      body: {
        nome: 'João',
        senha: 'teste123'
      }
    };

    res = {
      status: function(status){
        assert.equal(404, status);
        return this;
      },
      json: function(json){
        assert.equal(false,json.success);
        assert.equal('data.email',json.data[0].field);
        assert.equal('is required',json.data[0].message);
        return this;
      }
    };

controller(app).signup(user, res);
stub.called.should.be.equal(false);

});



  it('Deve retornar false quando não passar senha', function() {

    var user = {
      body: {
        email: 'teste@teste.com',
        nome: 'João'
      }
    };

    res = {
      status: function(status){
        assert.equal(404, status);
        return this;
      },
      json: function(json){
        assert.equal(false,json.success);
        assert.equal('data.senha',json.data[0].field);
        assert.equal('is required',json.data[0].message);
        return this;
      }
    };

    controller(app).signup(user, res);
    stub.called.should.be.equal(false);
  });


  it('Deve retornar false quando não passar parâmetros obrigatórios', function() {
    var user = {
      body : {}
    };

        res = {
          status: function(status){
            assert.equal(404, status);
            return this;
          },
          json: function(json){
            assert.equal(false,json.success);
            assert.equal('data.nome',json.data[0].field);
            assert.equal('is required',json.data[0].message);
            assert.equal('data.email',json.data[1].field);
            assert.equal('is required',json.data[1].message);
            assert.equal('data.senha',json.data[2].field);
            assert.equal('is required',json.data[2].message);
            return this;
          }
        };

 controller(app).signup(user, res);
      stub.called.should.be.equal(false);

 });

  it('Deve retornar true quando passar parâmetros obrigatórios', function() {
    var user = {
      body: {
        nome: 'João',
        email: 'teste@teste.com',
        senha: 'teste123'
      }
    };

    res = {
      status: function(status){
        assert.equal(201, status);
        return this;
      },
      json: function(json){
        assert.equal(true,json.success);
        assert.ok(hasOwnProperty(json.data.id));
        assert.ok(hasOwnProperty(json.data.nome));
        assert.ok(hasOwnProperty(json.data.email));
        assert.ok(hasOwnProperty(json.data.telefones));
        assert.ok(hasOwnProperty(json.data.data_criacao));
        assert.ok(hasOwnProperty(json.data.data_atualizacao));
        assert.ok(hasOwnProperty(json.data.ultimo_login));
        assert.ok(hasOwnProperty(json.data.token));
        return this;
      }
    };

    controller(app).signup(user, res);
    stub.called.should.be.equal(true);
  });


});
