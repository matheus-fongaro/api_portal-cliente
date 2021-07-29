"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuarioModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const usuario_model_1 = require("./usuario.model");
Object.defineProperty(exports, "usuarioModel", { enumerable: true, get: function () { return usuario_model_1.usuarioModel; } });
mongoose_1.default.connect("mongodb+srv://matiozg:185478@tkcluster.e1grj.mongodb.net/nlw_api?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
