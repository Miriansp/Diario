const { admin, db } = require('../firebaseconfig');

module.exports = {
  async getAllRoutines(uid) {
    const snapshot = await db.ref(`routines/${uid}`).once('value');
    return snapshot.exists() ? snapshot.val() : {};
  },

  async addRoutine(uid, routine) {
    const newRef = db.ref(`routines/${uid}`).push();
    await newRef.set(routine);
    return newRef.key;
  },

  async updateRoutine(uid, id, routine) {
    await db.ref(`routines/${uid}/${id}`).update(routine);
  },

  async deleteRoutine(uid, id) {
    await db.ref(`routines/${uid}/${id}`).remove();
  },

  async toggleComplete(uid, id, current) {
    await db.ref(`routines/${uid}/${id}`).update({ completado: !current });
  }
};
