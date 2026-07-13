// App.jsx
// Componente principal. Define las rutas de la aplicación.

//imports.
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Productos from "./pages/Productos.jsx";
import RutaPrivada from "./components/RutaPrivada.jsx";
import CrearProducto from "./pages/CrearProducto.jsx";
import EditarProducto from "./pages/EditarProducto.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta pública: el login */}
        <Route path="/" element={<Login />} />

        {/* Ruta privada: solo accesible con sesión iniciada */}
        <Route
          path="/productos"
          element={
            <RutaPrivada>
              <Productos />
            </RutaPrivada>
          }
        />
        <Route //Ruta para la creacion de productos
          path="/productos/nuevo"
          element={
            <RutaPrivada>
              <CrearProducto />
            </RutaPrivada>
          }
        />
        <Route // Ruta para la edicion de productos.
          path="/productos/:id/editar"
          element={
            <RutaPrivada>
              <EditarProducto />
            </RutaPrivada>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
