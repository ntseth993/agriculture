const bcrypt = require('bcryptjs');

// In-memory user store for when MongoDB is not connected
const users = new Map();

const initDefaultUsers = async () => {
  if (users.size > 0) return;
  const adminHash = await bcrypt.hash('admin123', 10);
  const demoHash = await bcrypt.hash('demo123', 10);
  users.set('admin@crophealth.ai', {
    _id: 'admin-001',
    id: 'admin-001',
    name: 'Administrator',
    email: 'admin@crophealth.ai',
    phone: '+000000000',
    password: adminHash,
    role: 'admin',
    isBanned: false,
    verified: true,
    createdAt: new Date().toISOString(),
  });
  users.set('demo@crophealth.ai', {
    _id: 'demo-001',
    id: 'demo-001',
    name: 'Demo Farmer',
    email: 'demo@crophealth.ai',
    phone: '+000000001',
    password: demoHash,
    role: 'farmer',
    isBanned: false,
    verified: true,
    createdAt: new Date().toISOString(),
  });
};

let initialized = false;
const ensureInit = async () => {
  if (!initialized) {
    await initDefaultUsers();
    initialized = true;
  }
};

module.exports = {
  async findByEmail(email) {
    await ensureInit();
    return users.get(email?.toLowerCase()) || null;
  },
  async findById(id) {
    await ensureInit();
    for (const u of users.values()) {
      if (u._id === id || u.id === id) return u;
    }
    return null;
  },
  async create(userData) {
    await ensureInit();
    const id = `user-${Date.now()}`;
    const hash = await bcrypt.hash(userData.password, 10);
    const user = {
      _id: id,
      id,
      name: userData.name,
      email: userData.email?.toLowerCase(),
      phone: userData.phone || '',
      password: hash,
      role: userData.role || 'farmer',
      isBanned: false,
      verified: false,
      createdAt: new Date().toISOString(),
    };
    users.set(user.email, user);
    return user;
  },
  async matchPassword(user, password) {
    return bcrypt.compare(password, user.password);
  },
  async getAll({ search, role } = {}) {
    await ensureInit();
    let list = Array.from(users.values());
    if (role) list = list.filter(u => u.role === role);
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(u => u.name?.toLowerCase().includes(q) || u.email?.toLowerCase().includes(q));
    }
    return list.map(u => { const { password, ...rest } = u; return rest; });
  },
  async updateRole(id, role) {
    await ensureInit();
    for (const [email, u] of users.entries()) {
      if (u._id === id) {
        u.role = role;
        users.set(email, u);
        const { password, ...rest } = u;
        return rest;
      }
    }
    return null;
  },
  async setBanned(id, isBanned) {
    await ensureInit();
    for (const [email, u] of users.entries()) {
      if (u._id === id) {
        u.isBanned = isBanned;
        users.set(email, u);
        const { password, ...rest } = u;
        return rest;
      }
    }
    return null;
  },
  async delete(id) {
    await ensureInit();
    for (const [email, u] of users.entries()) {
      if (u._id === id) {
        users.delete(email);
        return true;
      }
    }
    return false;
  },
  getStats() {
    const list = Array.from(users.values());
    return {
      total: list.length,
      farmers: list.filter(u => u.role === 'farmer').length,
      agroVets: list.filter(u => u.role === 'agro-vet').length,
      pharmacies: list.filter(u => u.role === 'pharmacy').length,
      admins: list.filter(u => u.role === 'admin').length,
      banned: list.filter(u => u.isBanned).length,
      recentUsers: list.slice(-5).reverse().map(u => { const { password, ...rest } = u; return rest; }),
    };
  },
};
