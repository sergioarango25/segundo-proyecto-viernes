const service = require("../services/ventaService");

exports.listar = (req, res) => {
  try {
    res.json(service.listar());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.crear = (req, res) => {
  try {
    const v = service.crear(req.body);
    res.status(201).json(v);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
