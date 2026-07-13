// models/usuario.model.js
// Esquema que define la estructura de un usuario del sistema.

import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
  // Nombre de usuario, obligatorio y único (no puede haber dos iguales)
  nombreUsuario: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  // Email del usuario, obligatorio y único
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true, // se guarda siempre en minúsculas
  },

  // Contraseña hasheada (aquí nunca llega la contraseña real)
  password: {
    type: String,
    required: true,
  },

  // Fecha de creación de la cuenta
  fechaRegistro: {
    type: Date,
    default: Date.now,
  },
});

const Usuario = mongoose.model("Usuario", usuarioSchema);

export default Usuario;
