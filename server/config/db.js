// config/db.js
// Función encargada de conectar la aplicación con la base de datos MongoDB (Atlas).

import mongoose from "mongoose";

// Función asíncrona que establece la conexión con MongoDB.
const conectarDB = async () => {
  try {
    // Intentamos conectar usando la URI guardada en las variables de entorno
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Conexión a MongoDB establecida correctamente");
  } catch (error) {
    // Si falla la conexión, mostramos el error y detenemos la aplicación
    console.error("Error al conectar con MongoDB:", error.message);
    process.exit(1); //indica que el proceso terminó por un error
  }
};

export default conectarDB;
