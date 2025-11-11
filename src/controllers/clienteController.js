const service = require("../services/clienteService");

exports.listar = (req, res) => {
  try {
    const data = service.listar();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.obtener = (req, res) => {
  try {
    const c = service.obtenerPorId(req.params.id);
    res.json(c);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

exports.crear = (req, res) => {
  try {
    const nuevo = service.crear(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.actualizar = (req, res) => {
  try {
    const actualizado = service.actualizar(req.params.id, req.body);
    res.json(actualizado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
