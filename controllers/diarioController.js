const Diario = require('../models/DiarioModel');

module.exports = {
  async listar(req, res) {
    try {
      const uid = req.user.uid;
      const data = await Diario.list(uid);
      res.json(data);
    } catch (err) {
      console.error('Error en listar diario:', err);
      res.status(500).json({ error: err.message });
    }
  },
  async crear(req, res) {
    try {
      const uid = req.user.uid;
      const { title, content, mood } = req.body;
      await Diario.add(uid, { title, content, mood, createdAt: Date.now() });
      res.json({ ok: true });
    } catch (err) {
      console.error('Error en crear entrada:', err);
      res.status(500).json({ error: err.message });
    }
  },
  async actualizar(req, res) {
    try {
      const uid = req.user.uid;
      const { id } = req.params;
      const { title, content, mood } = req.body;
      await Diario.update(uid, id, { title, content, mood });
      res.json({ ok: true });
    } catch (err) {
      console.error('Error en actualizar entrada:', err);
      res.status(500).json({ error: err.message });
    }
  },
  async eliminar(req, res) {
    try {
      const uid = req.user.uid;
      const { id } = req.params;
      await Diario.remove(uid, id);
      res.json({ ok: true });
    } catch (err) {
      console.error('Error en eliminar entrada:', err);
      res.status(500).json({ error: err.message });
    }
  }
};
