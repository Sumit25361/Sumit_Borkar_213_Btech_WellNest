import { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import './index.css';

/* ── Sections ── */
function Overview({ user, stats }) {
  const statCards = [
    { label: 'Total Users', value: stats.totalUsers || 0, icon: '👥', color: 'var(--orange)' },
    { label: 'Active Trainers', value: stats.activeTrainers || 0, icon: '🟢', color: '#22c55e' },
    { label: 'Blog Posts', value: stats.totalBlogs || 0, icon: '📝', color: 'var(--purple-lt)' },
    { label: 'System Health', value: stats.systemHealth || '99%', icon: '❤️', color: '#f43f5e' },
  ];

  return (
    <>
      <div className="admin-stats-grid">
        {statCards.map(s => (
          <div key={s.label} className="admin-stat-card">
            <div className="admin-stat-icon" style={{ color: s.color }}>{s.icon}</div>
            <div className="admin-stat-value" style={{ color: s.color }}>{s.value}</div>
            <div className="admin-stat-label">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="admin-card">
        <h3 className="admin-card-title">System Information</h3>
        <table className="admin-table">
          <thead>
            <tr><th className="admin-th">Property</th><th className="admin-th">Value</th></tr>
          </thead>
          <tbody>
            <tr><td className="admin-td">Admin Email</td><td className="admin-td">{user?.email}</td></tr>
            <tr><td className="admin-td">Role</td><td className="admin-td">Administrator</td></tr>
            <tr><td className="admin-td">Server</td><td className="admin-td">localhost:8080</td></tr>
            <tr><td className="admin-td">Version</td><td className="admin-td">WellNest v2.0</td></tr>
            <tr><td className="admin-td">Status</td><td className="admin-td">🟢 Online</td></tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

function Users({ users, onDeleteUser }) {
  const [search, setSearch] = useState('');
  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18, flexWrap: 'wrap', gap: 12 }}>
        <h3 className="admin-card-title" style={{ margin: 0 }}>👥 Registered Users</h3>
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search by name or email..."
          style={{ padding: '8px 14px', borderRadius: 9, border: '1px solid rgba(16, 185, 129,0.25)', background: 'rgba(255,255,255,0.04)', color: 'var(--text)', fontSize: 13, outline: 'none', width: 220 }}
        />
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th className="admin-th">#</th>
              <th className="admin-th">Name</th>
              <th className="admin-th">Email</th>
              <th className="admin-th">Role</th>
              <th className="admin-th">Specialty</th>
              <th className="admin-th">Joined</th>
              <th className="admin-th">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u, i) => (
              <tr key={u.email}>
                <td className="admin-td">{i + 1}</td>
                <td className="admin-td" style={{ fontWeight: 700, color: 'var(--text)' }}>{u.name}</td>
                <td className="admin-td">{u.email}</td>
                <td className="admin-td">
                  <span style={{
                    padding: '3px 10px', borderRadius: 50, fontSize: 11, fontWeight: 700,
                    background: u.role === 'trainer' ? 'rgba(168,85,247,0.15)' : 'rgba(34,197,94,0.15)',
                    color: u.role === 'trainer' ? '#a855f7' : '#4ade80',
                    border: `1px solid ${u.role === 'trainer' ? 'rgba(168,85,247,0.3)' : 'rgba(34,197,94,0.3)'}`,
                    textTransform: 'capitalize'
                  }}>{u.role}</span>
                </td>
                <td className="admin-td">{u.specialty || '-'}</td>
                <td className="admin-td">{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'N/A'}</td>
                <td className="admin-td">
                  {u.email !== 'admin@gmail.com' && (
                    <button 
                      onClick={() => onDeleteUser(u.email)}
                      style={{ background: 'rgba(244,63,94,0.1)', color: '#f43f5e', border: '1px solid rgba(244,63,94,0.3)', padding: '4px 10px', borderRadius: 6, fontSize: 11, cursor: 'pointer', fontWeight: 600 }}
                    >
                      Remove
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filtered.length === 0 && <p style={{ color: 'var(--muted)', textAlign: 'center', padding: 20 }}>No users found.</p>}
    </div>
  );
}

function Reports() {
  // Keeping mock reports for now as requested in the plan
  const REPORTS = [
    { id: 1, user: 'Vishnu Priya', type: 'Hydration', date: '2026-03-06', detail: 'Logged 1.8L of 2.5L goal (72%)' },
    { id: 2, user: 'Sumit Kumar', type: 'Walking', date: '2026-03-06', detail: '6200 steps — 62% of 10,000 goal' },
    { id: 3, user: 'Rohan M', type: 'Yoga', date: '2026-03-05', detail: '45 min session — Mountain Pose' },
    { id: 4, user: 'Ananya R', type: 'Diet', date: '2026-03-05', detail: '1640 kcal logged — below target' },
    { id: 5, user: 'Priya S', type: 'BMI', date: '2026-03-04', detail: 'BMI 19.9 — Normal weight range' },
  ];
  const typeColors = { Hydration: '#38bdf8', Walking: '#4ade80', Yoga: '#a855f7', Diet: '#fbbf24', BMI: '#34d399' };

  return (
    <div className="admin-card">
      <h3 className="admin-card-title">📝 Activity Reports (Mock Data)</h3>
      <table className="admin-table">
        <thead>
          <tr><th className="admin-th">User</th><th className="admin-th">Type</th><th className="admin-th">Date</th><th className="admin-th">Detail</th></tr>
        </thead>
        <tbody>
          {REPORTS.map(r => (
            <tr key={r.id}>
              <td className="admin-td" style={{ fontWeight: 700, color: 'var(--text)' }}>{r.user}</td>
              <td className="admin-td">
                <span style={{ padding: '3px 10px', borderRadius: 50, fontSize: 11, fontWeight: 700, background: `rgba(${typeColors[r.type] || '16, 185, 129'},0.12)`, color: typeColors[r.type] || 'var(--orange-lt)', border: `1px solid ${typeColors[r.type] || 'var(--orange)'}44` }}>{r.type}</span>
              </td>
              <td className="admin-td">{r.date}</td>
              <td className="admin-td" style={{ color: 'var(--muted)' }}>{r.detail}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Settings({ user }) {
  const [notif, setNotif] = useState(true);
  const [maint, setMaint] = useState(false);
  const [backup, setBackup] = useState(true);
  const Toggle = ({ val, set }) => (
    <div onClick={() => set(!val)} style={{ width: 44, height: 24, borderRadius: 12, cursor: 'pointer', transition: 'all .25s', background: val ? 'var(--orange)' : 'rgba(255,255,255,0.12)', position: 'relative', flexShrink: 0 }}>
      <div style={{ position: 'absolute', top: 3, left: val ? 22 : 3, width: 18, height: 18, borderRadius: '50%', background: '#fff', transition: 'left .25s', boxShadow: '0 1px 4px rgba(0,0,0,0.4)' }} />
    </div>
  );
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div className="admin-card">
        <h3 className="admin-card-title">⚙️ System Settings</h3>
        {[
          ['🔔 Email Notifications', 'Send activity alerts to users', notif, setNotif],
          ['🛠️ Maintenance Mode', 'Restrict user logins temporarily', maint, setMaint],
          ['💾 Auto Backup', 'Backup database every 24 hours', backup, setBackup],
        ].map(([label, desc, val, set]) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid rgba(16, 185, 129,0.08)' }}>
            <div>
              <div style={{ color: 'var(--text)', fontWeight: 600, fontSize: 14 }}>{label}</div>
              <div style={{ color: 'var(--muted)', fontSize: 12, marginTop: 2 }}>{desc}</div>
            </div>
            <Toggle val={val} set={set} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Main Component ── */
function AdminDashboard() {
  const { user } = useAuth();
  const location = useLocation();
  const [active, setActive] = useState(location.state?.activeTab || 'Overview');
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/admin/stats');
      const data = await res.json();
      setStats(data);
    } catch (err) { console.error('Failed to fetch stats:', err); }
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/admin/users');
      const data = await res.json();
      setUsers(data);
    } catch (err) { console.error('Failed to fetch users:', err); }
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await Promise.all([fetchStats(), fetchUsers()]);
      setLoading(false);
    };
    init();
  }, []);

  const handleDeleteUser = async (email) => {
    if (!window.confirm(`Are you sure you want to remove ${email}? This action cannot be undone.`)) return;
    try {
      const res = await fetch(`http://localhost:8080/api/admin/users/${email}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setUsers(users.filter(u => u.email !== email));
        fetchStats(); // Update card counts
        alert('User removed successfully.');
      } else {
        alert(data.message || 'Failed to remove user.');
      }
    } catch (err) { console.error('Failed to delete user:', err); }
  };

  useEffect(() => {
    if (location.state?.activeTab) {
      setActive(location.state.activeTab);
    }
  }, [location.state?.activeTab]);

  const pageTitles = {
    Overview: { title: 'Admin Dashboard', sub: `Welcome back, ${user?.name || 'Admin'}!` },
    Users: { title: 'User Management', sub: 'View and manage all registered users' },
    Reports: { title: 'Activity Reports', sub: 'Monitor user health activity logs' },
    Settings: { title: 'System Settings', sub: 'Configure platform preferences' },
  };
  const { title, sub } = pageTitles[active];

  if (loading) return <div className="hb-loading">Initializing Admin Panel...</div>;

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <div className="admin-topbar">
        <div>
          <h1 className="admin-title">{title}</h1>
          <p className="admin-subtitle">{sub}</p>
        </div>
        <div className="admin-badge">🛡️ Admin</div>
      </div>

      {active === 'Overview' && <Overview user={user} stats={stats} />}
      {active === 'Users' && <Users users={users} onDeleteUser={handleDeleteUser} />}
      {active === 'Reports' && <Reports />}
      {active === 'Settings' && <Settings user={user} />}
    </div>
  );
}

export default AdminDashboard;
