// middlewares/error.middleware.js
// Middlewares para manejar errores globales de la API:
// rutas que no existen (404) y errores inesperados del servidor (500).

// Middleware 404: se ejecuta si ninguna ruta anterior atendió la petición
export const rutaNoEncontrada = (req, res) => {
  res.status(404).json({ mensaje: `Ruta no encontrada: ${req.originalUrl}` });
};

// Middleware 500: cazador global de errores.
// Express lo reconoce como manejador de errores por tener 4 parámetros (err primero).
export const errorServidor = (err, req, res, next) => {
  console.error("Error inesperado:", err.message);
  res.status(500).json({ mensaje: "Error interno del servidor" });
};
