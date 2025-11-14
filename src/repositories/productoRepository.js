const fs = require("fs");
const path = require("path");
const file = path.join(__dirname, "../data/productos.json");

function leer() {
  if (!fs.existsSync(file)) return [];
  const raw = fs.readFileSync(file, "utf8");
  return JSON.parse(raw || "[]");
}

function escribir(data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

exports.obtenerTodos = () => leer();

exports.buscarPorId = (id) => leer().find((p) => p.id == id);

exports.crear = (producto) => {
  const datos = leer();
  producto.id = datos.length ? datos[datos.length - 1].id + 1 : 1;
  producto.creado_at = new Date().toISOString();
  datos.push(producto);
  escribir(datos);
  return producto;
};

exports.actualizar = (id, cambios) => {
  const datos = leer();
  const idx = datos.findIndex((p) => p.id == id);
  if (idx === -1) return null;

  datos[idx] = { ...datos[idx], ...cambios };
  escribir(datos);
  return datos[idx];
};

exports.actualizarStock = (id, nuevoStock) => {
  const datos = leer();
  const idx = datos.findIndex((p) => p.id == id);
  if (idx === -1) return null;

  datos[idx].stock = nuevoStock;
  escribir(datos);
  return datos[idx];
};
