const Routine = require("../models/RoutineModel");

module.exports = {
  async listar(req, res) {
    try {
      const uid = req.user?.uid;
      if (!uid) return res.status(401).json({ error: 'No autenticado' });
      const data = await Routine.getAllRoutines(uid);
      res.json(data);
    } catch (err) {
      console.error('Error en listar rutinas:', err);
      res.status(500).json({ error: err.message });
    }
  },

  async crear(req, res) {
    try {
      const uid = req.user?.uid;
      if (!uid) return res.status(401).json({ error: 'No autenticado' });
      const { name, description, duration } = req.body;
      const nuevaRutina = { name, description, duration, completado: false, createdAt: Date.now() };
      await Routine.addRoutine(uid, nuevaRutina);
      res.json({ ok: true });
    } catch (err) {
      console.error('Error en crear rutina:', err);
      res.status(500).json({ error: err.message });
    }
  },

  async actualizar(req, res) {
    try {
      const uid = req.user?.uid;
      if (!uid) return res.status(401).json({ error: 'No autenticado' });
      const { id } = req.params;
      const { name, description, duration } = req.body;
      await Routine.updateRoutine(uid, id, { name, description, duration });
      res.json({ ok: true });
    } catch (err) {
      console.error('Error en actualizar rutina:', err);
      res.status(500).json({ error: err.message });
    }
  },

  async eliminar(req, res) {
    try {
      const uid = req.user?.uid;
      if (!uid) return res.status(401).json({ error: 'No autenticado' });
      const { id } = req.params;
      await Routine.deleteRoutine(uid, id);
      res.json({ ok: true });
    } catch (err) {
      console.error('Error en eliminar rutina:', err);
      res.status(500).json({ error: err.message });
    }
  },

  async completar(req, res) {
    try {
      const uid = req.user?.uid;
      if (!uid) return res.status(401).json({ error: 'No autenticado' });
      const { id } = req.params;
      const { current } = req.body;
      await Routine.toggleComplete(uid, id, current === "true");
      res.json({ ok: true });
    } catch (err) {
      console.error('Error en completar rutina:', err);
      res.status(500).json({ error: err.message });
    }
  }
};
