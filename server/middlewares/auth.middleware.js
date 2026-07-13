// middlewares/auth.middleware.js
// Middleware que protege rutas

import jwt from "jsonwebtoken";

const verificarToken = (req, res, next) => {
  //El token viene en la cabecera Authorization con el formato:
  const authHeader = req.headers.authorization;

  //Si no hay cabecera o no empieza por "Bearer ", cortamos aquí
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ mensaje: "Acceso denegado: falta el token" });
  }

  //Separamos la palabra "Bearer" del token en sí
  const token = authHeader.split(" ")[1];

  try {
    //Verificamos el token con nuestro secret.
    const datosToken = jwt.verify(token, process.env.JWT_SECRET);

    //Guardamos los datos del usuario en la petición, por si el controlador los necesita después
    req.usuario = datosToken;

    //Todo correcto: dejamos pasar la petición al controlador
    next();
  } catch (error) {
    //oken inválido o caducado
    return res.status(401).json({ mensaje: "Token inválido o expirado" });
  }
};

export default verificarToken;
