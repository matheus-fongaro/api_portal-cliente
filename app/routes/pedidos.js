"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pedidosRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const axios_1 = __importDefault(require("axios"));
const autenticacao_1 = require("../middlewares/autenticacao");
const pedidosRouter = express_1.default.Router();
exports.pedidosRouter = pedidosRouter;
pedidosRouter.use(autenticacao_1.firebase_auth);
pedidosRouter.get('/em-aberto', express_validator_1.check('id')
    .isInt().withMessage('O id precisa ser um número inteiro!'), (req, res) => {
    const erros = express_validator_1.validationResult(req);
    if (!erros.isEmpty()) {
        return res.status(400).json({ erro: erros });
    }
    const id = req.query.id;
    axios_1.default.get('/titulos/em-aberto', {
        params: {
            id: id,
            filter: req.params.filter || '',
            page: req.params.page || 0,
            size: req.params.size || 25,
            sort: req.params.sort || ''
        }
    })
        .then(response => {
        return res.status(200).json(response.data);
    })
        .catch(error => {
        return res.status(400).json("Erro na requisição do servidor da API");
    });
});
pedidosRouter.get('/titulos-abertos', express_validator_1.check('codCliente')
    .isInt().withMessage('O código do cliente é obrigatório e precisa ser do tipo inteiro'), (req, res) => {
    const erros = express_validator_1.validationResult(req);
    if (!erros.isEmpty()) {
        return res.status(400).json({ erro: erros });
    }
    const codCliente = req.query.codCliente;
    axios_1.default.get('/titulos/titulos-abertos', {
        params: {
            codCliente: codCliente,
            filter: req.query.filter || '',
            page: req.query.page || 0,
            size: req.query.size || 25,
            sort: req.query.sort || ''
        }
    })
        .then(response => {
        return res.status(200).json(response.data);
    })
        .catch(error => {
        return res.status(400).json({
            erro: "Erro na requisição do servidor da API"
        });
    });
});
pedidosRouter.get('/titulos-pagos', express_validator_1.check('codCliente')
    .isInt().withMessage('O código do cliente é obrigatório e precisa ser do tipo inteiro'), (req, res) => {
    const erros = express_validator_1.validationResult(req);
    if (!erros.isEmpty()) {
        return res.status(400).json(erros);
    }
    const codCliente = req.query.codCliente;
    axios_1.default.get('/titulos/titulos-pagos', {
        params: {
            codCliente: codCliente,
            filter: req.query.filter || '',
            page: req.query.page || 0,
            size: req.query.size || 25,
            sort: req.query.sort || ''
        }
    })
        .then(response => {
        return res.status(200).json(response.data);
    })
        .catch(error => {
        return res.status(400).json({ mensagem: "Erro na requisição do servidor da API" });
    });
});
pedidosRouter.get('/listar', express_validator_1.check('codCliente')
    .isInt().withMessage('O código do cliente é obrigatório e precisa ser do tipo inteiro'), (req, res) => {
    const erros = express_validator_1.validationResult(req);
    if (!erros.isEmpty()) {
        return res.status(400).json(erros);
    }
    const codCliente = req.query.codCliente;
    axios_1.default.get('/titulos/listar', {
        params: {
            codCliente: codCliente,
            filter: req.query.filter || '',
            page: req.query.page || 0,
            size: req.query.size || 25,
            sort: req.query.sort || ''
        }
    })
        .then(response => {
        return res.status(200).json(response.data);
    })
        .catch(error => {
        console.log(error);
        return res.status(400).json({ mensagem: "Erro na requisição do servidor da API" });
    });
});
pedidosRouter.get('/itens-pedido', express_validator_1.check('codPedido')
    .isInt().withMessage('O código do pedido é obrigatório e precisa ser do tipo inteiro'), (req, res) => {
    const erros = express_validator_1.validationResult(req);
    if (!erros.isEmpty()) {
        return res.status(400).json(erros);
    }
    const codPedido = req.query.codPedido;
    axios_1.default.get('/titulos/itens-pedido', {
        params: {
            codPedido: codPedido,
            filter: req.query.filter || '',
            page: req.query.page || 0,
            size: req.query.size || 25,
            sort: req.query.sort || ''
        }
    })
        .then(response => {
        return res.status(200).json(response.data);
    })
        .catch(error => {
        return res.status(500).json({ mensagem: "Erro na requisição do servidor da API" });
    });
});
