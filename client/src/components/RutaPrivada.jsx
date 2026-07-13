// components/RutaPrivada.jsx
// Envuelve páginas que requieren sesión iniciada.

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function RutaPrivada({ children }) {
  const { token } = useAuth();

  // Si no hay token, redirigimos a la raíz
  if (!token) {
    return <Navigate to="/" />;
  }

  // Si hay token, mostramos la página que nos hayan pasado
  return children;
}

export default RutaPrivada;
