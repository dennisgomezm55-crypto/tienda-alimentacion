// models/producto.model.js
// Esquema que define la estructura de un producto en la tienda de alimentación.
// Cada documento de la colección "productos" seguirá esta forma.

import mongoose from "mongoose";

// Definimos el esquema con los tipos de cada campo
const productoSchema = new mongoose.Schema({
  // Nombre del producto, texto obligatorio (ej: "Pan de pueblo")
  nombre: {
    type: String,
    required: true,
    trim: true, // quita espacios sobrantes al principio y al final
  },

  // Categoría a la que pertenece (panadería, chuches, refrescos...)
  categoria: {
    type: String,
    required: true,
    trim: true,
    enum: [
      "panadería",
      "chucherías",
      "refrescos",
      "bebidas",
      "conservas",
      "lácteos",
      "otros",
    ],
  },

  // Precio en euros. Number para poder hacer cálculos si hiciera falta
  precio: {
    type: Number,
    required: true,
    min: 0, // no permitimos precios negativos
  },

  // Unidades disponibles en la tienda
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },

  // Indica si el producto está a la venta o agotado
  disponible: {
    type: Boolean,
    default: true,
  },

  // Descripción corta del producto
  descripcion: {
    type: String,
    trim: true,
  },

  // URL de la imagen del producto
  imagen: {
    type: String,
    trim: true,
  },

  // Fecha en la que se dio de alta el producto.
  // Se rellena sola con la fecha actual al crear el documento.
  fechaAlta: {
    type: Date,
    default: Date.now,
  },
});

// Creamos el modelo a partir del esquema y lo exportamos.
// Mongoose creará automáticamente la colección "productos" en la BBDD.
const Producto = mongoose.model("Producto", productoSchema);

export default Producto;
