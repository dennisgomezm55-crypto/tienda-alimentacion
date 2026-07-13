// index.js
// Punto de entrada del servidor. Aquí arranca la aplicación Express.

import {
  rutaNoEncontrada,
  errorServidor,
} from "./middlewares/error.middleware.js";
import productoRoutes from "./routes/producto.routes.js";
import authRoutes from "./routes/auth.routes.js";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import conectarDB from "./config/db.js";

// Cargamos las variables de entorno del archivo .env
dotenv.config();

// Conectamos con la base de datos MongoDB
conectarDB();

// Creamos la aplicación de Express
const app = express();

// Middlewares globales
app.use(cors()); // permite peticiones desde otro origen (el React)
app.use(express.json()); // permite recibir datos en formato JSON en el body

// Rutas de la API de productos. Todas cuelgan de /api/productos
app.use("/api/productos", productoRoutes);

// Rutas de autenticación. Cuelgan de /api/auth
app.use("/api/auth", authRoutes);

// Ruta de prueba para comprobar que el servidor responde
app.get("/", (req, res) => {
  res.send("API de la tienda funcionando correctamente");
});

// Leemos el puerto del .env, o usamos el 4000 por defecto
const PORT = process.env.PORT || 4000;

// Middlewares de error: SIEMPRE al final, después de todas las rutas
app.use(rutaNoEncontrada);
app.use(errorServidor);

// Arrancamos el servidor y lo ponemos a escuchar
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
