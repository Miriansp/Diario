const { db } = require('../firebaseconfig');

module.exports = {
  async list(uid) {
    const snapshot = await db.ref(`diario/${uid}`).once('value');
    return snapshot.exists() ? snapshot.val() : {};
  },
  async add(uid, entry) {
    const ref = db.ref(`diario/${uid}`).push();
    await ref.set(entry);
    return ref.key;
  },
  async update(uid, id, entry) {
    await db.ref(`diario/${uid}/${id}`).update(entry);
  },
  async remove(uid, id) {
    await db.ref(`diario/${uid}/${id}`).remove();
  }
};
