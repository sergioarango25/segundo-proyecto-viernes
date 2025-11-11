const repo = require("../repositories/clienteRepository");

exports.listar = () => repo.obtenerTodos();

exports.obtenerPorId = (id) => {
  const c = repo.buscarPorId(id);
  if (!c) throw new Error("Cliente no encontrado");
  return c;
};

exports.crear = (data) => {
  if (!data.nombre) throw new Error("Nombre es obligatorio");
  return repo.crear(data);
};

exports.actualizar = (id, cambios) => {
  const updated = repo.actualizar(id, cambios);
  if (!updated) throw new Error("Cliente no encontrado");
  return updated;
};
