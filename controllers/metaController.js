const Meta = require('../models/MetaModel');

module.exports = {
  async listar(req, res) {
    try {
      const uid = req.user.uid;
      const data = await Meta.getAll(uid);
      res.json(data);
    } catch (err) {
      console.error('Error en listar metas:', err);
      res.status(500).json({ error: err.message });
    }
  },
  async crear(req, res) {
    try {
      const uid = req.user.uid;
      const { title, description, deadline } = req.body;
      await Meta.add(uid, { title, description, deadline, createdAt: Date.now() });
      res.json({ ok: true });
    } catch (err) {
      console.error('Error en crear meta:', err);
      res.status(500).json({ error: err.message });
    }
  },
  async actualizar(req, res) {
    try {
      const uid = req.user.uid;
      const { id } = req.params;
      const { title, description, deadline } = req.body;
      await Meta.update(uid, id, { title, description, deadline });
      res.json({ ok: true });
    } catch (err) {
      console.error('Error en actualizar meta:', err);
      res.status(500).json({ error: err.message });
    }
  },
  async eliminar(req, res) {
    try {
      const uid = req.user.uid;
      const { id } = req.params;
      await Meta.remove(uid, id);
      res.json({ ok: true });
    } catch (err) {
      console.error('Error en eliminar meta:', err);
      res.status(500).json({ error: err.message });
    }
  }
};
