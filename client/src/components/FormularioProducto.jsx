// components/FormularioProducto.jsx
import { useState } from "react";
import { CATEGORIAS } from "../const/categorias.js";

const PRODUCTO_VACIO = {
  nombre: "",
  categoria: CATEGORIAS[0],
  precio: "",
  stock: "",
  descripcion: "",
  imagen: "",
  disponible: true,
};

function FormularioProducto({
  productoInicial = PRODUCTO_VACIO,
  onGuardar,
  cargando,
}) {
  const [form, setForm] = useState(productoInicial);

  const manejarCambio = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const manejarSubmit = (e) => {
    e.preventDefault();
    onGuardar({
      ...form,
      precio: Number(form.precio),
      stock: Number(form.stock),
    });
  };

  return (
    <form onSubmit={manejarSubmit}>
      <div className="campo-formulario">
        <label htmlFor="nombre">Nombre</label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          value={form.nombre}
          onChange={manejarCambio}
          required
        />
      </div>

      <div className="campo-formulario">
        <label htmlFor="categoria">Categoría</label>
        <select
          id="categoria"
          name="categoria"
          value={form.categoria}
          onChange={manejarCambio}
        >
          {CATEGORIAS.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="campo-formulario">
        <label htmlFor="precio">Precio (€)</label>
        <input
          id="precio"
          name="precio"
          type="number"
          step="0.01"
          min="0"
          value={form.precio}
          onChange={manejarCambio}
          required
        />
      </div>

      <div className="campo-formulario">
        <label htmlFor="stock">Stock</label>
        <input
          id="stock"
          name="stock"
          type="number"
          min="0"
          value={form.stock}
          onChange={manejarCambio}
          required
        />
      </div>

      <div className="campo-formulario">
        <label htmlFor="descripcion">Descripción</label>
        <input
          id="descripcion"
          name="descripcion"
          type="text"
          value={form.descripcion}
          onChange={manejarCambio}
        />
      </div>

      <div className="campo-formulario">
        <label htmlFor="imagen">URL de la imagen</label>
        <input
          id="imagen"
          name="imagen"
          type="text"
          value={form.imagen}
          onChange={manejarCambio}
        />
      </div>

      <div className="campo-checkbox">
        <input
          id="disponible"
          name="disponible"
          type="checkbox"
          checked={form.disponible}
          onChange={manejarCambio}
        />
        <label htmlFor="disponible">Disponible</label>
      </div>

      <button type="submit" disabled={cargando}>
        {cargando ? "Guardando..." : "Guardar producto"}
      </button>
    </form>
  );
}

export default FormularioProducto;
