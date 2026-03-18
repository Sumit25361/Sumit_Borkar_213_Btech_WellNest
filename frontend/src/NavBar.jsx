import { Link, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

<<<<<<< HEAD
function NavBar() {
    const { user, logout } = useAuth();
    const location = useLocation();

    const navItems = [
        { name: 'Dashboard', path: '/dashboard', icon: '🏠' },
        { name: 'Hydration', path: '/hydration', icon: '💧' },
        { name: 'Healthy Food', path: '/healthy-food', icon: '🥗' },
        { name: 'Breathing', path: '/breathing', icon: '🌬️' },
        { name: 'Yoga', path: '/yoga', icon: '🧘' },
        { name: 'Walking', path: '/walking', icon: '🚶' },
    ];

    if (!user) return null;

    return (
        <nav style={styles.navbar}>
            <div style={styles.brandContainer}>
                <span style={styles.brandIcon}>🌿</span>
                <span style={styles.brandText}>Health Hub</span>
            </div>

            <div style={styles.linksContainer}>
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.name}
                            to={item.path}
                            style={{
                                ...styles.link,
                                ...(isActive ? styles.activeLink : {})
                            }}
                        >
                            <span style={styles.linkIcon}>{item.icon}</span>
                            <span style={styles.linkText}>{item.name}</span>
                        </Link>
                    );
                })}
            </div>

            <div style={styles.userContainer}>
                <div style={styles.userInfo}>
                    <span style={styles.userName}>{user?.name || 'User'}</span>
                    <span style={styles.userRole}>{user?.role === 'admin' ? 'Admin' : 'Member'}</span>
                </div>
                <button onClick={logout} style={styles.logoutBtn}>Logout</button>
            </div>
        </nav>
    );
}

const styles = {
    navbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 24px',
        background: '#ffffff',
        boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        gap: '20px',
        overflowX: 'auto',
    },
    brandContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        minWidth: 'fit-content'
    },
    brandIcon: {
        fontSize: '24px',
    },
    brandText: {
        color: '#1a6b50',
        fontSize: '20px',
        fontWeight: '800',
        letterSpacing: '0.5px',
    },
    linksContainer: {
        display: 'flex',
        gap: '8px',
        flex: 1,
        justifyContent: 'center',
        minWidth: 'max-content'
    },
    link: {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        textDecoration: 'none',
        color: '#555',
        padding: '8px 16px',
        borderRadius: '20px',
        fontSize: '14px',
        fontWeight: '600',
        transition: 'all 0.2s',
        background: 'transparent',
    },
    activeLink: {
        background: '#e8f5e9',
        color: '#2e7d5e',
    },
    linkIcon: {
        fontSize: '16px',
    },
    linkText: {
        whiteSpace: 'nowrap',
    },
    userContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        minWidth: 'fit-content'
    },
    userInfo: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
    },
    userName: {
        fontSize: '14px',
        fontWeight: '700',
        color: '#333',
    },
    userRole: {
        fontSize: '11px',
        color: '#888',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
    },
    logoutBtn: {
        background: '#fee2e2',
        color: '#ef4444',
        border: 'none',
        borderRadius: '8px',
        padding: '8px 16px',
        fontWeight: '700',
        fontSize: '13px',
        cursor: 'pointer',
        transition: 'background 0.2s',
    },
};

export default NavBar;
=======
const NAV_ITEMS = [
  { name:'Dashboard',  path:'/dashboard', icon:'🏠' },
  { name:'Hydration',  path:'/hydration',  icon:'💧' },
  { name:'Yoga',       path:'/yoga',        icon:'🧘' },
  { name:'Walking',    path:'/walking',     icon:'🚶' },
  { name:'BMI',        path:'/bmi',         icon:'⚖️'  },
  { name:'Trainers',   path:'/trainers',    icon:'🏋️' },
  { name:'Diet',       path:'/diet',        icon:'🥗' },
  { name:'Blog',       path:'/blog',         icon:'📚' },
];

export default function NavBar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  if (!user) return null;

  const initials = user?.name
    ? user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    : 'U';

  return (
    <nav className="wn-sidebar">
      {/* Brand */}
      <div className="wn-sidebar-brand">
        <div className="wn-sidebar-brand-icon">🌿</div>
        <span className="wn-sidebar-brand-text">WellNest</span>
      </div>

      {/* Menu label */}
      <div className="wn-sidebar-menu-label">MENU</div>

      {/* Links */}
      <div className="wn-sidebar-links">
        {NAV_ITEMS.filter(item => {
          if (user?.role === 'admin') {
            // Admin only needs Dashboard link (internal tabs handle the rest)
            return item.name === 'Dashboard';
          }
          return true;
        }).map(item => {
          const path = (user?.role === 'admin' && item.name === 'Dashboard') 
            ? '/admin-dashboard' 
            : item.path;
          const active = location.pathname === path;
          
          return (
            <Link
              key={item.name}
              to={path}
              className={`wn-sidebar-link${active ? ' active' : ''}`}
            >
              <span className="wn-sidebar-link-icon">{item.icon}</span>
              <span className="wn-sidebar-link-label">{item.name}</span>
              {active && <span className="wn-sidebar-active-dot" />}
            </Link>
          );
        })}
      </div>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* User */}
      <div className="wn-sidebar-user">
        <div className="wn-sidebar-avatar">{initials}</div>
        <div className="wn-sidebar-user-info">
          <div className="wn-sidebar-username">{user?.name || 'User'}</div>
          <div className="wn-sidebar-role">{user?.role === 'admin' ? 'Admin' : user?.role === 'trainer' ? 'Trainer' : 'Member'}</div>
        </div>
        <button className="wn-sidebar-logout-btn" onClick={logout} title="Logout">⏻</button>
      </div>
    </nav>
  );
}
>>>>>>> 43b7b37 (Initial commit: Health and Wellness project)
