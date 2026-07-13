// pages/Login.jsx
// Página de inicio de sesión. Muestra el formulario y llama a la API.

import { useState } from "react";
import { login } from "../services/auth.service.js";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

function Login() {
  const { iniciarSesion } = useAuth();
  const navigate = useNavigate();
  // Estados del formulario: lo que el usuario escribe en cada campo
  const [identificador, setIdentificador] = useState("");
  const [password, setPassword] = useState("");

  // Estado para mostrar errores del login en pantalla
  const [error, setError] = useState("");
  // Estado de carga: true mientras esperamos la respuesta de la API
  const [cargando, setCargando] = useState(false);

  // Se ejecuta al enviar el formulario
  const manejarSubmit = async (e) => {
    // Evitamos que el navegador recargue la página
    e.preventDefault();
    setError("");
    setCargando(true);

    try {
      const datos = await login(identificador, password);
      iniciarSesion(datos);
      navigate("/productos");
    } catch (err) {
      // El mensaje que lanzó el servicio
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="pagina-login">
      <div className="tarjeta-formulario">
        <h1>Alimentación Miguel</h1>
        <form onSubmit={manejarSubmit}>
          <div className="campo-formulario">
            <label htmlFor="identificador">Usuario o email</label>
            <input
              id="identificador"
              type="text"
              value={identificador}
              onChange={(e) => setIdentificador(e.target.value)}
              required
            />
          </div>

          <div className="campo-formulario">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="mensaje-error">{error}</p>}

          <button type="submit" disabled={cargando}>
            {cargando ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
