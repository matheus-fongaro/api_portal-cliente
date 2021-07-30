import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import {  pedidosRouter } from "./routes"
import axios from 'axios';
import * as admin from 'firebase-admin';
import csurf from 'csurf';

const google_credentials = require('./assets/firebaseSDK/chave_firebase.json');
admin.initializeApp({
  credential: admin.credential.cert(google_credentials),
  databaseURL: process.env.DATABASE_URL
});

axios.defaults.baseURL = process.env.API_URL;
axios.defaults.auth = {
  username: process.env.API_USER,
  password: process.env.API_PASS
};

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

var csrfProtection = csurf({ cookie: true });

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};
app.use(csrfProtection);
app.use(cors(corsOptions));
app.use('/api/pedidos', pedidosRouter);
app.get('/teste', (req: express.Request, res: express.Response) => {
  return res.json({ 'mensagem': 'teste' });
})

const port = process.env.PORT || 3000;
app.listen(port as number, '0.0.0.0', (): void => {
  console.log(`Servidor está aberto na porta ${port}`);
});