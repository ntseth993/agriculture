import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FiUsers, FiShield, FiTrash2, FiSearch, FiArrowLeft, FiRefreshCw, FiUserCheck, FiUserX } from 'react-icons/fi';

const apiClient = axios.create({ baseURL: '' });
apiClient.interceptors.request.use(cfg => {
  const token = localStorage.getItem('token');
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

const ROLE_COLORS = {
  admin: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  farmer: 'bg-green-500/20 text-green-300 border-green-500/30',
  'agro-vet': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  pharmacy: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
};

export const AdminPage = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterRole, setFilterRole] = useState('');

  const fetchStats = useCallback(async () => {
    try {
      const res = await apiClient.get('/api/admin/stats');
      setStats(res.data.stats);
    } catch (err) {
      console.error('Failed to fetch stats', err);
    }
  }, []);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiClient.get('/api/admin/users', {
        params: { page, search, role: filterRole, limit: 15 },
      });
      setUsers(res.data.users || []);
      setTotalPages(res.data.pages || 1);
    } catch (err) {
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  }, [page, search, filterRole]);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/dashboard');
      return;
    }
    fetchStats();
    fetchUsers();
  }, [user, navigate, fetchStats, fetchUsers]);

  const handleRoleChange = async (userId, role) => {
    try {
      await apiClient.put(`/api/admin/users/${userId}/role`, { role });
      toast.success('Role updated');
      fetchUsers();
      fetchStats();
    } catch (err) {
      toast.error('Failed to update role');
    }
  };

  const handleBan = async (userId, isBanned) => {
    try {
      const endpoint = isBanned ? 'unban' : 'ban';
      await apiClient.put(`/api/admin/users/${userId}/${endpoint}`);
      toast.success(isBanned ? 'User unbanned' : 'User banned');
      fetchUsers();
    } catch (err) {
      toast.error('Action failed');
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm('Are you sure you want to permanently delete this user?')) return;
    try {
      await apiClient.delete(`/api/admin/users/${userId}`);
      toast.success('User deleted');
      fetchUsers();
      fetchStats();
    } catch (err) {
      toast.error('Failed to delete user');
    }
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <nav className="bg-gray-900/80 backdrop-blur-xl border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3.5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
              <FiArrowLeft /> Back
            </button>
            <div className="w-px h-5 bg-white/20" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center">
                <FiShield className="text-white text-sm" />
              </div>
              <span className="text-white font-bold">{t('adminPanel')}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-xl">
            <FiShield className="text-purple-400 text-sm" />
            <span className="text-purple-300 text-xs font-medium">Administrator</span>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
            {[
              { label: t('totalUsers'), value: stats.total, color: 'from-blue-500 to-blue-600' },
              { label: 'Farmers', value: stats.farmers, color: 'from-green-500 to-green-600' },
              { label: 'Agro-Vets', value: stats.agroVets, color: 'from-cyan-500 to-cyan-600' },
              { label: 'Pharmacies', value: stats.pharmacies, color: 'from-yellow-500 to-yellow-600' },
              { label: 'Admins', value: stats.admins, color: 'from-purple-500 to-purple-600' },
              { label: 'Banned', value: stats.banned, color: 'from-red-500 to-red-600' },
            ].map(s => (
              <motion.div key={s.label} whileHover={{ scale: 1.03 }} className="bg-gray-900/60 border border-white/10 rounded-2xl p-4 text-center">
                <div className={`text-2xl font-bold bg-gradient-to-r ${s.color} bg-clip-text text-transparent`}>{s.value}</div>
                <div className="text-white/50 text-xs mt-1">{s.label}</div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="bg-gray-900/60 border border-white/10 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-white/10 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex items-center gap-2">
              <FiUsers className="text-green-400" />
              <h2 className="text-white font-bold text-lg">{t('users')}</h2>
            </div>
            <div className="flex flex-wrap gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-none">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="text"
                  placeholder={t('search')}
                  value={search}
                  onChange={e => { setSearch(e.target.value); setPage(1); }}
                  className="w-full sm:w-52 pl-9 pr-4 py-2 bg-white/5 border border-white/10 text-white text-sm rounded-xl focus:outline-none focus:border-green-500/50"
                />
              </div>
              <select
                value={filterRole}
                onChange={e => { setFilterRole(e.target.value); setPage(1); }}
                className="px-3 py-2 bg-white/5 border border-white/10 text-white text-sm rounded-xl focus:outline-none"
              >
                <option value="">All Roles</option>
                <option value="farmer">Farmer</option>
                <option value="agro-vet">Agro-Vet</option>
                <option value="pharmacy">Pharmacy</option>
                <option value="admin">Admin</option>
              </select>
              <button onClick={() => { fetchUsers(); fetchStats(); }} className="p-2 bg-white/5 border border-white/10 text-white/60 rounded-xl hover:text-white transition-colors">
                <FiRefreshCw />
              </button>
            </div>
          </div>

          {loading ? (
            <div className="p-12 text-center text-white/50">Loading users...</div>
          ) : users.length === 0 ? (
            <div className="p-12 text-center text-white/50">No users found</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="text-left text-white/40 text-xs font-medium p-4">User</th>
                    <th className="text-left text-white/40 text-xs font-medium p-4">Email</th>
                    <th className="text-left text-white/40 text-xs font-medium p-4">{t('roles')}</th>
                    <th className="text-left text-white/40 text-xs font-medium p-4">Status</th>
                    <th className="text-left text-white/40 text-xs font-medium p-4">Joined</th>
                    <th className="text-right text-white/40 text-xs font-medium p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <motion.tr key={u._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="border-b border-white/5 hover:bg-white/2">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-bold text-xs">{u.name?.charAt(0)?.toUpperCase() || 'U'}</span>
                          </div>
                          <span className="text-white text-sm font-medium">{u.name}</span>
                        </div>
                      </td>
                      <td className="p-4 text-white/60 text-sm">{u.email}</td>
                      <td className="p-4">
                        <select
                          value={u.role}
                          onChange={e => handleRoleChange(u._id, e.target.value)}
                          disabled={u._id === user?.id}
                          className={`text-xs px-2 py-1 rounded-lg border font-medium cursor-pointer bg-transparent ${ROLE_COLORS[u.role] || 'text-white/60'} focus:outline-none`}
                        >
                          <option value="farmer">Farmer</option>
                          <option value="agro-vet">Agro-Vet</option>
                          <option value="pharmacy">Pharmacy</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                      <td className="p-4">
                        <span className={`text-xs px-2 py-1 rounded-full border font-medium ${u.isBanned ? 'bg-red-500/20 text-red-300 border-red-500/30' : 'bg-green-500/20 text-green-300 border-green-500/30'}`}>
                          {u.isBanned ? 'Banned' : 'Active'}
                        </span>
                      </td>
                      <td className="p-4 text-white/40 text-xs">{new Date(u.createdAt).toLocaleDateString()}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 justify-end">
                          {u._id !== user?.id && (
                            <>
                              <button
                                onClick={() => handleBan(u._id, u.isBanned)}
                                title={u.isBanned ? t('unban') : t('ban')}
                                className={`p-1.5 rounded-lg transition-colors ${u.isBanned ? 'bg-green-500/10 text-green-400 hover:bg-green-500/20' : 'bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20'}`}
                              >
                                {u.isBanned ? <FiUserCheck size={14} /> : <FiUserX size={14} />}
                              </button>
                              <button
                                onClick={() => handleDelete(u._id)}
                                title={t('delete')}
                                className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                              >
                                <FiTrash2 size={14} />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {totalPages > 1 && (
            <div className="p-4 flex justify-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${p === page ? 'bg-green-500 text-white' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
