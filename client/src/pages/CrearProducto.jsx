// pages/CrearProducto.jsx
// Página que muestra el formulario para dar de alta un nuevo producto.

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { crearProducto } from "../services/producto.service.js";
import FormularioProducto from "../components/FormularioProducto.jsx";

function CrearProducto() {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const manejarGuardar = async (datosProducto) => {
    setError("");
    setCargando(true);
    try {
      await crearProducto(datosProducto, token);
      // Al terminar, volvemos al listado
      navigate("/productos");
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="pagina">
      <div className="tarjeta-formulario">
        <h1>Nuevo producto</h1>
        {error && <p className="mensaje-error">{error}</p>}
        <FormularioProducto onGuardar={manejarGuardar} cargando={cargando} />
      </div>
    </div>
  );
}

export default CrearProducto;
