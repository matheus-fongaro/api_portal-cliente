"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cadastroRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const models_1 = require("../models");
const cadastroRouter = express_1.default.Router();
exports.cadastroRouter = cadastroRouter;
cadastroRouter.post('/novo-usuario', express_validator_1.checkSchema({
    razao_social: {
        exists: true,
        in: ['body'],
        errorMessage: "Razão social inválida!",
        isAlphanumeric: true,
        isLength: {
            options: { min: 6 },
            errorMessage: "Razão social deve ter no mínimo 6 caracteres!"
        }
    },
    email: {
        exists: true,
        in: ['body'],
        errorMessage: "Email inválido!",
        isEmail: true
    },
    senha: {
        exists: true,
        in: ['body'],
        errorMessage: "Senha inválida!",
        isLength: {
            options: { min: 6 },
            errorMessage: "Senha deve ter no mínimo 6 caracteres!"
        }
    },
    codCliente: {
        in: ['body'],
        errorMessage: "Código do cliente inválido!",
        isInt: true,
        exists: true
    },
    ehAdmin: {
        in: ['body'],
        errorMessage: "Opção inválida",
        isBoolean: true
    }
}), (req, res) => {
    const usuario = new models_1.usuarioModel(req.body);
    usuario.save((err, doc) => {
        if (err) {
            res.status(500).send(`Erro ao criar usuário: ${err}`);
        }
        else {
            res.status(200).send(`Usuário criado com sucesso, novo id:  ${doc._id}.`);
        }
        ;
    });
});
