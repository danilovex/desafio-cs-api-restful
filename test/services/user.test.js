'use strict';
/*jshint esversion: 6 */
/*jshint unused: false */
const sinon = require('sinon'),
    assert = require('assert'),
    should = require('should'),
    service = require('../../server/services/user'),
    sinonStubPromise = require('sinon-stub-promise'),
    crypto = require('crypto');

sinonStubPromise(sinon);

describe('Service Usuário', function() {

    describe('#SaveService', function() {

        var dao = {
            save: function(err, data) {},
            getUser: function(err, data) {}
        };
        var app = {
            dao: {
                user: dao
            }
        };
        var stubDaoGetUser = sinon.stub(app.dao.user, 'getUser');
        var stubDaoSave = sinon.stub(app.dao.user, 'save');

        before(function() {
            var mockSuccess = {
                nome: 'João',
                email: 'joao@gmail.com',
            };
            stubDaoGetUser.returnsPromise().resolves(mockSuccess);
        });
        it('Deve retornar mensagem que email já existe', function() {

            let user = {
                nome: 'João',
                email: 'joao@gmail.com',
                senha: '123456'
            };

            service(app).save(user).then(function(data) {
                assert.equal(data, 'E-mail já existente!');
            });
            stubDaoGetUser.called.should.be.equal(true);
            stubDaoSave.called.should.be.equal(false);
        });


        var dao2 = {
            save: function(err, data) {},
            getUser: function(err, data) {}
        };
        var app2 = {
            dao: {
                user: dao2
            }
        };
        var stubDao2GetUser = sinon.stub(app2.dao.user, 'getUser');
        var stubDao2Save = sinon.stub(app2.dao.user, 'save');
        before(function() {
            stubDao2GetUser.returnsPromise().resolves(null);
            var mockSuccess = {
                _id: '5786cf8373e4513352c1aaa3',
                nome: 'João Silva',
                email: 'joao@gmail.com',
                telefones: [{
                    ddd: 11,
                    numero: 33905221
                }, {
                    ddd: 12,
                    numero: 33905221
                }],
                data_criacao: '2016-07-13T23:32:19.233Z',
                data_atualizacao: '2016-07-13T23:32:19.233Z',
                ultimo_login: '2016-07-13T23:32:19.233Z',
                token: 'joao.silva@gmail.com'
            };
            stubDao2Save.returnsPromise().resolves(mockSuccess);
        });
        it('Deve retornar dados do usuário criado', function() {

            let user = {
                nome: 'João Silva',
                email: 'joao.silva@gmail.com',
                senha: '123456'
            };

            service(app2).save(user).then(function(data) {
                assert.equal(mockSuccess, data);
            });
            stubDao2GetUser.called.should.be.equal(true);
            stubDao2Save.called.should.be.equal(true);
        });

        });
    describe('#LoginService', function() {

        var dao3 = {
            update: function(err, data) {},
            getUser: function(err, data) {}
        };
        var app3 = {
            dao: {
                user: dao3
            }
        };
        var stubDao3GetUser = sinon.stub(app3.dao.user, 'getUser');
        var stubDao3Update = sinon.stub(app3.dao.user, 'update');
        before(function() {
            stubDao3GetUser.returnsPromise().resolves(null);
        });
        it('Deve retornar usuário inválido quando service retornar null', function() {
            let user = {
                email: 'joao.silva@gmail.com'
            };
            service(app3).login(user).then(function(data) {
                assert.equal('Usuário e/ou senha inválidos', data);
            });
            stubDao3GetUser.called.should.be.equal(true);
            stubDao3Update.called.should.be.equal(false);
        });

        var dao4 = {
            update: function(err, data) {},
            getUser: function(err, data) {}
        };
        var app4 = {
            dao: {
                user: dao4
            }
        };
        var stubDao4GetUser = sinon.stub(app4.dao.user, 'getUser');
        var stubDao4Update = sinon.stub(app4.dao.user, 'update');
        before(function() {
            var mockSuccess = {
                senha: '123456'
            };
            stubDao4GetUser.returnsPromise().resolves(mockSuccess);
        });
        it('Deve retornar usuário inválido quando senha for diferente', function() {
            let user = {
                email: 'joao.silva@gmail.com',
                senha: '123456'
            };
            service(app4).login(user).then(function(data) {
                assert.equal('Usuário e/ou senha inválidos', data);
            });
            stubDao4GetUser.called.should.be.equal(true);
            stubDao4Update.called.should.be.equal(false);
        });

        var dao5 = {
            update: function(err, data) {},
            getUser: function(err, data) {}
        };
        var app5 = {
            dao: {
                user: dao5
            }
        };
        var stubDao5GetUser = sinon.stub(app5.dao.user, 'getUser');
        var stubDao5Update = sinon.stub(app5.dao.user, 'update');
        var mockSuccess = {
            email: 'João Silva',
            senha: crypto.createHash('sha1').update('123456').digest('hex')
        };
        before(function() {
            stubDao5GetUser.returnsPromise().resolves(mockSuccess);
            stubDao5Update.returnsPromise().resolves(mockSuccess);
        });
        it('Deve retornar usuário', function() {
            let user = {
                email: 'joao.silva@gmail.com',
                senha: '123456'
            };
            service(app5).login(user).then(function(data) {
                assert.equal(mockSuccess.email, data.email);
                assert.equal(false, data.hasOwnProperty('senha'));
            });
            stubDao5GetUser.called.should.be.equal(true);
            stubDao5Update.called.should.be.equal(true);
        });
    });

    describe('#GetUserService', function() {
        var dao6 = {
            update: function(err, data) {},
            getUser: function(err, data) {}
        };
        var app6 = {
            dao: {
                user: dao6
            }
        };
        var stubDao6GetUser = sinon.stub(app6.dao.user, 'getUser');
        before(function() {
            stubDao6GetUser.returnsPromise().resolves(null);
        });
        it("Deve retornar mensagem de não autorizado quando não encontrar usuário", function(){
            service(app6).getUser('GESSSFF3345ddd', '123456789').then(function(data){
                assert.equal('Não autorizado', data);
            });
        });

        var dao7 = {
            update: function(err, data) {},
            getUser: function(err, data) {}
        };
        var app7 = {
            dao: {
                user: dao7
            }
        };
        var stubDao7GetUser = sinon.stub(app7.dao.user, 'getUser');
        before(function() {
            let mock = {
                ultimo_login: new Date('07/16/2016 09:00:00')
            };
            stubDao7GetUser.returnsPromise().resolves(mock);
        });
        it("Deve retornar mensagem de sessão inválida quando o último login for maior que trinta minutos", function(){
            service(app7).getUser('GESSSFF3345ddd', '123456789').then(function(data){
                assert.equal('Sessão inválida', data)
            });
        });

        var dao8 = {
            update: function(err, data) {},
            getUser: function(err, data) {}
        };
        var app8 = {
            dao: {
                user: dao8
            }
        };
        var stubDao8GetUser = sinon.stub(app8.dao.user, 'getUser');
        var mock = {
            ultimo_login: new Date()
        };
        before(function() {
            stubDao8GetUser.returnsPromise().resolves(mock);
        });
        it("Deve retornar usuário", function(){
            service(app8).getUser('GESSSFF3345ddd', '123456789').then(function(data){
                assert.equal(mock.ultimo_login, data.ultimo_login)
            });
        });

    });


});
