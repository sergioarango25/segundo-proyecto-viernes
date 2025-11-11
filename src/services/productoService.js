const repo = require("../repositories/productoRepository");

exports.listar = () => repo.obtenerTodos();

exports.obtenerPorId = (id) => {
  const p = repo.buscarPorId(id);
  if (!p) throw new Error("Producto no encontrado");
  return p;
};

exports.crear = (data) => {
  if (!data.nombre || typeof data.precio === "undefined")
    throw new Error("Nombre y precio son obligatorios");
  data.stock = data.stock || 0;
  return repo.crear(data);
};

exports.actualizar = (id, cambios) => {
  const updated = repo.actualizar(id, cambios);
  if (!updated) throw new Error("Producto no encontrado");
  return updated;
};

exports.actualizarStock = (id, nuevoStock) => {
  const p = repo.buscarPorId(id);
  if (!p) throw new Error("Producto no encontrado");
  return repo.actualizarStock(id, nuevoStock);
};
