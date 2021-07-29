"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuarioModel = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    razao_social: { type: String, required: true },
    email: { type: String, required: true },
    senha: { type: String, required: true },
    codCliente: { type: Number, required: true },
    ehAdmin: { type: Boolean, default: false },
    criadoEm: { type: Date, default: Date.now },
    atualizadoEm: { type: Date, default: Date.now }
});
const usuarioModel = mongoose_1.model("Usuario", schema);
exports.usuarioModel = usuarioModel;
