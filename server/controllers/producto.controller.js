// controllers/producto.controller.js
// Contiene la lógica de las operaciones CRUD sobre los productos.

import Producto from "../models/producto.model.js";

// CREATE - Crear un nuevo producto
// Recibe los datos del producto en el body de la petición.
export const crearProducto = async (req, res) => {
  try {
    // Creamos una nueva instancia del modelo con los datos recibidos
    const nuevoProducto = new Producto(req.body);
    // Lo guardamos en la base de datos
    const productoGuardado = await nuevoProducto.save();
    // Respondemos con el producto creado y el código 201
    res.status(201).json(productoGuardado);
  } catch (error) {
    // Si los datos no cumplen el esquema , entra aquí
    res
      .status(400)
      .json({ mensaje: "Error al crear el producto", error: error.message });
  }
};

// READ - Obtener todos los productos
export const obtenerProductos = async (req, res) => {
  try {
    // Buscamos todos los productos de la colección
    const productos = await Producto.find();

    // Respondemos con la lista y el código 200
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener los productos",
      error: error.message,
    });
  }
};

// READ - Obtener un solo producto por su id
export const obtenerProductoPorId = async (req, res) => {
  try {
    // Buscamos un producto por el id que llega en la URL
    const producto = await Producto.findById(req.params.id);
    // Si no existe, avisamos con un 404
    if (!producto) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }
    res.status(200).json(producto);
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al obtener el producto", error: error.message });
  }
};

// UPDATE - Actualizar un producto existente
export const actualizarProducto = async (req, res) => {
  try {
    // Buscamos por id y actualizamos con los datos del body.
    const productoActualizado = await Producto.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );
    if (!productoActualizado) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }
    res.status(200).json(productoActualizado);
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al actualizar el producto",
      error: error.message,
    });
  }
};

// DELETE - Eliminar un producto
export const eliminarProducto = async (req, res) => {
  try {
    // Buscamos por id y lo borramos
    const productoEliminado = await Producto.findByIdAndDelete(req.params.id);
    if (!productoEliminado) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }
    res.status(200).json({ mensaje: "Producto eliminado correctamente" });
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al eliminar el producto", error: error.message });
  }
};
