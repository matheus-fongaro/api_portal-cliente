"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes");
const axios_1 = __importDefault(require("axios"));
const admin = __importStar(require("firebase-admin"));
const google_credentials = require('./assets/firebaseSDK/chave_firebase.json');
admin.initializeApp({
    credential: admin.credential.cert(google_credentials),
    databaseURL: "https://bernardo-area-cliente-default-rtdb.firebaseio.com"
});
axios_1.default.defaults.baseURL = 'http://192.168.0.70:57772/portalcli/api';
axios_1.default.defaults.auth = {
    username: 'matio',
    password: '1854'
};
const app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cookie_parser_1.default());
app.use('/api/cadastro', routes_1.cadastroRouter);
app.use('/api/pedidos', routes_1.pedidosRouter);
app.get('/teste', (req, res) => {
    return res.json({ 'mensagem': 'teste' });
});
app.listen(21133, () => {
    console.log(`Servidor está aberto na porta 21133`);
});
