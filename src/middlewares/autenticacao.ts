import { Request, Response, NextFunction } from "express";
import * as admin from "firebase-admin"

export async function firebase_auth(req: Request, res: Response, next: NextFunction) {
  // verifica se o token do usuário é válido no firebase
  const { authorization } = req.headers;
  if ( authorization as string === null || authorization as string === undefined) {
    return res.status(401).json({
      message: "Não foi possível autenticar o usuário. Token inválido.",
    });
  }
  try {
    let t = authorization as string
    let token = t.split(" ")[1];
    const _decodedToken = await admin.auth().verifyIdToken(token as string);
    return next();
  } catch (error) {
    return res.status(401).json({
      mensagem: "Erro na autenticação do usuário",
      erro: error
    });
  }
}