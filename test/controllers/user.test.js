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
    save: function(err, data) {},
    login: function(err, data) {},
    getUser: function(err, data) {}
};
var app = {
    services: {
        user: service
    }
};
var res = {
    status: function(x) {
        return res;
    },
    json: function(x) {
        return res;
    }
};


describe('Controller Usuário', function() {

    var userMock = {
        data: {
            id: '5786cf8373e4513352c1aaa3',
            nome: 'Joao',
            email: 'joao@gmail.com',
            telefones: [{
                ddd: 11,
                numero: 42513698
            }],
            data_criacao: '2016-07-13T23:32:19.233Z',
            data_atualizacao: '2016-07-13T23:32:19.233Z',
            ultimo_login: '2016-07-13T23:32:19.233Z',
            token: 'HUDAHUADH44545JH45JH43534KHK35'
        }
    };

    describe('#Signup', function() {

        var stubSave = sinon.stub(app.services.user, 'save');
        before(function() {
            stubSave.returnsPromise().resolves(userMock);
        });

        it('Deve retornar 404 quando não passar nome', function() {
            var user = {
                body: {
                    email: 'teste@teste.com',
                    senha: 'teste123'
                }
            };
            res = {
                status: function(status) {
                    assert.equal(404, status);
                    return this;
                },
                json: function(json) {
                    assert.equal('data.nome', json.data[0].field);
                    assert.equal('is required', json.data[0].message);
                    return this;
                }
            };
            controller(app).signup(user, res);
            stubSave.called.should.be.equal(false);
        });

        it('Deve retornar 404 quando não passar email', function() {
            var user = {
                body: {
                    nome: 'João',
                    senha: 'teste123'
                }
            };
            res = {
                status: function(status) {
                    assert.equal(404, status);
                    return this;
                },
                json: function(json) {
                    assert.equal('data.email', json.data[0].field);
                    assert.equal('is required', json.data[0].message);
                    return this;
                }
            };
            controller(app).signup(user, res);
            stubSave.called.should.be.equal(false);
        });

        it('Deve retornar 404 quando não passar senha', function() {
            var user = {
                body: {
                    email: 'teste@teste.com',
                    nome: 'João'
                }
            };
            res = {
                status: function(status) {
                    assert.equal(404, status);
                    return this;
                },
                json: function(json) {
                    assert.equal('data.senha', json.data[0].field);
                    assert.equal('is required', json.data[0].message);
                    return this;
                }
            };
            controller(app).signup(user, res);
            stubSave.called.should.be.equal(false);
        });

        it('Deve retornar 404 quando não passar nome, email e senha', function() {
            var user = {
                body: {}
            };
            res = {
                status: function(status) {
                    assert.equal(404, status);
                    return this;
                },
                json: function(json) {
                    assert.equal('data.nome', json.data[0].field);
                    assert.equal('is required', json.data[0].message);
                    assert.equal('data.email', json.data[1].field);
                    assert.equal('is required', json.data[1].message);
                    assert.equal('data.senha', json.data[2].field);
                    assert.equal('is required', json.data[2].message);
                    return this;
                }
            };
            controller(app).signup(user, res);
            stubSave.called.should.be.equal(false);
        });

        it('Deve retornar 201 quando passar todos parâmetros obrigatórios', function() {
            var user = {
                body: {
                    nome: 'João',
                    email: 'teste@teste.com',
                    senha: 'teste123'
                }
            };
            res = {
                status: function(status) {
                    assert.equal(201, status);
                    return this;
                },
                json: function(json) {
                    let data = json.data;
                    assert.equal(userMock.data, data);
                    return this;
                }
            };
            controller(app).signup(user, res);
            stubSave.called.should.be.equal(true);
        });
    });

    describe('#NotFound', function() {
        it('Deve retornar 404 e mensagem que api foi não encontrada', function() {
            res = {
                status: function(status) {
                    assert.equal(404, status);
                    return this;
                },
                json: function(json) {
                    assert.equal('A API requisitada não foi encontrado!', json.mensagem);
                    return this;
                }
            };
            controller(app).notFound(null, res);
        });
    });

    describe('#Signin', function() {

        var stubLogin = sinon.stub(app.services.user, 'login');
        it('Deve retornar 404 quando não passar senha', function() {
            var user = {
                body: {
                    email: 'teste@teste.com'
                }
            };
            res = {
                status: function(status) {
                    assert.equal(404, status);
                    return this;
                },
                json: function(json) {
                    assert.equal('data.senha', json.data[0].field);
                    assert.equal('is required', json.data[0].message);
                    return this;
                }
            };
            controller(app).signin(user, res);
            stubLogin.called.should.be.equal(false);
        });

        it('Deve retornar  404 quando não passar email', function() {
            var user = {
                body: {
                    senha: '123teste'
                }
            };
            res = {
                status: function(status) {
                    assert.equal(404, status);
                    return this;
                },
                json: function(json) {
                    assert.equal('data.email', json.data[0].field);
                    assert.equal('is required', json.data[0].message);
                    return this;
                }
            };
            controller(app).signin(user, res);
            stubLogin.called.should.be.equal(false);
        });

        it('Deve retornar  404 quando não passar email e senha', function() {
            var user = {
                body: {}
            };
            res = {
                status: function(status) {
                    assert.equal(404, status);
                    return this;
                },
                json: function(json) {
                    assert.equal('data.email', json.data[0].field);
                    assert.equal('is required', json.data[0].message);
                    assert.equal('data.senha', json.data[1].field);
                    assert.equal('is required', json.data[1].message);
                    return this;
                }
            };

            controller(app).signin(user, res);
            stubLogin.called.should.be.equal(false);
        });

        before(function() {
            stubLogin.returnsPromise().resolves('Não autorizado');
        });

        it('Deve retornar  401 quando usuário não for autorizado', function() {
            var user = {
                body: {
                    email: 'joao@gmail.com',
                    senha: '123mudar'
                }
            };
            res = {
                status: function(status) {
                    assert.equal(401, status);
                    return this;
                },
                json: function(json) {
                    assert.equal('Não autorizado' , json.mensagem);
                    return this;
                }
            };
            controller(app).signin(user, res);
            stubLogin.called.should.be.equal(true);
        });

        //Criação do objeto service de Mock
        var serviceMock_2 = {
            save: function(err, data) {},
            login: function(err, data) {}
        };

        var appMock_2 = {
            services: {
                user: serviceMock_2
            }
        };
        //stub simulando quando usuário conseguiu se autênticar
        var stubLogin_Ok = sinon.stub(appMock_2.services.user, 'login');

        before(function() {
            stubLogin_Ok.returnsPromise().resolves({nome: 'João'});
        });

        it('Deve retornar 200 quando conseguir realizar o login', function() {
            var user = {
                body: {
                    email: 'joao@gmail.com',
                    senha: '123mudar'
                }
            };
            res = {
                status: function(status) {
                    assert.equal(200, status);
                    return this;
                },
                json: function(json) {
                    assert.equal(true , (typeof json.data !== 'string'));
                    return this;
                }
            };
            controller(appMock_2).signin(user, res);
            stubLogin_Ok.called.should.be.equal(true);
        });

        before(function() {
            stubLogin_Ok.returnsPromise().rejects(new Error('Exception'));
        });
        it('Deve retornar 500 quando acontecer alguma exception', function() {

            var user = {
                body: {
                    email: 'joao@gmail.com',
                    senha: '123mudar'
                }
            };

            res = {
                status: function(status) {
                    assert.equal(500, status);
                    return this;
                },
                json: function(json) {
                    return this;
                }
            };
            controller(appMock_2).signin(user, res);
            stubLogin_Ok.called.should.be.equal(true);
        });

    });
    describe('#GetUser', function() {

        var stubGetUser = sinon.stub(app.services.user, 'getUser');

        it('Deve retornar status 401 e mensagem de não autorizado quando não passar o token', function() {
            var req = {
                headers: {}
            };
            res = {
                status: function(status) {
                    assert.equal(401, status);
                    return this;
                },
                json: function(json) {
                    assert.equal('Não autorizado', json.mensagem);
                    return this;
                }
            };
            controller(app).getUser(req, res);
            stubGetUser.called.should.be.equal(false);
        });
        it('Deve retornar status 401 e mensagem de não autorizado quando não passar o id', function() {
            var req = {
                headers: {
                    bearer: 'PDIDIN44493873ddddasDASD'
                },
                params : {}
            };
            res = {
                status: function(status) {
                    assert.equal(401, status);
                    return this;
                },
                json: function(json) {
                    assert.equal('Não autorizado', json.mensagem);
                    return this;
                }
            };
            controller(app).getUser(req, res);
            stubGetUser.called.should.be.equal(false);
        });

        before(function() {
            stubGetUser.returnsPromise().resolves(userMock);
        });
        it('Deve retornar status 200 quando conseguir recuperar os dados do usuário', function() {
            var req = {
                headers: {
                    bearer: 'PDIDIN44493873ddddasDASD'
                },
                params : {
                    id: '123456789'
                }
            };
            res = {
                status: function(status) {
                    assert.equal(200, status);
                    return this;
                },
                json: function(json) {
                    assert.equal(true , (typeof json.data !== 'string'));
                    return this;
                }
            };
            controller(app).getUser(req, res);
            stubGetUser.called.should.be.equal(true);
        });

        before(function() {
            stubGetUser.returnsPromise().rejects(new Error('Exception'));
        });
        it('Deve retornar 500 quando acontecer alguma exception', function() {

            var req = {
                headers: {
                    bearer: 'PDIDIN44493873ddddasDASD'
                },
                params : {
                    id: '123456789'
                }
            };
            res = {
                status: function(status) {
                    assert.equal(500, status);
                    return this;
                },
                json: function(json) {
                    return this;
                }
            };
            controller(app).getUser(req, res);
            stubGetUser.called.should.be.equal(true);
        });

    });

});
