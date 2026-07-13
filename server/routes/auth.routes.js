// routes/auth.routes.js
// Rutas de autenticación: registro y login de usuarios.

import { Router } from "express";
import {
  registrarUsuario,
  loginUsuario,
} from "../controllers/auth.controller.js";

const router = Router();

// POST /api/auth/registro → crear un nuevo usuario
router.post("/registro", registrarUsuario);

// POST /api/auth/login → iniciar sesión y recibir el token
router.post("/login", loginUsuario);

export default router;
