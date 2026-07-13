// pages/EditarProducto.jsx
// Página que carga un producto existente y muestra el formulario para editarlo.

// imports
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import {
  obtenerProductoPorId,
  actualizarProducto,
} from "../services/producto.service.js";
import FormularioProducto from "../components/FormularioProducto.jsx";

function EditarProducto() {
  const { id } = useParams(); // saca el :id de la URL
  const { token } = useAuth();
  const navigate = useNavigate();

  // El producto que estamos editando
  const [producto, setProducto] = useState(null);
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  // Al montar la página, cargamos el producto real desde la API
  useEffect(() => {
    const cargarProducto = async () => {
      try {
        const datos = await obtenerProductoPorId(id, token);
        setProducto(datos);
      } catch (err) {
        setError(err.message);
      }
    };
    cargarProducto();
  }, [id]); // se re-ejecuta si el id de la URL cambia

  const manejarGuardar = async (datosProducto) => {
    setError("");
    setCargando(true);
    try {
      await actualizarProducto(id, datosProducto, token);
      navigate("/productos");
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  // Mientras no tengamos el producto cargado, no mostramos el formulario
  if (!producto) {
    return <p>Cargando producto...</p>;
  }

  return (
    <div className="pagina">
      <div className="tarjeta-formulario">
        <h1>Editar Producto</h1>
        {error && <p className="mensaje-error">{error}</p>}
        <FormularioProducto onGuardar={manejarGuardar} cargando={cargando} />
      </div>
    </div>
  );
}

export default EditarProducto;
