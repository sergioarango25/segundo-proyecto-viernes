const service = require("../services/productoService");

exports.listar = (req, res) => {
  try {
    res.json(service.listar());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.obtener = (req, res) => {
  try {
    res.json(service.obtenerPorId(req.params.id));
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

exports.crear = (req, res) => {
  try {
    const p = service.crear(req.body);
    res.status(201).json(p);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.actualizar = (req, res) => {
  try {
    const p = service.actualizar(req.params.id, req.body);
    res.json(p);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
