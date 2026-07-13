// services/auth.service.js
// Funciones que se comunican con los endpoints de autenticación de la API.

import { API_URL } from "../const/api.js";

// Hace login contra la API. Recibe el identificador (usuario o email)
// y la contraseña, y devuelve los datos de la respuesta (token incluido).
export const login = async (identificador, password) => {
  const respuesta = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ identificador, password }),
  });

  const datos = await respuesta.json();

  // Si la API respondió con error (401, 500...), lanzamos el mensaje
  // para que quien llame a esta función lo capture con try/catch
  if (!respuesta.ok) {
    throw new Error(datos.mensaje || "Error en el login");
  }

  return datos;
};
