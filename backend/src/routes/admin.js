const express = require('express');
const router = express.Router();
const { adminOnly } = require('../middleware/admin');
const {
  getAllUsers,
  getUserById,
  updateUserRole,
  banUser,
  unbanUser,
  deleteUser,
  getStats,
} = require('../controllers/adminController');

router.get('/stats', adminOnly, getStats);
router.get('/users', adminOnly, getAllUsers);
router.get('/users/:id', adminOnly, getUserById);
router.put('/users/:id/role', adminOnly, updateUserRole);
router.put('/users/:id/ban', adminOnly, banUser);
router.put('/users/:id/unban', adminOnly, unbanUser);
router.delete('/users/:id', adminOnly, deleteUser);

module.exports = router;
