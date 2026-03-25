const { authenticate } = require('./auth');
const User = require('../models/User');

const checkAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    req.adminUser = user;
    next();
  } catch (err) {
    return res.status(500).json({ message: 'Server error during admin check' });
  }
};

exports.adminOnly = [authenticate, checkAdmin];
