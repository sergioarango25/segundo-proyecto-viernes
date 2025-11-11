const fs = require("fs");
const path = require("path");
const file = path.join(__dirname, "../data/clientes.json");

function leer() {
  if (!fs.existsSync(file)) return [];
  const raw = fs.readFileSync(file, "utf8");
  return JSON.parse(raw || "[]");
}

function escribir(data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));

}

exports.obtenerTodos = () => leer();
exports.buscarPorId = (id) => leer().find((c) => c.id == id);
exports.crear = (cliente) => {

  const datos = leer();
  cliente.id = datos.length ? datos[datos.length - 1].id + 1 : 1;
  cliente.creado_at = new Date().toISOString();
  datos.push(cliente);
  escribir(datos);
  return cliente;

};

exports.actualizar = (id, cambios) => {
  const datos = leer();
  const idx = datos.findIndex((c) => c.id == id);
  if (idx === -1) return null;
  datos[idx] = { ...datos[idx], ...cambios };
  escribir(datos);
  return datos[idx];
};
