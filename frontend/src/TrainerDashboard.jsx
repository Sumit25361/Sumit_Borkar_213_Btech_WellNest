import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './index.css';

const TRAINER_INFO = {
    'priya.sharma@gmail.com':  { name:'Priya Sharma',  spec:'Weight Loss & Nutrition',   gradient:'linear-gradient(135deg,#16a34a,#15803d)', price:'₹1,200/session' },
    'arjun.mehta@gmail.com':   { name:'Arjun Mehta',   spec:'Strength & Muscle Building', gradient:'linear-gradient(135deg,#6366f1,#4f46e5)', price:'₹1,500/session' },
    'sneha.patel@gmail.com':   { name:'Sneha Patel',   spec:'Yoga & Flexibility',         gradient:'linear-gradient(135deg,#f59e0b,#d97706)', price:'₹800/session'  },
    'ravi.kumar@gmail.com':    { name:'Ravi Kumar',    spec:'Cardio & Endurance',          gradient:'linear-gradient(135deg,#ef4444,#dc2626)', price:'₹1,000/session' },
    'ananya.singh@gmail.com':  { name:'Ananya Singh',  spec:'Posture & Rehab',             gradient:'linear-gradient(135deg,#3b82f6,#2563eb)', price:'₹1,800/session' },
    'karan.joshi@gmail.com':   { name:'Karan Joshi',   spec:'General Fitness & Lifestyle', gradient:'linear-gradient(135deg,#8b5cf6,#7c3aed)', price:'₹700/session'  },
};

const STATUS_COLORS = {
    confirmed: { bg:'rgba(34,197,94,0.12)',  border:'rgba(34,197,94,0.35)',  text:'#86efac', label:'✅ Confirmed'  },
    pending:   { bg:'rgba(251,191,36,0.10)', border:'rgba(251,191,36,0.35)', text:'#fde68a', label:'⏳ Pending'    },
    cancelled: { bg:'rgba(248,113,113,0.10)',border:'rgba(248,113,113,0.30)',text:'#fca5a5', label:'❌ Cancelled'  },
};

function fmtDate(iso) {
    const d = new Date(iso);
    return d.toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' }) +
           ' · ' + d.toLocaleTimeString('en-IN', { hour:'2-digit', minute:'2-digit' });
}

function getInitials(name) {
    if (!name) return '?';
    return name.split(' ').map(w => w[0] || '').join('').toUpperCase();
}

export default function TrainerDashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const info = TRAINER_INFO[user?.email] || { name: user?.name || 'Trainer', spec: 'Fitness Coach', gradient:'linear-gradient(135deg,#e8621a,#d97706)', price:'' };
    const initials = getInitials(info.name);

    const [bookings, setBookings] = useState([]);
    const [filter, setFilter]     = useState('all');

    const INDIAN_DEMO_USERS = [
        { name:'Rohan Sharma',    email:'rohan.s@gmail.com'    },
        { name:'Megha Gupta',     email:'megha.g@gmail.com'    },
        { name:'Siddharth Verma', email:'sid.verma@gmail.com'  },
        { name:'Ishaan Malhotra', email:'ishaan.m@gmail.com'   },
        { name:'Anjali Rao',      email:'anjali.rao@gmail.com' },
        { name:'Amit Patel',      email:'amit.patel@gmail.com' },
        { name:'Shweta Tiwari',   email:'shweta.t@gmail.com'   },
        { name:'Rajesh Khanna',   email:'rajesh.k@gmail.com'   },
        { name:'Sunita Iyer',     email:'sunita.i@gmail.com'   },
        { name:'Vikram Rathore',  email:'vikram.r@gmail.com'   },
        { name:'Priya Nair',      email:'priya.nair@gmail.com' },
        { name:'Manish Pandey',   email:'manish.p@gmail.com'   },
        { name:'Kavita Seth',     email:'kavita.s@gmail.com'   },
        { name:'Suresh Raina',    email:'suresh.r@gmail.com'   },
        { name:'Lata Mangeshkar', email:'lata.m@gmail.com'     },
    ];

    useEffect(() => {
        if (!user?.email) return;
        const all = (() => { try { return JSON.parse(localStorage.getItem('wn_bookings') || '[]'); } catch { return []; } })();
        const mine = all.filter(b => b.trainerEmail === user.email);

        if (mine.length === 0) {
            // Seed unique Indian demo users based on trainer email hash
            const now = Date.now();
            const emailHash = user.email.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
            const startIndex = emailHash % INDIAN_DEMO_USERS.length;
            const count = 4 + (emailHash % 3); // 4 to 6 users per trainer

            const demo = [];
            for (let i = 0; i < count; i++) {
                const u = INDIAN_DEMO_USERS[(startIndex + i) % INDIAN_DEMO_USERS.length];
                demo.push({
                    id: now + i,
                    trainerEmail: user.email,
                    trainerName:  info.name,
                    userName:  u.name,
                    userEmail: u.email,
                    bookedAt:  new Date(now - (i * 2 + (emailHash % 5) + 1) * 24 * 60 * 60 * 1000).toISOString(),
                    status: i % 3 === 0 ? 'confirmed' : i % 3 === 1 ? 'pending' : 'cancelled',
                });
            }

            const updated = [...all, ...demo];
            localStorage.setItem('wn_bookings', JSON.stringify(updated));
            setBookings(demo);
        } else {
            setBookings(mine);
        }
    }, [user, info.name]);

    const handleCancel = (bookingId) => {
        const all = (() => { try { return JSON.parse(localStorage.getItem('wn_bookings') || '[]'); } catch { return []; } })();
        const updated = all.map(b => b.id === bookingId ? { ...b, status: 'cancelled' } : b);
        localStorage.setItem('wn_bookings', JSON.stringify(updated));
        setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: 'cancelled' } : b));
    };

    const handleConfirm = (bookingId) => {
        const all = (() => { try { return JSON.parse(localStorage.getItem('wn_bookings') || '[]'); } catch { return []; } })();
        const updated = all.map(b => b.id === bookingId ? { ...b, status: 'confirmed' } : b);
        localStorage.setItem('wn_bookings', JSON.stringify(updated));
        setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: 'confirmed' } : b));
    };

    const handleLogout = () => { logout(); navigate('/login'); };

    const shown = filter === 'all' ? bookings : bookings.filter(b => (b.status || 'confirmed') === filter);

    const totalConfirmed = bookings.filter(b => (b.status || 'confirmed') === 'confirmed').length;
    const totalPending   = bookings.filter(b => b.status === 'pending').length;
    const totalCancelled = bookings.filter(b => b.status === 'cancelled').length;

    return (
        <>
            <div className="trd-topbar">
                <div>
                    <h1 className="trd-title">{info.name.split(' ')[0]}'s Dashboard</h1>
                    <p className="trd-subtitle">Manage your booked sessions</p>
                </div>
                <div className="trd-live-badge">🟢 Live</div>
            </div>

                {/* Stats */}
                <div className="trd-stats-row">
                    <div className="trd-stat-card">
                        <div className="trd-stat-icon">📅</div>
                        <div className="trd-stat-num">{bookings.length}</div>
                        <div className="trd-stat-label">Total Bookings</div>
                    </div>
                    <div className="trd-stat-card confirmed">
                        <div className="trd-stat-icon">✅</div>
                        <div className="trd-stat-num">{totalConfirmed}</div>
                        <div className="trd-stat-label">Confirmed</div>
                    </div>
                    <div className="trd-stat-card" style={{borderColor:'rgba(251,191,36,0.22)'}}>
                        <div className="trd-stat-icon">⏳</div>
                        <div className="trd-stat-num">{totalPending}</div>
                        <div className="trd-stat-label">Pending</div>
                    </div>
                    <div className="trd-stat-card cancelled">
                        <div className="trd-stat-icon">❌</div>
                        <div className="trd-stat-num">{totalCancelled}</div>
                        <div className="trd-stat-label">Cancelled</div>
                    </div>
                </div>

                {/* Filter tabs */}
                <div className="trd-filter-row">
                    {['all','confirmed','pending','cancelled'].map(f => (
                        <button
                            key={f}
                            className={`trd-filter-btn${filter === f ? ' active' : ''}`}
                            onClick={() => setFilter(f)}
                        >
                            {f.charAt(0).toUpperCase() + f.slice(1)}
                            <span className="trd-filter-count">
                                {f === 'all' ? bookings.length : bookings.filter(b => (b.status||'confirmed') === f).length}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Bookings table */}
                <div className="trd-card">
                    <div className="trd-card-header">
                        <h2 className="trd-card-title">👥 Booked Users</h2>
                        <span className="trd-card-count">{shown.length} session{shown.length !== 1 ? 's' : ''}</span>
                    </div>

                    {shown.length === 0 ? (
                        <div className="trd-empty">
                            <div className="trd-empty-icon">📭</div>
                            <p className="trd-empty-text">
                                {bookings.length === 0
                                    ? 'No sessions booked yet. Share your profile to get bookings!'
                                    : 'No sessions match this filter.'}
                            </p>
                        </div>
                    ) : (
                        <div className="trd-table-wrap">
                            <table className="trd-table">
                                <thead>
                                    <tr>
                                        <th className="trd-th">#</th>
                                        <th className="trd-th">User</th>
                                        <th className="trd-th">Email</th>
                                        <th className="trd-th">Booked On</th>
                                        <th className="trd-th">Status</th>
                                        <th className="trd-th">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {shown.map((b, i) => {
                                        const st = b.status || 'confirmed';
                                        const sc = STATUS_COLORS[st] || STATUS_COLORS.confirmed;
                                        const userInitials = getInitials(b.userName || '?');
                                        return (
                                            <tr key={b.id} className="trd-tr">
                                                <td className="trd-td trd-td-num">{i + 1}</td>
                                                <td className="trd-td">
                                                    <div className="trd-user-cell">
                                                        <div className="trd-user-avatar">{userInitials}</div>
                                                        <span className="trd-user-name">{b.userName}</span>
                                                    </div>
                                                </td>
                                                <td className="trd-td trd-td-email">{b.userEmail}</td>
                                                <td className="trd-td trd-td-date">{fmtDate(b.bookedAt)}</td>
                                                <td className="trd-td">
                                                    <span
                                                        className="trd-status-pill"
                                                        style={{background: sc.bg, border:`1px solid ${sc.border}`, color: sc.text}}
                                                    >
                                                        {sc.label}
                                                    </span>
                                                </td>
                                                <td className="trd-td">
                                                    <div style={{display:'flex',gap:6}}>
                                                        {st === 'cancelled' || st === 'pending' ? (
                                                            <button
                                                                className="trd-confirm-btn"
                                                                onClick={() => handleConfirm(b.id)}
                                                            >
                                                                ✅ Confirm
                                                            </button>
                                                        ) : null}
                                                        {st !== 'cancelled' ? (
                                                            <button
                                                                className="trd-cancel-btn"
                                                                onClick={() => handleCancel(b.id)}
                                                            >
                                                                Cancel
                                                            </button>
                                                        ) : (
                                                            <span className="trd-na">—</span>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
        </>
    );
}
