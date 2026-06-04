import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useDailyLogs } from './useDailyLogs';

const YOGA_POSES = [
    { id: 'mountain', name: 'Mountain Pose', level: 'Beginner', desc: 'Stand tall, grounding all four corners of your feet.', color: '#ec4899' },
    { id: 'downward', name: 'Downward Dog', level: 'Beginner', desc: 'Form an inverted V-shape, stretching the spine.', color: '#3b82f6' },
    { id: 'warrior1', name: 'Warrior I', level: 'Intermediate', desc: 'Lunging pose that strengthens legs and opens hips.', color: '#f59e0b' },
    { id: 'tree', name: 'Tree Pose', level: 'Intermediate', desc: 'Balance on one foot, improving focus and stability.', color: '#10b981' },
    { id: 'child', name: 'Child\'s Pose', level: 'Beginner', desc: 'Restful pose that gently stretches hips and back.', color: '#8b5cf6' }
];

const YogaPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [selectedPose, setSelectedPose] = useState(YOGA_POSES[0]);
    const [duration, setDuration] = useState(10);
    const { logs: log, addLog, removeLog: handleRemoveLog } = useDailyLogs('yoga', [], user?.email);

    const handleLog = (e) => {
        e.preventDefault();
        const id = Date.now();
        const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        addLog({ 
            id, 
            type: selectedPose.name, 
            mins: parseInt(duration), 
            time: now,
            icon: '🧘' 
        });
    };

    const totalMins = log.reduce((sum, e) => sum + e.mins, 0);
    const sessionCount = log.length;

    return (
        <div style={s.page}>
            <header style={s.header}>
                <button onClick={() => navigate('/dashboard')} style={s.back}>← Back</button>
                <div style={s.headerTitle}>
                    <span style={s.headerIcon}>🧘</span>
                    <h1 style={s.brand}>Yoga Tracker</h1>
                </div>
            </header>
            
            <div style={s.body}>
                {/* Left Column */}
                <div style={s.left}>
                    <div style={s.card}>
                        <h3 style={s.cardTitle}>Today's Summary</h3>
                        <div style={s.summaryRow}>
                            <span style={s.summaryIcon}>🧘</span>
                            <span style={s.summaryLabel}>Total Practice Time:</span>
                            <span style={s.summaryVal}>{totalMins} min</span>
                        </div>
                        <div style={s.summaryRow}>
                            <span style={s.summaryIcon}>🚀</span>
                            <span style={s.summaryLabel}>Sessions Logged:</span>
                            <span style={s.summaryVal}>{sessionCount}</span>
                        </div>
                    </div>

                    <div style={s.card}>
                        <h3 style={s.cardTitle}>✅ Yoga Poses</h3>
                        <div style={s.poseList}>
                            {YOGA_POSES.map(pose => (
                                <div 
                                    key={pose.id} 
                                    onClick={() => setSelectedPose(pose)}
                                    style={{
                                        ...s.poseItem, 
                                        borderColor: selectedPose.id === pose.id ? pose.color : 'rgba(16, 185, 129,0.1)'
                                    }}
                                >
                                    <div style={s.poseHeader}>
                                        <span style={s.poseName}>{pose.name}</span>
                                        <span style={{...s.levelPill, background: pose.level === 'Beginner' ? '#10b98133' : '#f59e0b33', color: pose.level === 'Beginner' ? '#10b981' : '#f59e0b'}}>{pose.level}</span>
                                    </div>
                                    <p style={s.poseDesc}>{pose.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div style={s.right}>
                    <div style={s.card}>
                        <h3 style={s.cardTitle}>✨ Log Session</h3>
                        <p style={s.selectedName}>{selectedPose.name}</p>
                        <p style={s.selectedDesc}>{selectedPose.desc}</p>
                        
                        <form onSubmit={handleLog}>
                            <label style={s.label}>Duration (minutes)</label>
                            <input 
                                type="number" 
                                value={duration} 
                                onChange={e => setDuration(e.target.value)} 
                                style={s.input} 
                                min="1" 
                            />
                            <button type="submit" style={s.btn}>Log Session</button>
                        </form>
                    </div>

                    <div style={{...s.card, flex: 1}}>
                        <h3 style={s.cardTitle}>📜 Today's Sessions</h3>
                        {log.length === 0 && <p style={s.sub}>No sessions logged yet. Ready to flow? 🌿</p>}
                        <div style={s.historyList}>
                            {log.map((e) => (
                                <div key={e.id} style={s.row}>
                                    <span style={s.rowIcon}>{e.icon}</span>
                                    <div style={{ flex: 1 }}>
                                        <p style={s.rowTitle}>{e.type}</p>
                                        <p style={s.rowSub}>{e.mins} min</p>
                                    </div>
                                    <span style={s.rowTime}>{e.time}</span>
                                    <button onClick={() => handleRemoveLog(e.id)} style={s.deleteBtn}>❌</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const s = {
    page: { minHeight: '100vh', background: 'linear-gradient(160deg, #040a06 0%, #08100b 45%, #050308 100%)', fontFamily: "'Outfit', sans-serif", color: '#fdf6f0' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 32px', background: 'rgba(6, 14, 10,0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(16, 185, 129,0.15)', boxShadow: '0 4px 32px rgba(0,0,0,0.6)' },
    headerTitle: { display: 'flex', alignItems: 'center', gap: '12px' },
    headerIcon: { fontSize: '24px' },
    brand: { color: '#fdf6f0', fontSize: '1.2rem', fontWeight: '700', margin: 0, fontFamily: "'Cinzel', serif" },
    back: { background: 'rgba(16, 185, 129,0.1)', border: '1px solid rgba(16, 185, 129,0.3)', borderRadius: '10px', padding: '8px 18px', color: '#10b981', cursor: 'pointer', fontWeight: '700', fontSize: '13px' },
    body: { display: 'flex', gap: '24px', padding: '32px', maxWidth: '1200px', margin: '0 auto', flexWrap: 'wrap' },
    left: { flex: 1.2, minWidth: '340px', display: 'flex', flexDirection: 'column', gap: '20px' },
    right: { flex: 1, minWidth: '320px', display: 'flex', flexDirection: 'column', gap: '20px' },
    card: { background: 'rgba(10, 22, 15,0.4)', backdropFilter: 'blur(32px)', borderRadius: '22px', padding: '28px', border: '1px solid rgba(16, 185, 129,0.12)', boxShadow: '0 12px 48px rgba(0,0,0,0.4)' },
    cardTitle: { color: '#34d399', fontWeight: '800', fontSize: '15px', margin: '0 0 20px', textTransform: 'uppercase', letterSpacing: '1px' },
    summaryRow: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' },
    summaryIcon: { fontSize: '18px', filter: 'drop-shadow(0 0 8px rgba(16, 185, 129,0.4))' },
    summaryLabel: { fontSize: '14px', color: 'rgba(253,246,240,0.6)', flex: 1 },
    summaryVal: { fontSize: '15px', fontWeight: '800', color: '#fdf6f0' },
    poseList: { display: 'flex', flexDirection: 'column', gap: '12px' },
    poseItem: { padding: '16px', borderRadius: '14px', background: 'rgba(255,255,255,0.03)', border: '1px solid transparent', cursor: 'pointer', transition: 'all 0.25s' },
    poseHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' },
    poseName: { fontSize: '15px', fontWeight: '700', color: '#fdf6f0' },
    levelPill: { fontSize: '10px', fontWeight: '800', padding: '3px 9px', borderRadius: '50px', textTransform: 'uppercase' },
    poseDesc: { fontSize: '12px', color: 'rgba(253,246,240,0.5)', margin: 0, lineHeight: '1.5' },
    selectedName: { fontSize: '1.4rem', fontWeight: '800', color: '#fdf6f0', marginBottom: '4px', letterSpacing: '-0.5px' },
    selectedDesc: { fontSize: '13px', color: 'rgba(253,246,240,0.6)', marginBottom: '24px', lineHeight: '1.6' },
    label: { display: 'block', fontSize: '11px', fontWeight: '700', color: 'rgba(253,246,240,0.4)', textTransform: 'uppercase', marginBottom: '8px' },
    input: { width: '100%', padding: '14px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(16, 185, 129,0.15)', borderRadius: '12px', color: '#fdf6f0', fontSize: '15px', outline: 'none', marginBottom: '20px' },
    btn: { width: '100%', padding: '15px', background: 'linear-gradient(135deg, #10b981, #059669, #7c3aed)', borderRadius: '14px', border: 'none', color: '#fff', fontWeight: '800', fontSize: '16px', cursor: 'pointer', boxShadow: '0 8px 24px rgba(16, 185, 129,0.3)' },
    historyList: { display: 'flex', flexDirection: 'column', gap: '0' },
    row: { display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 0', borderBottom: '1px solid rgba(16, 185, 129,0.08)' },
    rowIcon: { fontSize: '20px' },
    rowTitle: { fontSize: '14px', fontWeight: '700', margin: 0 },
    rowSub: { fontSize: '12px', color: 'rgba(253,246,240,0.5)', margin: 0 },
    rowTime: { marginLeft: 'auto', fontSize: '12px', color: 'rgba(253,246,240,0.3)', marginRight: '10px' },
    deleteBtn: { background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', padding: '4px', opacity: 0.5 },
    sub: { fontSize: '13px', color: 'rgba(253,246,240,0.4)' }
};

export default YogaPage;
