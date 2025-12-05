const { admin } = require('../firebaseconfig');

module.exports = async function (req, res, next) {
  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : (req.headers['x-id-token'] || req.body.idToken || null);
    if (!token) return res.status(401).json({ error: 'No se proporcionó token de autorización' });
    
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = { uid: decoded.uid, email: decoded.email };
    next();
  } catch (err) {
    console.error('Auth error:', err.message);
    return res.status(401).json({ error: 'Token inválido: ' + err.message });
  }
};
