// components/RutaPrivada.jsx
// Envuelve páginas que requieren sesión iniciada.
// Si no hay token, redirige a Login en vez de mostrar la página.

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function RutaPrivada({ children }) {
  const { token } = useAuth();

  // Si no hay token, redirigimos a la raíz (Login)
  if (!token) {
    return <Navigate to="/" />;
  }

  // Si hay token, mostramos la página que nos hayan pasado
  return children;
}

export default RutaPrivada;
