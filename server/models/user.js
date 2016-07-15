'use strict';
var mongoose = require('mongoose'),
    Promise = require('bluebird');

var schema = new mongoose.Schema({
    id: { type: mongoose.Schema.ObjectId, required: false },
    nome: { type: String, required: true },
    email: { type: String, required: true, index: {unique:true} },
    senha: { type: String, required: true },
    telefones: [{ numero: { type: Number }, ddd: { type: Number } }], required: false,
    data_criacao: { type: Date, default: Date.now, required: false },
    data_atualizacao: { type: Date, default: Date.now, required: true },
    ultimo_login: { type: Date, default: Date.now, required: false },
    token:{ type: String, required: false }
},{collection : 'user'});

module.exports = function() {
  var User = mongoose.model('user', schema);
  Promise.promisifyAll(User);
  Promise.promisifyAll(User.prototype);
  return User;
};
