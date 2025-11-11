const fs = require("fs");
const path = require("path");
const file = path.join(__dirname, "../data/ventas.json");

function leer() {
  if (!fs.existsSync(file)) return [];
  const raw = fs.readFileSync(file, "utf8");
  return JSON.parse(raw || "[]");
}
function escribir(data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

exports.obtenerTodos = () => leer();
exports.crear = (venta) => {
  const datos = leer();
  venta.id = datos.length ? datos[datos.length - 1].id + 1 : 1;
  venta.fecha = new Date().toISOString();
  datos.push(venta);
  escribir(datos);
  return venta;
};
