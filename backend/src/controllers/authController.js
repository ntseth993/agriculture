const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const inMemoryStore = require('../config/inMemoryStore');

const JWT_SECRET = process.env.JWT_SECRET || 'crophealth-dev-secret-key-change-in-production';

const isDbConnected = () => mongoose.connection.readyState === 1;

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, JWT_SECRET, { expiresIn: '30d' });
};

const getUserModel = () => {
  if (isDbConnected()) return require('../models/User');
  return null;
};

exports.register = async (req, res) => {
  try {
    const { name, email, phone, password, role, businessName, businessDetails, pharmacyType } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide name, email, and password' });
    }

    if (isDbConnected()) {
      const User = getUserModel();
      let user = await User.findOne({ email });
      if (user) return res.status(400).json({ message: 'User already exists' });

      user = new User({
        name, email, phone: phone || '', password,
        role: role || 'farmer',
        ...(role && role !== 'farmer' && { businessName, businessDetails, pharmacyType }),
      });
      await user.save();

      const token = generateToken(user._id.toString(), user.role);
      return res.status(201).json({
        success: true, token,
        user: { id: user._id, name: user.name, email: user.email, role: user.role },
      });
    }

    // In-memory fallback
    const existing = await inMemoryStore.findByEmail(email);
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const user = await inMemoryStore.create({ name, email, phone: phone || '', password, role: role || 'farmer' });
    const token = generateToken(user.id, user.role);
    return res.status(201).json({
      success: true, token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: error.message || 'Registration failed' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    if (isDbConnected()) {
      const User = getUserModel();
      const user = await User.findOne({ email }).select('+password');
      if (!user) return res.status(401).json({ message: 'Invalid credentials' });

      const isMatch = await user.matchPassword(password);
      if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

      if (user.isBanned) {
        return res.status(403).json({ message: 'Your account has been suspended. Please contact support.' });
      }

      const token = generateToken(user._id.toString(), user.role);
      return res.status(200).json({
        success: true, token,
        user: { id: user._id, name: user.name, email: user.email, role: user.role },
      });
    }

    // In-memory fallback
    const user = await inMemoryStore.findByEmail(email);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await inMemoryStore.matchPassword(user, password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    if (user.isBanned) {
      return res.status(403).json({ message: 'Your account has been suspended. Please contact support.' });
    }

    const token = generateToken(user.id, user.role);
    return res.status(200).json({
      success: true, token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: error.message || 'Login failed' });
  }
};

exports.googleAuth = async (req, res) => {
  try {
    const { token: googleToken } = req.body;
    if (!googleToken) return res.status(400).json({ message: 'Google token is required' });

    const { OAuth2Client } = require('google-auth-library');
    const client = new OAuth2Client('970571415745-h2uac1cfg1hgnctre8m0pqtpttlfm83t.apps.googleusercontent.com');

    const ticket = await client.verifyIdToken({
      idToken: googleToken,
      audience: '970571415745-h2uac1cfg1hgnctre8m0pqtpttlfm83t.apps.googleusercontent.com',
    });

    const payload = ticket.getPayload();
    const { email, name, picture, sub: googleId } = payload;

    if (isDbConnected()) {
      const User = getUserModel();
      let user = await User.findOne({ email });
      if (!user) {
        user = new User({ name, email, googleId, avatar: picture, phone: '', password: `google_${googleId}_${Date.now()}`, role: 'farmer', isGoogleUser: true });
        await user.save();
      } else if (!user.googleId) {
        user.googleId = googleId;
        user.avatar = picture || user.avatar;
        await user.save();
      }
      const token = generateToken(user._id.toString(), user.role);
      return res.status(200).json({ success: true, token, user: { id: user._id, name: user.name, email: user.email, role: user.role, avatar: user.avatar } });
    }

    // In-memory fallback
    let user = await inMemoryStore.findByEmail(email);
    if (!user) {
      user = await inMemoryStore.create({ name, email, phone: '', password: `google_${googleId}_${Date.now()}`, role: 'farmer' });
    }
    const token = generateToken(user.id, user.role);
    return res.status(200).json({ success: true, token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    console.error('Google auth error:', error);
    res.status(401).json({ message: 'Google authentication failed. Please try again.' });
  }
};

exports.getMe = async (req, res) => {
  try {
    if (isDbConnected()) {
      const User = getUserModel();
      const user = await User.findById(req.user.id);
      if (!user) return res.status(404).json({ message: 'User not found' });
      return res.status(200).json({ success: true, user });
    }

    // In-memory fallback
    const user = await inMemoryStore.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const { password, ...safeUser } = user;
    return res.status(200).json({ success: true, user: safeUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
