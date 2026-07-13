// context/AuthContext.jsx
//Guarda la sesion del usuario (token y usuario) , y lo proporciona a toda la app

import { createContext, useContext, useState } from "react";

// Creamos el contexto
const AuthContext = createContext();

// Componente proveedor: envuelve la app y reparte la sesión a todos
export function AuthProvider({ children }) {
  // Al arrancar, intentamos recuperar la sesión guardada en localStorage.
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [usuario, setUsuario] = useState(() => {
    const guardado = localStorage.getItem("usuario");
    return guardado ? JSON.parse(guardado) : null;
  });

  // Inicia la sesión: guarda token y usuario en el estado y en localStorage
  const iniciarSesion = (datosLogin) => {
    setToken(datosLogin.token);
    setUsuario(datosLogin.usuario);
    localStorage.setItem("token", datosLogin.token);
    localStorage.setItem("usuario", JSON.stringify(datosLogin.usuario));
  };

  // Cierra la sesión: limpia el estado y el localStorage
  const cerrarSesion = () => {
    setToken(null);
    setUsuario(null);
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
  };

  return (
    <AuthContext.Provider
      value={{ token, usuario, iniciarSesion, cerrarSesion }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook personalizado para consumir el contexto cómodamente desde cualquier componente
export function useAuth() {
  return useContext(AuthContext);
}
