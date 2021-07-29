import express from 'express';
import { check, validationResult } from 'express-validator';
import axios from 'axios';
import { firebase_auth } from '../middlewares/autenticacao';
import cors from 'cors';


const pedidosRouter = express.Router();

pedidosRouter.use(firebase_auth);
pedidosRouter.use(cors());

// verifica se há notas em aberto para o cliente
pedidosRouter.get('/em-aberto',
  check('codCliente')
    .isInt().withMessage('O id precisa ser um número inteiro!'),
  (req: express.Request, res: express.Response) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      return res.status(400).json({ erro: erros });
    }

    const { codCliente } = req.query;
    axios.get('/titulos/em-aberto', {
      params: {
        codCliente: codCliente
      }
    })
      .then(response => {
        return res.status(200).json(response.data);
      })
      .catch(error => {
        return res.status(400).json({
          mensagem: "Erro na requisição do servidor da API",
          erro: error});
      });
  });

// retorna os títulos em aberto do cliente
pedidosRouter.get('/titulos-abertos',
  check('codCliente')
    .isInt().withMessage('O código do cliente é obrigatório e precisa ser do tipo inteiro'),
  (req: express.Request, res: express.Response) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      return res.status(400).json({ erro: erros });
    }

    const codCliente = req.query.codCliente;
    axios.get('/titulos/titulos-abertos', {
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
          mensagem: "Erro na requisição do servidor da API",
          erro: error});
      });
  });

// retorna a lista de títulos pagos do cliente
pedidosRouter.get('/titulos-pagos',
  check('codCliente')
    .isInt().withMessage('O código do cliente é obrigatório e precisa ser do tipo inteiro'),
  (req: express.Request, res: express.Response) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      return res.status(400).json(erros);
    }

    const codCliente = req.query.codCliente;
    axios.get('/titulos/titulos-pagos', {
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
          mensagem: "Erro na requisição do servidor da API",
          erro: error});
      });
  });

// retorna a lista de pedidos do cliente
pedidosRouter.get('/listar',
  check('codCliente')
    .isInt().withMessage('O código do cliente é obrigatório e precisa ser do tipo inteiro'),
  (req: express.Request, res: express.Response) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      return res.status(400).json(erros);
    }

    const codCliente = req.query.codCliente;
    axios.get('/titulos/listar', {
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
        return res.status(400).json({
          mensagem: "Erro na requisição do servidor da API",
          erro: error});
      });
  });

// retorna a lista de itens do pedido
pedidosRouter.get('/itens-pedido',
  check('codPedido')
    .isInt().withMessage('O código do pedido é obrigatório e precisa ser do tipo inteiro'),
  (req: express.Request, res: express.Response) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      return res.status(400).json(erros);
    }

    const codPedido = req.query.codPedido;
    axios.get('/titulos/itens-pedido', {
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
        return res.status(400).json({
          mensagem: "Erro na requisição do servidor da API",
          erro: error});
      });
  });

export { pedidosRouter };