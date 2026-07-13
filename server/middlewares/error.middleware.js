// middlewares/error.middleware.js
// Middlewares para manejar errores globales de la API:rutas que no existen y errores inesperados del servidor
export const rutaNoEncontrada = (req, res) => {
  res.status(404).json({ mensaje: `Ruta no encontrada: ${req.originalUrl}` });
};

export const errorServidor = (err, req, res, next) => {
  console.error("Error inesperado:", err.message);
  res.status(500).json({ mensaje: "Error interno del servidor" });
};
