// services/producto.service.js
// Funciones que se comunican con los endpoints de productos de la API.
// Todas requieren el token, porque las rutas están protegidas.

import { API_URL } from "../const/api.js";

// Función auxiliar: construye las cabeceras con el token incluido.
// La reutilizamos en todas las peticiones para no repetir código.
const cabecerasConToken = (token) => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
});

// READ - Obtener todos los productos
export const obtenerProductos = async (token) => {
  const respuesta = await fetch(`${API_URL}/productos`, {
    method: "GET",
    headers: cabecerasConToken(token),
  });

  const datos = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(datos.mensaje || "Error al obtener los productos");
  }

  return datos;
};

// DELETE - Eliminar un producto por su id
export const eliminarProducto = async (id, token) => {
  const respuesta = await fetch(`${API_URL}/productos/${id}`, {
    method: "DELETE",
    headers: cabecerasConToken(token),
  });

  const datos = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(datos.mensaje || "Error al eliminar el producto");
  }

  return datos;
};
// CREATE - Crear un nuevo producto
export const crearProducto = async (producto, token) => {
  const respuesta = await fetch(`${API_URL}/productos`, {
    method: "POST",
    headers: cabecerasConToken(token),
    body: JSON.stringify(producto),
  });

  const datos = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(datos.mensaje || "Error al crear el producto");
  }

  return datos;
};

// UPDATE - Actualizar un producto existente
export const actualizarProducto = async (id, producto, token) => {
  const respuesta = await fetch(`${API_URL}/productos/${id}`, {
    method: "PUT",
    headers: cabecerasConToken(token),
    body: JSON.stringify(producto),
  });

  const datos = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(datos.mensaje || "Error al actualizar el producto");
  }

  return datos;
};
// READ - Obtener un solo producto por su id
export const obtenerProductoPorId = async (id, token) => {
  const respuesta = await fetch(`${API_URL}/productos/${id}`, {
    method: "GET",
    headers: cabecerasConToken(token),
  });

  const datos = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(datos.mensaje || "Error al obtener el producto");
  }

  return datos;
};
