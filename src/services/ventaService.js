const ventaRepo = require("../repositories/ventaRepository");
const productoRepo = require("../repositories/productoRepository");
const clienteRepo = require("../repositories/clienteRepository");

exports.listar = () => ventaRepo.obtenerTodos();

exports.crear = (payload) => {
  const { cliente_id, items } = payload;
  if (!cliente_id) throw new Error("cliente_id es obligatorio");
  if (!Array.isArray(items) || items.length === 0)
    throw new Error("items obligatorios");

  const cliente = clienteRepo.buscarPorId(cliente_id);
  if (!cliente) throw new Error("Cliente no existe");

  // Validar productos y calcular total
  let total = 0;
  const updates = []; // {id, nuevoStock}
  const itemsConPrecio = [];

  for (const it of items) {
    if (!it.producto_id || !it.cantidad)
      throw new Error("Cada item requiere producto_id y cantidad");
    const producto = productoRepo.buscarPorId(it.producto_id);
    if (!producto) throw new Error(`Producto ${it.producto_id} no existe`);
    if (producto.stock < it.cantidad)
      throw new Error(`Stock insuficiente para ${producto.nombre}`);
    const subtotal = producto.precio * it.cantidad;
    total += subtotal;
    updates.push({ id: producto.id, nuevoStock: producto.stock - it.cantidad });
    itemsConPrecio.push({
      producto_id: producto.id,
      nombre: producto.nombre,
      cantidad: it.cantidad,
      precio_unitario: producto.precio,
      subtotal,
    });
  }

  // Aplicar actualizaciones de stock (síncrono)
  updates.forEach((u) => productoRepo.actualizarStock(u.id, u.nuevoStock));

  const nuevaVenta = {
    cliente_id,
    total,
    items: itemsConPrecio,
  };

  return ventaRepo.crear(nuevaVenta);
};
