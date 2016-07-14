'use strict';
/*jshint esversion: 6 */
/*jshint unused: false */


const sinon = require('sinon'),
      assert = require('assert'),
      should = require('should'),
      controller = require('../server/controllers/usuario');

var usuario = {salvar:function(err,data){}};
var services = {usuario: usuario};
var app = {services:services};

var res = {
	status: function (x){
		return res;
	},
	json: function (x){
		return res;
	}
};

var stub = sinon.stub(app.services.usuario, 'salvar');

describe('Controller Usuário', function() {
		it('Deve retornar false quando não passar nome', function() {

	    var usuario = {
	      body : {
	        email: 'teste@teste.com',
					senha: 'teste123'
	      }
	    };

			controller(app).salvar(usuario, res, function(err, data){
				data.success.should.equal(false);
				done();
			});
		});
		it('Deve retornar false quando não passar email', function() {

	    var usuario = {
	      body : {
	        nome: 'João',
					senha: 'teste123'
	      }
	    };

			controller(app).salvar(usuario, res, function(err, data){
				data.success.should.equal(false);
				done();
			});
		});
		it('Deve retornar false quando não passar senha', function() {

	    var usuario = {
	      body : {
	        email: 'teste@teste.com',
					nome: 'João'
	      }
	    };
			controller(app).salvar(usuario, res, function(err, data){
				data.success.should.equal(false);
				done();
			});
		});

		it('Deve retornar false quando não passar parâmetros obrigatórios', function() {

		    var usuario = {
		      body : {}
		    };

			controller(app).salvar(usuario, res, function(err, data){
				data.success.should.equal(false);
				done();
			});
		});

		it('Deve retornar true quando passar parâmetros obrigatórios', function() {

			var usuario = {
				body : {
					nome: 'João',
					email: 'teste@teste.com',
					senha: 'teste123'
				}
			};

			stub.returns( function(usuario){
				return {
							 success: true,
							 data: {
									 id: '5786cf8373e4513352c1aaa3',
									 data_criacao: '2016-07-13T23:32:19.233Z',
									 data_atualizacao: '2016-07-13T23:32:19.233Z',
									 ultimo_login: '2016-07-13T23:32:19.233Z'
							 }
						 };
				});

		controller(app).salvar(usuario, res, function(err, data){
			//data.success.should.equal(true);
			//services.salvar.calledOnce.should.be.true;
			done();
		});
	});


});
