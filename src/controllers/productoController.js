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
    const id = parseInt(req.params.id);
    res.json(service.obtener(id));
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
    const id = parseInt(req.params.id);
    const p = service.actualizar(id, req.body);
    res.json(p);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.actualizarStock = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { stock } = req.body;

    if (typeof stock === "undefined") {
      return res.status(400).json({
        error: "Debe enviar el campo 'stock'"
      });
    }

    const actualizado = service.actualizarStock(id, stock);
    res.json(actualizado);

  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};
