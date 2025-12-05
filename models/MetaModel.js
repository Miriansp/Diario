const { db } = require('../firebaseconfig');

module.exports = {
  async getAll(uid) {
    const snapshot = await db.ref(`metas/${uid}`).once('value');
    return snapshot.exists() ? snapshot.val() : {};
  },
  async add(uid, meta) {
    const ref = db.ref(`metas/${uid}`).push();
    await ref.set(meta);
  },
  async update(uid, id, patch) {
    await db.ref(`metas/${uid}/${id}`).update(patch);
  },
  async remove(uid, id) {
    await db.ref(`metas/${uid}/${id}`).remove();
  }
};
