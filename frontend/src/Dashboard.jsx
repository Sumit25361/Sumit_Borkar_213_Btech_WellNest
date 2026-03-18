<<<<<<< HEAD
=======
import { useState } from 'react';
>>>>>>> 43b7b37 (Initial commit: Health and Wellness project)
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import './index.css';

<<<<<<< HEAD
function Dashboard() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const patientStats = [
        { title: 'Hydration', value: '1.5', goal: '2.5 L', icon: '💧', color: '#0284c7', route: '/hydration' },
        { title: 'Walking', value: '6,500', goal: '10,000 steps', icon: '🚶', color: '#16a34a', route: '/walking' },
        { title: 'Yoga', value: '30', goal: '45 mins', icon: '🧘', color: '#9333ea', route: '/yoga' },
        { title: 'Breathing', value: '2', goal: '3 sessions', icon: '🌬️', color: '#0ea5e9', route: '/breathing' },
        { title: 'Healthy Food', value: '1,400', goal: '2,000 kcal', icon: '🥗', color: '#ea580c', route: '/healthy-food' },
    ];

    return (
        <div style={styles.page}>
            {/* Main */}
            <main style={styles.main}>
                <h2 style={styles.welcome}>Welcome back, {user?.name || 'User'}! 👋</h2>
                <p style={styles.subtitle}>Here is your daily health overview.</p>

                <div style={styles.statsGrid}>
                    {patientStats.map((stat) => (
                        <div key={stat.title} style={styles.statCard} onClick={() => navigate(stat.route)} role="button" tabIndex={0}>
                            <div style={{ ...styles.iconBox, color: stat.color, background: `${stat.color}15` }}>
                                {stat.icon}
                            </div>
                            <div style={styles.statInfo}>
                                <h3 style={styles.statTitle}>{stat.title}</h3>
                                <p style={styles.statValue}>
                                    <span style={styles.currentValue}>{stat.value}</span>
                                    <span style={styles.goalValue}> / {stat.goal}</span>
                                </p>
                            </div>
                            <div style={styles.arrow}>➔</div>
                        </div>
                    ))}
                </div>
            </main>

            {/* Bottom badge */}
            <div style={styles.badge}>
                <span style={styles.badgeSmall}>getting</span>
                <span style={styles.badgeBig}>HEALTHIER</span>
                <span style={styles.badgeSmall}>everyday</span>
            </div>

            {/* Decorative leaves */}
            <div style={styles.leafTopLeft}>🌿</div>
            <div style={styles.leafBottomRight}>🌿</div>
        </div>
    );
}

const styles = {
    page: {
        minHeight: 'calc(100vh - 65px)', // subtract navbar height roughly
        background: 'linear-gradient(135deg, #a8d5c2 0%, #c8e6d8 40%, #b2dfd0 100%)',
        fontFamily: "'Segoe UI', sans-serif",
        position: 'relative',
        overflow: 'hidden',
    },
    main: {
        padding: '40px 32px 100px',
        maxWidth: '900px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 2,
    },
    welcome: {
        textAlign: 'center',
        fontSize: '28px',
        fontWeight: '700',
        color: '#1a3a2e',
        marginBottom: '8px',
        marginTop: 0,
    },
    subtitle: {
        textAlign: 'center',
        fontSize: '16px',
        color: '#3d6b59',
        marginBottom: '40px',
    },
    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px',
    },
    statCard: {
        background: '#fff',
        borderRadius: '16px',
        padding: '20px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        cursor: 'pointer',
        transition: 'transform 0.2s, boxShadow 0.2s',
    },
    iconBox: {
        width: '56px',
        height: '56px',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '28px',
    },
    statInfo: {
        flex: 1,
    },
    statTitle: {
        margin: '0 0 4px 0',
        fontSize: '15px',
        fontWeight: '600',
        color: '#555',
    },
    statValue: {
        margin: 0,
        display: 'flex',
        alignItems: 'baseline',
        gap: '4px',
    },
    currentValue: {
        fontSize: '22px',
        fontWeight: '800',
        color: '#222',
    },
    goalValue: {
        fontSize: '13px',
        color: '#888',
        fontWeight: '500',
    },
    arrow: {
        color: '#ccc',
        fontSize: '18px',
    },
    badge: {
        position: 'absolute',
        bottom: '28px',
        left: '32px',
        border: '3px solid #1a6b50',
        borderRadius: '50%',
        width: '110px',
        height: '110px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(255,255,255,0.7)',
        zIndex: 1,
    },
    badgeSmall: {
        color: '#1a6b50',
        fontSize: '11px',
        fontStyle: 'italic',
    },
    badgeBig: {
        color: '#1a3a2e',
        fontSize: '14px',
        fontWeight: '900',
        letterSpacing: '1px',
    },
    leafTopLeft: {
        position: 'absolute',
        top: '20px',
        left: '-10px',
        fontSize: '80px',
        opacity: 0.3,
        transform: 'rotate(30deg)',
        pointerEvents: 'none',
        zIndex: 0,
    },
    leafBottomRight: {
        position: 'absolute',
        bottom: '20px',
        right: '-10px',
        fontSize: '80px',
        opacity: 0.3,
        transform: 'rotate(-30deg) scaleX(-1)',
        pointerEvents: 'none',
        zIndex: 0,
    },
};

export default Dashboard;
=======
const CARDS = [
  { title:'Hydration',      value:'1.5',   goal:'2.5 L',         icon:'💧', grad:'linear-gradient(135deg,#0284c7,#38bdf8)', glow:'rgba(56,189,248,0.30)',  route:'/hydration' },
  { title:'Walking',        value:'6,500', goal:'10,000 steps',  icon:'🚶', grad:'linear-gradient(135deg,#15803d,#4ade80)', glow:'rgba(74,222,128,0.28)', route:'/walking'   },
  { title:'Yoga',           value:'30',    goal:'45 mins',       icon:'🧘', grad:'linear-gradient(135deg,#7c3aed,#a855f7)', glow:'rgba(168,85,247,0.28)', route:'/yoga'      },
  { title:'Diet',           value:'1,640', goal:'2,000 kcal',    icon:'🥗', grad:'linear-gradient(135deg,#92400e,#f59e0b)', glow:'rgba(251,191,36,0.28)',  route:'/diet'      },
  { title:'BMI Calculator', value:'22.4',  goal:'Normal',        icon:'⚖️', grad:'linear-gradient(135deg,#e8621a,#7c3aed)', glow:'rgba(232,98,26,0.25)',  route:'/bmi'       },
  { title:'View Trainers',  value:'6',     goal:'Expert Coaches',icon:'🏋️',grad:'linear-gradient(135deg,#be185d,#7c3aed)', glow:'rgba(190,24,93,0.25)',  route:'/trainers'  },
];

const WEEKLY = [
  { day:'Mon', steps:7200,  water:2.0, yoga:30, cal:1800, score:72 },
  { day:'Tue', steps:9400,  water:2.3, yoga:45, cal:2050, score:88 },
  { day:'Wed', steps:5100,  water:1.5, yoga:0,  cal:1600, score:55 },
  { day:'Thu', steps:8800,  water:2.5, yoga:20, cal:1950, score:82 },
  { day:'Fri', steps:6500,  water:1.8, yoga:30, cal:1640, score:70 },
  { day:'Sat', steps:11000, water:3.0, yoga:60, cal:2200, score:96 },
  { day:'Sun', steps:4500,  water:1.2, yoga:15, cal:1500, score:48 },
];

const TODAY_LOGS = [
  { time:'08:00 AM', icon:'🥣', label:'Breakfast — Oatmeal',       detail:'150 kcal · P:5g · C:27g',   color:'#fbbf24' },
  { time:'09:30 AM', icon:'🚶', label:'Morning Walk',               detail:'3,200 steps · 30 min',       color:'#4ade80' },
  { time:'10:30 AM', icon:'💧', label:'Drank Water',                detail:'500 ml logged',              color:'#38bdf8' },
  { time:'01:00 PM', icon:'🍛', label:'Lunch — Dal & Rice',         detail:'320 kcal · P:12g',           color:'#fbbf24' },
  { time:'04:00 PM', icon:'🧘', label:'Yoga Session — Warrior Pose',detail:'30 min · Intermediate',      color:'#a855f7' },
  { time:'06:00 PM', icon:'🚶', label:'Evening Walk',               detail:'3,300 steps · 25 min',       color:'#4ade80' },
  { time:'07:30 PM', icon:'💧', label:'Drank Water',                detail:'300 ml logged',              color:'#38bdf8' },
];

const maxScore = Math.max(...WEEKLY.map(d => d.score));

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [weekMetric, setWeekMetric] = useState('score');
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  const metricConfig = {
    score: { label:'Health Score', max:100,   unit:'',    color:'#f4894a' },
    steps: { label:'Steps',        max:12000,  unit:'',    color:'#4ade80' },
    water: { label:'Water (L)',    max:3.5,    unit:'L',   color:'#38bdf8' },
    yoga:  { label:'Yoga (min)',   max:70,     unit:'min', color:'#a855f7' },
    cal:   { label:'Calories',     max:2500,   unit:'cal', color:'#fbbf24' },
  };
  const mc = metricConfig[weekMetric];

  return (
    <div className="wn-dashboard">
      <div style={{position:'absolute',top:-150,left:-100,width:500,height:500,background:'radial-gradient(circle,rgba(232,98,26,0.07) 0%,transparent 70%)',borderRadius:'50%',pointerEvents:'none'}}/>
      <div style={{position:'absolute',bottom:-100,right:-80,width:380,height:380,background:'radial-gradient(circle,rgba(124,58,237,0.08) 0%,transparent 70%)',borderRadius:'50%',pointerEvents:'none'}}/>

      <div className="wn-dashboard-inner">

        {/* Welcome banner */}
        <div className="wn-welcome-banner">
          <div style={{position:'absolute',right:50,top:-60,width:200,height:200,background:'radial-gradient(circle,rgba(232,98,26,0.12) 0%,transparent 70%)',borderRadius:'50%',pointerEvents:'none'}}/>
          <div style={{position:'relative',zIndex:1}}>
            <h2 className="wn-welcome-title">{greeting}, {user?.name?.split(' ')[0] || 'User'}! 👋</h2>
            <p className="wn-welcome-sub">Here is your daily health overview. Stay consistent!</p>
          </div>
          <div className="wn-streak-badge" style={{position:'relative',zIndex:1}}>
            <div className="wn-streak-fire">🔥</div>
            <div className="wn-streak-num">5</div>
            <div className="wn-streak-label">Day Streak</div>
          </div>
        </div>

        {/* Quick nav cards */}
        <div className="wn-stats-grid">
          {CARDS.map((c, i) => (
            <div key={c.title} className="wn-stat-card" style={{animationDelay:`${i*0.08}s`}}
              onClick={() => navigate(c.route)} role="button" tabIndex={0}
              onKeyDown={e => e.key==='Enter' && navigate(c.route)}
              onMouseEnter={e => { e.currentTarget.style.transform='translateY(-7px) scale(1.02)'; e.currentTarget.style.borderColor='rgba(232,98,26,0.38)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform=''; e.currentTarget.style.borderColor='rgba(232,98,26,0.10)'; }}
            >
              <div className="wn-stat-icon" style={{background:c.grad,boxShadow:`0 6px 22px ${c.glow}`}}>{c.icon}</div>
              <div style={{flex:1}}>
                <div className="wn-stat-label">{c.title}</div>
                <div><span className="wn-stat-val">{c.value}</span><span className="wn-stat-goal"> / {c.goal}</span></div>
              </div>
              <div className="wn-stat-arrow">➔</div>
            </div>
          ))}
        </div>

        {/* ── Daily Activity + Weekly Report ── */}
        <div className="dash-two-col">

          {/* Daily Activity Timeline */}
          <div className="dash-panel">
            <div className="dash-panel-header">
              <span className="dash-panel-title">📅 Today's Activity</span>
              <span className="dash-panel-date">{new Date().toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'short'})}</span>
            </div>

            {/* Today summary pills */}
            <div className="dash-today-pills">
              {[
                { icon:'🚶', val:'6,500', label:'Steps',   color:'#4ade80' },
                { icon:'💧', val:'1.5L',  label:'Water',   color:'#38bdf8' },
                { icon:'🧘', val:'30m',   label:'Yoga',    color:'#a855f7' },
                { icon:'🔥', val:'482',   label:'Cal out', color:'#f4894a' },
              ].map(p => (
                <div key={p.label} className="dash-pill" style={{borderColor:`${p.color}44`}}>
                  <span style={{fontSize:16}}>{p.icon}</span>
                  <span style={{color:p.color,fontWeight:800,fontSize:14}}>{p.val}</span>
                  <span style={{color:'var(--muted)',fontSize:10}}>{p.label}</span>
                </div>
              ))}
            </div>

            {/* Timeline */}
            <div className="dash-timeline">
              {TODAY_LOGS.map((log, i) => (
                <div key={i} className="dash-timeline-item">
                  <div className="dash-timeline-time">{log.time}</div>
                  <div className="dash-timeline-dot" style={{background:log.color, boxShadow:`0 0 8px ${log.color}88`}}/>
                  <div className="dash-timeline-line" style={{background: i === TODAY_LOGS.length-1 ? 'transparent' : 'rgba(232,98,26,0.12)'}}/>
                  <div className="dash-timeline-content">
                    <div className="dash-timeline-icon">{log.icon}</div>
                    <div>
                      <div className="dash-timeline-label">{log.label}</div>
                      <div className="dash-timeline-detail">{log.detail}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Report */}
          <div className="dash-panel">
            <div className="dash-panel-header">
              <span className="dash-panel-title">📈 Weekly Report</span>
              <span className="dash-panel-date">This Week</span>
            </div>

            {/* Metric selector */}
            <div className="dash-metric-tabs">
              {Object.entries(metricConfig).map(([key, cfg]) => (
                <button key={key} onClick={() => setWeekMetric(key)}
                  className={`dash-metric-tab${weekMetric===key?' active':''}`}
                  style={weekMetric===key?{borderColor:cfg.color,color:cfg.color,background:`${cfg.color}18`}:{}}>
                  {cfg.label}
                </button>
              ))}
            </div>

            {/* Bar chart */}
            <div className="dash-bar-chart">
              {WEEKLY.map(d => {
                const val = d[weekMetric];
                const pct = Math.min(100, Math.round((val / mc.max) * 100));
                return (
                  <div key={d.day} className="dash-bar-col">
                    <div className="dash-bar-val" style={{color:mc.color}}>{val}{mc.unit==='L'?'L':mc.unit==='min'?'m':mc.unit==='cal'?'':''}</div>
                    <div className="dash-bar-wrap">
                      <div className="dash-bar-fill" style={{height:`${pct}%`, background:`linear-gradient(180deg,${mc.color},${mc.color}88)`, boxShadow:`0 0 8px ${mc.color}55`}}/>
                    </div>
                    <div className="dash-bar-day">{d.day}</div>
                  </div>
                );
              })}
            </div>

            {/* Weekly summary stats */}
            <div className="dash-week-summary">
              {[
                { label:'Avg Score',  val: Math.round(WEEKLY.reduce((s,d)=>s+d.score,0)/7)+'%', color:'#f4894a' },
                { label:'Total Steps',val: WEEKLY.reduce((s,d)=>s+d.steps,0).toLocaleString(),  color:'#4ade80' },
                { label:'Best Day',   val: WEEKLY.reduce((a,b)=>a.score>b.score?a:b).day,        color:'#a855f7' },
                { label:'Yoga Time',  val: WEEKLY.reduce((s,d)=>s+d.yoga,0)+' min',              color:'#38bdf8' },
              ].map(s => (
                <div key={s.label} className="dash-week-stat">
                  <div className="dash-week-stat-val" style={{color:s.color}}>{s.val}</div>
                  <div className="dash-week-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

{/* Trainer Matcher CTA */}
        <div className="dash-matcher-cta" onClick={() => navigate('/matcher')} role="button" tabIndex={0}
          onMouseEnter={e => e.currentTarget.style.transform='translateY(-5px)'}
          onMouseLeave={e => e.currentTarget.style.transform=''}
        >
          <div className="dash-matcher-content">
            <span className="dash-matcher-badge">NEW</span>
            <h3>Stop Guessing. Start Matching. 🎯</h3>
            <p>Our smart algorithm finds the best trainers for your specific fitness goals in seconds.</p>
            <button className="dash-matcher-btn">Find My Perfect Trainer</button>
          </div>
          <div className="dash-matcher-icon">🕵️‍♂️</div>
        </div>

        {/* Bottom badge */}
        <div className="wn-badge">
          <div className="wn-badge-circle">
            <span className="wn-badge-sm">getting</span>
            <span className="wn-badge-lg">HEALTHIER</span>
            <span className="wn-badge-sm">everyday</span>
          </div>
          <p className="wn-badge-txt">Every step counts. Stay consistent and your results will follow.</p>
        </div>
      </div>
    </div>
  );
}
>>>>>>> 43b7b37 (Initial commit: Health and Wellness project)
