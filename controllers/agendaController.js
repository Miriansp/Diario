const Agenda = require('../models/AgendaModel');

module.exports = {
  async listar(req, res) {
    try {
      const uid = req.user.uid;
      const data = await Agenda.get(uid);
      res.json(data);
    } catch (err) {
      console.error('Error en listar agenda:', err);
      res.status(500).json({ error: err.message });
    }
  },
  async crear(req, res) {
    try {
      const uid = req.user.uid;
      const { title, description, dateTime } = req.body;
      await Agenda.add(uid, { title, description, dateTime, createdAt: Date.now() });
      res.json({ ok: true });
    } catch (err) {
      console.error('Error en crear evento:', err);
      res.status(500).json({ error: err.message });
    }
  },
  async actualizar(req, res) {
    try {
      const uid = req.user.uid;
      const { id } = req.params;
      const { title, description, dateTime } = req.body;
      await Agenda.update(uid, id, { title, description, dateTime });
      res.json({ ok: true });
    } catch (err) {
      console.error('Error en actualizar evento:', err);
      res.status(500).json({ error: err.message });
    }
  },
  async eliminar(req, res) {
    try {
      const uid = req.user.uid;
      const { id } = req.params;
      await Agenda.remove(uid, id);
      res.json({ ok: true });
    } catch (err) {
      console.error('Error en eliminar evento:', err);
      res.status(500).json({ error: err.message });
    }
  }
};
