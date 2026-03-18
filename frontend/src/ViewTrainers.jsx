import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

const TRAINERS = [
    { id:1, name:'Priya Sharma',  email:'priya.sharma@gmail.com',  spec:'Weight Loss & Nutrition',  rating:4.9, reviews:128, exp:'6 yrs', tags:['Weight Loss','Cardio','Diet Plans'],           gradient:'linear-gradient(135deg,#16a34a,#15803d)', bio:'Certified nutritionist and fitness coach specializing in sustainable weight loss for busy individuals.', price:'₹1,200/session', recommended:true  },
    { id:2, name:'Arjun Mehta',   email:'arjun.mehta@gmail.com',   spec:'Strength & Muscle Building',rating:4.8, reviews:95,  exp:'8 yrs', tags:['Strength','Hypertrophy','Powerlifting'],      gradient:'linear-gradient(135deg,#6366f1,#4f46e5)', bio:'Former national powerlifter helping beginners to advanced athletes build strength safely.',            price:'₹1,500/session', recommended:false },
    { id:3, name:'Sneha Patel',   email:'sneha.patel@gmail.com',   spec:'Yoga & Flexibility',        rating:4.9, reviews:214, exp:'10 yrs', tags:['Yoga','Meditation','Flexibility'],            gradient:'linear-gradient(135deg,#f59e0b,#d97706)', bio:'RYT-500 certified yoga instructor with expertise in Hatha, Vinyasa, and therapeutic yoga.',            price:'₹800/session',  recommended:true  },
    { id:4, name:'Ravi Kumar',    email:'ravi.kumar@gmail.com',    spec:'Cardio & Endurance',         rating:4.7, reviews:76,  exp:'5 yrs', tags:['Running','HIIT','Cycling'],                   gradient:'linear-gradient(135deg,#ef4444,#dc2626)', bio:'Marathon runner turned coach, helping people improve stamina and cardiovascular fitness.',               price:'₹1,000/session', recommended:false },
    { id:5, name:'Ananya Singh',  email:'ananya.singh@gmail.com',  spec:'Posture & Rehab',            rating:4.8, reviews:63,  exp:'7 yrs', tags:['Posture','Rehab','Core Strength'],            gradient:'linear-gradient(135deg,#3b82f6,#2563eb)', bio:'Physiotherapist-turned-trainer focused on injury prevention, posture correction and rehabilitation.',    price:'₹1,800/session', recommended:false },
    { id:6, name:'Karan Joshi',   email:'karan.joshi@gmail.com',   spec:'General Fitness & Lifestyle',rating:4.6, reviews:101, exp:'4 yrs', tags:['Lifestyle','Beginner Friendly','Home Workouts'], gradient:'linear-gradient(135deg,#8b5cf6,#7c3aed)', bio:'Friendly certified trainer who works best with beginners to build a sustainable fitness lifestyle.',  price:'₹700/session',  recommended:false },
];

const SPECS = ['All','Weight Loss','Strength','Yoga','Cardio','Rehab'];

// ── booking helpers ──────────────────────────────────────
function getBookings() {
    try { return JSON.parse(localStorage.getItem('wn_bookings') || '[]'); }
    catch { return []; }
}
function saveBookings(list) { localStorage.setItem('wn_bookings', JSON.stringify(list)); }

function TrainerCard({ trainer }) {
    const loggedUser = (() => { try { return JSON.parse(localStorage.getItem('user')); } catch { return null; } })();
    const alreadyBooked = getBookings().some(
        b => b.trainerEmail === trainer.email && b.userEmail === loggedUser?.email
    );
    const [booked, setBooked] = useState(alreadyBooked);
    const initials = trainer.name.split(' ').map(w=>w[0]).join('');
    const stars = '★'.repeat(Math.floor(trainer.rating)) + '☆'.repeat(5 - Math.floor(trainer.rating));

    const handleBook = () => {
        const bookings = getBookings();
        if (!booked) {
            bookings.push({
                id: Date.now(),
                trainerEmail: trainer.email,
                trainerName:  trainer.name,
                userName:  loggedUser?.name  || 'Anonymous',
                userEmail: loggedUser?.email || 'unknown',
                bookedAt:  new Date().toISOString(),
                status: 'pending',
            });
        } else {
            const idx = bookings.findIndex(
                b => b.trainerEmail === trainer.email && b.userEmail === loggedUser?.email
            );
            if (idx !== -1) bookings.splice(idx, 1);
        }
        saveBookings(bookings);
        setBooked(!booked);
    };

    return (
        <div className={`trainer-card${trainer.recommended ? ' recommended' : ''}`}>
            {trainer.recommended && <div className="trainer-rec-badge">⭐ Recommended</div>}
            <div className="trainer-avatar" style={{background: trainer.gradient}}>{initials}</div>
            <div className="trainer-name">{trainer.name}</div>
            <div className="trainer-spec">{trainer.spec}</div>
            <div className="trainer-stars">{stars} <span style={{color:'#374151',fontWeight:600}}>{trainer.rating}</span></div>
            <div className="trainer-meta">🏅 {trainer.exp} experience · {trainer.reviews} reviews</div>
            <div className="trainer-tags">{trainer.tags.map(t=><span key={t} className="trainer-tag">{t}</span>)}</div>
            <div className="trainer-bio">{trainer.bio}</div>
            <div className="trainer-price">{trainer.price}</div>
            <button
                className={`trainer-book-btn${booked ? ' booked' : ''}`}
                onClick={handleBook}
            >
                {booked ? '⏳ Booking Pending...' : '📅 Book a Session'}
            </button>
        </div>
    );
}

function ViewTrainers() {
    const navigate = useNavigate();
    const [search, setSearch]       = useState('');
    const [specFilter, setSpecFilter] = useState('All');

    const filtered = TRAINERS.filter(t => {
        const s = search.toLowerCase();
        const matchSearch = t.name.toLowerCase().includes(s) || t.spec.toLowerCase().includes(s) || t.tags.some(tg => tg.toLowerCase().includes(s));
        const matchSpec   = specFilter === 'All' || t.tags.some(tg => tg.includes(specFilter));
        return matchSearch && matchSpec;
    });

    return (
        <div className="trainers-page">
            <header className="trainers-header">
                <button className="trainers-back-btn" onClick={() => navigate('/dashboard')}>← Back</button>
                <h1 className="trainers-header-brand">🏋️ Our Expert Trainers</h1>
                <div style={{width:80}}/>
            </header>

            <div className="trainers-body">
                <div className="trainers-search-bar">
                    <input
                        type="text"
                        className="trainers-search-input"
                        placeholder="🔍 Search trainers, specialization..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                    {SPECS.map(s => (
                        <button key={s} className={`filter-pill${specFilter === s ? ' active' : ''}`} onClick={() => setSpecFilter(s)}>
                            {s}
                        </button>
                    ))}
                </div>

                {filtered.length === 0 ? (
                    <div style={{textAlign:'center', padding:'60px 20px', color:'#9ca3af'}}>
                        <div style={{fontSize:'3rem', marginBottom:12}}>🏋️</div>
                        <p>No trainers found matching your search.</p>
                    </div>
                ) : (
                    <div className="trainers-grid">
                        {filtered.map(t => <TrainerCard key={t.id} trainer={t} />)}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ViewTrainers;
