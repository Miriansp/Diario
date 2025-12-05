const { db } = require('../firebaseconfig');

module.exports = {
  async get(uid) {
    const snapshot = await db.ref(`agenda/${uid}`).once('value');
    return snapshot.exists() ? snapshot.val() : {};
  },
  async add(uid, event) {
    const ref = db.ref(`agenda/${uid}`).push();
    await ref.set(event);
    return ref.key;
  },
  async update(uid, id, event) {
    await db.ref(`agenda/${uid}/${id}`).update(event);
  },
  async remove(uid, id) {
    await db.ref(`agenda/${uid}/${id}`).remove();
  }
};
