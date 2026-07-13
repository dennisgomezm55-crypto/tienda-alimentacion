// routes/producto.routes.js
// Define las rutas (endpoints) de la API para los productos.

import verificarToken from "../middlewares/auth.middleware.js";
import { Router } from "express";
import {
  crearProducto,
  obtenerProductos,
  obtenerProductoPorId,
  actualizarProducto,
  eliminarProducto,
} from "../controllers/producto.controller.js";

// Creamos una instancia del router de Express
const router = Router();

// CREATE - POST /api/productos → crear un producto nuevo
router.post("/", verificarToken, crearProducto);

// READ - GET /api/productos → obtener todos los productos
router.get("/", verificarToken, obtenerProductos);

// READ - GET /api/productos/:id → obtener un producto por su id
router.get("/:id", verificarToken, obtenerProductoPorId);

// UPDATE - PUT /api/productos/:id → actualizar un producto existente
router.put("/:id", verificarToken, actualizarProducto);

// DELETE - DELETE /api/productos/:id → eliminar un producto
router.delete("/:id", verificarToken, eliminarProducto);

export default router;
