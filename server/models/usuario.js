'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Usuario = new Schema({
    id: { type: mongoose.Schema.ObjectId, required: false },
    nome: { type: String, required: true },
    email: { type: String, required: true, index: {unique:true} },
    senha: { type: String, required: true },
    telefones: [{ numero: { type: Number }, ddd: { type: Number } }],
    data_criacao: { type: Date, default: Date.now, required: false },
    data_atualizacao: { type: Date, default: Date.now, required: true },
    ultimo_login: { type: Date, default: Date.now, required: false },
    token:{ type: String, required: false }
},{collection : 'usuario'});

module.exports = function() {
  return mongoose.model('usuario', Usuario);
};
