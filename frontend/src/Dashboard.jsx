import { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { useDailyLogs } from './useDailyLogs';
import './index.css';

const WEEKLY = [
  { day:'Mon', steps:7200,  water:2.0, yoga:30, cal:1800, score:72 },
  { day:'Tue', steps:9400,  water:2.3, yoga:45, cal:2050, score:88 },
  { day:'Wed', steps:5100,  water:1.5, yoga:0,  cal:1600, score:55 },
  { day:'Thu', steps:8800,  water:2.5, yoga:20, cal:1950, score:82 },
  { day:'Fri', steps:6500,  water:1.8, yoga:30, cal:1640, score:70 },
  { day:'Sat', steps:11000, water:3.0, yoga:60, cal:2200, score:96 },
  { day:'Sun', steps:4500,  water:1.2, yoga:15, cal:1500, score:48 },
];

const maxScore = Math.max(...WEEKLY.map(d => d.score));

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [weekMetric, setWeekMetric] = useState('score');
  
  const { logs: hydrationLogs } = useDailyLogs('hydration', [], user?.email);
  const { logs: walkingLogs } = useDailyLogs('walking', [], user?.email);
  const { logs: yogaLogs } = useDailyLogs('yoga', [], user?.email);
  const { logs: dietLogs } = useDailyLogs('diet', [], user?.email);

  const totalWater = hydrationLogs.reduce((s, e) => s + (e.amount || 0), 0) / 1000;
  const totalWaterVal = totalWater > 0 ? totalWater.toFixed(1) : '0';
  const totalSteps = walkingLogs.reduce((s, e) => s + (e.steps || 0), 0);
  const totalYoga = yogaLogs.reduce((s, e) => s + (e.mins || 0), 0);
  const totalCal = dietLogs.reduce((s, e) => s + (e.cal || 0), 0);

  const CARDS = [
    { title:'Hydration',      value: totalWaterVal, goal:'2.5 L',         icon:'💧', grad:'linear-gradient(135deg,#0284c7,#38bdf8)', glow:'rgba(56,189,248,0.30)',  route:'/hydration' },
    { title:'Walking',        value: totalSteps.toLocaleString(), goal:'10,000 steps',  icon:'🚶', grad:'linear-gradient(135deg,#15803d,#4ade80)', glow:'rgba(74,222,128,0.28)', route:'/walking'   },
    { title:'Yoga',           value: totalYoga.toString(),    goal:'45 mins',       icon:'🧘', grad:'linear-gradient(135deg,#7c3aed,#a855f7)', glow:'rgba(168,85,247,0.28)', route:'/yoga'      },
    { title:'Diet',           value: totalCal.toLocaleString(), goal:'2,000 kcal',    icon:'🥗', grad:'linear-gradient(135deg,#92400e,#f59e0b)', glow:'rgba(251,191,36,0.28)',  route:'/diet'      },
    { title:'BMI Calculator', value:'22.4',  goal:'Normal',        icon:'⚖️', grad:'linear-gradient(135deg,#10b981,#7c3aed)', glow:'rgba(16, 185, 129,0.25)',  route:'/bmi'       },
    { title:'View Trainers',  value:'6',     goal:'Expert Coaches',icon:'🏋️',grad:'linear-gradient(135deg,#be185d,#7c3aed)', glow:'rgba(190,24,93,0.25)',  route:'/trainers'  },
  ];

  const parseTime = (timeStr) => {
    if (!timeStr) return 0;
    const match = timeStr.match(/(\d+):(\d+) (AM|PM)/);
    if (!match) return 0;
    let [_, h, m, ampm] = match;
    h = parseInt(h);
    if (ampm === 'PM' && h < 12) h += 12;
    if (ampm === 'AM' && h === 12) h = 0;
    return h * 60 + parseInt(m);
  };

  let TODAY_LOGS = [
    ...hydrationLogs.map(l => ({ time: l.time, icon: '💧', label: 'Drank ' + (l.drink || 'Water'), detail: l.amount + ' ml logged', color: '#38bdf8', ts: parseTime(l.time) })),
    ...walkingLogs.map(l => ({ time: l.time, icon: '🚶', label: l.type || 'Walk', detail: `${l.steps} steps · ${l.duration} min`, color: '#4ade80', ts: parseTime(l.time) })),
    ...yogaLogs.map(l => ({ time: l.time, icon: l.icon || '🧘', label: `Yoga — ${l.type}`, detail: `${l.mins} min`, color: '#a855f7', ts: parseTime(l.time) })),
    ...dietLogs.map(l => ({ time: l.time, icon: l.icon || '🍛', label: `${l.meal} — ${l.food}`, detail: `${l.cal} kcal`, color: '#fbbf24', ts: parseTime(l.time) }))
  ].sort((a,b) => a.ts - b.ts).slice(-7);

  if (TODAY_LOGS.length === 0) {
    TODAY_LOGS = [{ time: '-', icon: '👋', label: 'No activity yet', detail: 'Start logging to see your timeline here!', color: '#9ca3af' }];
  }
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  const metricConfig = {
    score: { label:'Health Score', max:100,   unit:'',    color:'#34d399' },
    steps: { label:'Steps',        max:12000,  unit:'',    color:'#4ade80' },
    water: { label:'Water (L)',    max:3.5,    unit:'L',   color:'#38bdf8' },
    yoga:  { label:'Yoga (min)',   max:70,     unit:'min', color:'#a855f7' },
    cal:   { label:'Calories',     max:2500,   unit:'cal', color:'#fbbf24' },
  };
  const mc = metricConfig[weekMetric];

  return (
    <div className="wn-dashboard">
      <div style={{position:'absolute',top:-150,left:-100,width:500,height:500,background:'radial-gradient(circle,rgba(16, 185, 129,0.07) 0%,transparent 70%)',borderRadius:'50%',pointerEvents:'none'}}/>
      <div style={{position:'absolute',bottom:-100,right:-80,width:380,height:380,background:'radial-gradient(circle,rgba(124,58,237,0.08) 0%,transparent 70%)',borderRadius:'50%',pointerEvents:'none'}}/>

      <div className="wn-dashboard-inner">

        {/* Welcome banner */}
        <div className="wn-welcome-banner">
          <div style={{position:'absolute',right:50,top:-60,width:200,height:200,background:'radial-gradient(circle,rgba(16, 185, 129,0.12) 0%,transparent 70%)',borderRadius:'50%',pointerEvents:'none'}}/>
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
              onMouseEnter={e => { e.currentTarget.style.transform='translateY(-7px) scale(1.02)'; e.currentTarget.style.borderColor='rgba(16, 185, 129,0.38)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform=''; e.currentTarget.style.borderColor='rgba(16, 185, 129,0.10)'; }}
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
                { icon:'🚶', val: totalSteps.toLocaleString(), label:'Steps',   color:'#4ade80' },
                { icon:'💧', val: totalWaterVal + 'L',  label:'Water',   color:'#38bdf8' },
                { icon:'🧘', val: totalYoga + 'm',   label:'Yoga',    color:'#a855f7' },
                { icon:'🔥', val: totalCal.toLocaleString(),   label:'Cal in', color:'#34d399' },
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
                  <div className="dash-timeline-line" style={{background: i === TODAY_LOGS.length-1 ? 'transparent' : 'rgba(16, 185, 129,0.12)'}}/>
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
                { label:'Avg Score',  val: Math.round(WEEKLY.reduce((s,d)=>s+d.score,0)/7)+'%', color:'#34d399' },
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
