// controllers/auth.controller.js
// Lógica de autenticación: registro de usuarios y login.
// Usa bcrypt para hashear contraseñas y JWT para generar tokens de sesión.

import Usuario from "../models/usuario.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// REGISTRO - Crear un nuevo usuario con la contraseña hasheada
export const registrarUsuario = async (req, res) => {
  try {
    const { nombreUsuario, email, password } = req.body;

    // Comprobamos que no exista ya un usuario con ese email o nombre
    const usuarioExistente = await Usuario.findOne({
      $or: [{ email }, { nombreUsuario }],
    });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: "El usuario o email ya existe" });
    }

    // Hasheamos la contraseña. El 10 son las "rondas de sal":
    // cuántas veces se aplica el algoritmo (10 es el valor estándar).
    const passwordHasheada = await bcrypt.hash(password, 10);

    // Creamos el usuario guardando el hash, nunca la contraseña real
    const nuevoUsuario = new Usuario({
      nombreUsuario,
      email,
      password: passwordHasheada,
    });
    await nuevoUsuario.save();

    // Respondemos sin incluir la contraseña hasheada
    res.status(201).json({
      mensaje: "Usuario registrado correctamente",
      usuario: { nombreUsuario, email },
    });
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al registrar el usuario", error: error.message });
  }
};

// LOGIN - Comprobar credenciales y devolver un token JWT
export const loginUsuario = async (req, res) => {
  try {
    const { identificador, password } = req.body;

    // Buscamos al usuario por nombre de usuario O por email,
    // porque el PDF pide que el login acepte cualquiera de los dos
    const usuario = await Usuario.findOne({
      $or: [{ email: identificador }, { nombreUsuario: identificador }],
    });

    // Si no existe el usuario, error 401 (no autorizado).
    // Damos un mensaje genérico a propósito: no conviene revelar
    // si lo que falla es el usuario o la contraseña.
    if (!usuario) {
      return res.status(401).json({ mensaje: "Credenciales incorrectas" });
    }

    // Comparamos la contraseña recibida con el hash guardado
    const passwordCorrecta = await bcrypt.compare(password, usuario.password);
    if (!passwordCorrecta) {
      return res.status(401).json({ mensaje: "Credenciales incorrectas" });
    }

    // Credenciales correctas: generamos el token JWT firmado con el secret.
    // Dentro del token guardamos el id y el nombre del usuario.
    const token = jwt.sign(
      { id: usuario._id, nombreUsuario: usuario.nombreUsuario },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }, // el token caduca a las 2 horas
    );

    res.status(200).json({
      mensaje: "Login correcto",
      token,
      usuario: { nombreUsuario: usuario.nombreUsuario, email: usuario.email },
    });
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error en el login", error: error.message });
  }
};
