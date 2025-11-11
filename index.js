const express = require('express');
const app = express();
const PORT = 3000;
app.use(express.json());

const clienteRoutes = require('./src/routes/clienteRoutes');
const productoRoutes = require('./src/routes/productoRoutes');
const ventaRoutes = require('./src/routes/ventaRoutes');


app.use('/api/clientes', clienteRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/ventas', ventaRoutes);


app.get('/', (req, res) => {
  res.send('🚀 API del Sistema de Ventas funcionando correctamente');
});


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
