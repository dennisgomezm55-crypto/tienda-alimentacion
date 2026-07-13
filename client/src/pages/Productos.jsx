// pages/Productos.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import {
  obtenerProductos,
  eliminarProducto,
} from "../services/producto.service.js";

function Productos() {
  const { usuario, token, cerrarSesion } = useAuth();
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const cargarProductos = async () => {
    try {
      setCargando(true);
      const datos = await obtenerProductos(token);
      setProductos(datos);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const manejarBorrar = async (id) => {
    const confirmar = window.confirm(
      "¿Seguro que quieres eliminar este producto?",
    );
    if (!confirmar) return;
    try {
      await eliminarProducto(id, token);
      setProductos(productos.filter((p) => p._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="pagina">
      <header className="cabecera">
        <div>
          <h1>Productos de la tienda</h1>
          <p className="texto-secundario">
            Bienvenido, {usuario?.nombreUsuario}
          </p>
        </div>
        <div className="acciones-cabecera">
          <Link to="/productos/nuevo" className="boton boton-primario">
            Nuevo producto
          </Link>
          <button onClick={cerrarSesion} className="boton-secundario">
            Cerrar sesión
          </button>
        </div>
      </header>

      {error && <p className="mensaje-error">{error}</p>}

      {cargando ? (
        <p>Cargando productos...</p>
      ) : productos.length === 0 ? (
        <p>No hay productos todavía.</p>
      ) : (
        <ul className="lista-productos">
          {productos.map((producto) => (
            <li key={producto._id} className="producto-item">
              <div className="producto-info">
                <strong>{producto.nombre}</strong>
                <span className="texto-secundario">
                  {producto.categoria} — {producto.precio}€
                </span>
              </div>
              <div className="producto-acciones">
                <Link
                  to={`/productos/${producto._id}/editar`}
                  className="boton boton-secundario"
                >
                  Editar
                </Link>
                <button
                  onClick={() => manejarBorrar(producto._id)}
                  className="boton-peligro"
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Productos;
