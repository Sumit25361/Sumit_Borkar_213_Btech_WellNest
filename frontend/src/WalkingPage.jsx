import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useDailyLogs } from './useDailyLogs';

const WALK_TYPES = ['Morning Walk', 'Evening Walk', 'Brisk Walk', 'Nature Trail', 'Night Walk', 'Treadmill'];

const WalkingPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [walkType, setWalkType] = useState('Morning Walk');
    const [steps, setSteps] = useState(2000);
    const [duration, setDuration] = useState(20);
    const { logs: log, addLog, removeLog: handleRemoveLog } = useDailyLogs('walking', [], user?.email);

    // Improved formula: Steps for distance base + Duration for activity time
    const caloriesBurned = Math.round((steps * 0.03) + (duration * 1.5));
    
    const handleLog = (e) => {
        e.preventDefault();
        const id = Date.now();
        const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        addLog({ 
            id, 
            type: walkType,
            steps: parseInt(steps), 
            duration: parseInt(duration), 
            kcal: caloriesBurned, 
            time: now 
        });
    };

    const totalSteps = log.reduce((sum, e) => sum + e.steps, 0);
    const goal = 10000;
    const pct = Math.min(100, Math.round((totalSteps / goal) * 100));

    return (
        <div style={s.page}>
            <header style={s.header}>
                <button onClick={() => navigate('/dashboard')} style={s.back}>← Back</button>
                <div style={s.headerTitle}>
                    <span style={s.headerIcon}>🏃‍♂️</span>
                    <h1 style={s.brand}>Walking Tracker</h1>
                </div>
            </header>
            
            <div style={s.body}>
                {/* Left Column */}
                <div style={s.left}>
                    <div style={s.card}>
                        <h3 style={s.cardTitle}>Daily Step Goal</h3>
                        <p style={s.sub}>Goal: {goal.toLocaleString()} steps | Done: {totalSteps.toLocaleString()} steps</p>
                        <div style={s.bar}><div style={{ ...s.fill, width: pct + '%' }} /></div>
                        <p style={s.pct}>{pct}% of daily goal</p>
                    </div>

                    <div style={s.card}>
                        <h3 style={s.cardTitle}>+ Log Walk</h3>
                        <form onSubmit={handleLog}>
                            <label style={s.label}>Walk Type</label>
                            <select 
                                value={walkType} 
                                onChange={e => setWalkType(e.target.value)} 
                                style={s.input}
                            >
                                {WALK_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>

                            <label style={s.label}>Steps</label>
                            <input 
                                type="number" 
                                value={steps} 
                                onChange={e => setSteps(e.target.value)} 
                                style={s.input} 
                                min="1" 
                            />

                            <label style={s.label}>Duration (minutes)</label>
                            <input 
                                type="number" 
                                value={duration} 
                                onChange={e => setDuration(e.target.value)} 
                                style={s.input} 
                                min="1" 
                            />

                            <div style={s.estimateBox}>
                                <span style={s.estimateLabel}>Estimated Calories Burned:</span>
                                <span style={s.estimateVal}>{caloriesBurned} kcal</span>
                            </div>

                            <button type="submit" style={s.btn}>Log Walk</button>
                        </form>
                    </div>
                </div>

                {/* Right Column */}
                <div style={s.right}>
                    <div style={{...s.card, flex: 1}}>
                        <h3 style={s.cardTitle}>📋 Today's Walks</h3>
                        {log.length === 0 && <p style={s.sub}>No walks logged yet. Let's hit the trail! 🚶‍♂️</p>}
                        <div style={s.historyList}>
                            {log.map((e) => (
                                <div key={e.id} style={s.row}>
                                    <span style={s.rowIcon}>🏃‍♂️</span>
                                    <div style={{ flex: 1 }}>
                                        <p style={s.rowTitle}>{e.type}</p>
                                        <p style={s.rowSub}>{e.steps.toLocaleString()} steps • {e.duration} min • {e.kcal} kcal</p>
                                    </div>
                                    <span style={s.rowTime}>{e.time}</span>
                                    <button onClick={() => handleRemoveLog(e.id)} style={s.deleteBtn}>❌</button>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <div style={s.tipCard}>
                        <h3 style={{...s.cardTitle, color: '#10b981'}}>💡 Walking Tip</h3>
                        <p style={s.tipTxt}>Brisk walking for just 30 minutes a day can significantly improve your cardiovascular health and boost your mood. Don't forget to stay hydrated!</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const s = {
    page: { minHeight: '100vh', background: 'linear-gradient(160deg, #061a06 0%, #030803 45%, #010401 100%)', fontFamily: "'Outfit', sans-serif", color: '#fdf6f0' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 32px', background: 'rgba(5,15,5,0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(16,185,129,0.15)', boxShadow: '0 4px 32px rgba(0,0,0,0.6)' },
    headerTitle: { display: 'flex', alignItems: 'center', gap: '12px' },
    headerIcon: { fontSize: '24px' },
    brand: { color: '#fdf6f0', fontSize: '1.2rem', fontWeight: '700', margin: 0, fontFamily: "'Cinzel', serif" },
    back: { background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '10px', padding: '8px 18px', color: '#10b981', cursor: 'pointer', fontWeight: '700', fontSize: '13px' },
    body: { display: 'flex', gap: '24px', padding: '32px', maxWidth: '1200px', margin: '0 auto', flexWrap: 'wrap' },
    left: { flex: 1.1, minWidth: '340px', display: 'flex', flexDirection: 'column', gap: '20px' },
    right: { flex: 1, minWidth: '320px', display: 'flex', flexDirection: 'column', gap: '20px' },
    card: { background: 'rgba(10,30,10,0.4)', backdropFilter: 'blur(32px)', borderRadius: '22px', padding: '28px', border: '1px solid rgba(16,185,129,0.12)', boxShadow: '0 12px 48px rgba(0,0,0,0.4)' },
    cardTitle: { color: '#10b981', fontWeight: '800', fontSize: '15px', margin: '0 0 20px', textTransform: 'uppercase', letterSpacing: '1px' },
    sub: { fontSize: '13px', color: 'rgba(253,246,240,0.5)', margin: '0 0 12px' },
    bar: { background: 'rgba(255,255,255,0.05)', borderRadius: '100px', height: '14px', overflow: 'hidden', marginBottom: '10px' },
    fill: { background: 'linear-gradient(90deg, #059669, #10b981, #34d399)', height: '100%', borderRadius: '100px', transition: 'width 0.6s' },
    pct: { fontWeight: '800', fontSize: '14px', color: '#34d399', margin: 0 },
    label: { display: 'block', fontSize: '11px', fontWeight: '700', color: 'rgba(253,246,240,0.4)', textTransform: 'uppercase', marginBottom: '8px' },
    input: { width: '100%', padding: '14px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(16,185,129,0.15)', borderRadius: '12px', color: '#fdf6f0', fontSize: '15px', outline: 'none', marginBottom: '20px' },
    estimateBox: { background: 'rgba(16,185,129,0.08)', borderRadius: '12px', padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', border: '1px solid rgba(16,185,129,0.1)' },
    estimateLabel: { fontSize: '13px', fontWeight: '600', color: 'rgba(253,246,240,0.7)' },
    estimateVal: { fontSize: '15px', fontWeight: '800', color: '#34d399' },
    btn: { width: '100%', padding: '15px', background: 'linear-gradient(135deg, #10b981, #059669, #7c3aed)', borderRadius: '14px', border: 'none', color: '#fff', fontWeight: '800', fontSize: '16px', cursor: 'pointer', boxShadow: '0 8px 24px rgba(16, 185, 129,0.3)' },
    historyList: { display: 'flex', flexDirection: 'column', gap: '0' },
    row: { display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 0', borderBottom: '1px solid rgba(16,185,129,0.08)' },
    rowIcon: { fontSize: '20px' },
    rowTitle: { fontSize: '14px', fontWeight: '700', margin: 0 },
    rowSub: { fontSize: '12px', color: 'rgba(253,246,240,0.5)', margin: 0 },
    rowTime: { marginLeft: 'auto', fontSize: '12px', color: 'rgba(253,246,240,0.3)', marginRight: '10px' },
    deleteBtn: { background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', padding: '4px', opacity: 0.5 },
    tipCard: { background: 'rgba(5,20,5,0.7)', borderRadius: '18px', padding: '20px', border: '1px solid rgba(16,185,129,0.2)', marginTop: '10px' },
    tipTxt: { fontSize: '13px', lineHeight: '1.7', color: 'rgba(253,246,240,0.7)', margin: 0 }
};

export default WalkingPage;
