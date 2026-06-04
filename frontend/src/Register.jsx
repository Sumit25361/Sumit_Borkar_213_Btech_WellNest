import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './index.css';

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        age: '',
        weight: '',
        role: 'user'
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._%+-]+@gmail\.com$/i;
        return re.test(String(email).trim());
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const { name, email, password, confirmPassword, age, weight } = formData;

        if (name.length < 2) {
            setError('Please enter your full name');
            return;
        }

        if (!validateEmail(email)) {
            setError('Please enter a valid Gmail address (e.g., user@gmail.com)');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (!age || !weight) {
            setError('Please enter your age and weight');
            return;
        }

        setLoading(true);
        // Correctly passing the entire object
        const result = await register(formData);
        setLoading(false);

        if (result.success) {
            navigate('/login');
        } else {
            setError(result.message || 'Server error. Please try again later.');
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-left">
                <div className="auth-brand-block">
                    <div className="auth-brand-icon">🌿</div>
                    <div>
                        <div className="auth-brand-name">WellNest</div>
                        <div className="auth-brand-sub">Smart Health & Fitness Companion</div>
                    </div>
                </div>
                <div className="auth-tagline-block">
                    <h2>Start Your Wellness Journey</h2>
                    <p>Join our community and take control of your health with daily tracking, expert tips, and personalized plans.</p>
                </div>
                <div className="auth-features-list">
                    <div className="auth-feature-item"><span className="af-icon">🎯</span><span>Set personalized health goals</span></div>
                    <div className="auth-feature-item"><span className="af-icon">🥗</span><span>Track nutrition & calories</span></div>
                    <div className="auth-feature-item"><span className="af-icon">🔥</span><span>Build healthy daily streaks</span></div>
                    <div className="auth-feature-item"><span className="af-icon">📈</span><span>View your weekly progress</span></div>
                    <div className="auth-feature-item"><span className="af-icon">🏋️</span><span>Book sessions with trainers</span></div>
                </div>
            </div>

            <div className="auth-right">
                <div className="auth-card">
                    <div className="auth-card-title">Create Account ✨</div>
                    <p className="auth-card-sub">Fill in your details to get started</p>

                    {error && (
                        <div className="auth-error-msg">
                            ⚠️ {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="auth-field">
                            <label className="auth-field-label">Full Name</label>
                            <div className="auth-input-wrap">
                                <span className="auth-input-icon">👤</span>
                                <input
                                    type="text"
                                    name="name"
                                    className="auth-input"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="auth-field-row" style={{display:'flex', gap:'12px'}}>
                            <div className="auth-field" style={{flex:1}}>
                                <label className="auth-field-label">Age</label>
                                <div className="auth-input-wrap">
                                    <span className="auth-input-icon">📅</span>
                                    <input
                                        type="number"
                                        name="age"
                                        className="auth-input"
                                        placeholder="21"
                                        value={formData.age}
                                        onChange={handleChange}
                                        required
                                        min="1"
                                    />
                                </div>
                            </div>
                            <div className="auth-field" style={{flex:1}}>
                                <label className="auth-field-label">Weight (KG)</label>
                                <div className="auth-input-wrap">
                                    <span className="auth-input-icon">⚖️</span>
                                    <input
                                        type="number"
                                        name="weight"
                                        className="auth-input"
                                        placeholder="65"
                                        value={formData.weight}
                                        onChange={handleChange}
                                        required
                                        min="1"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="auth-field">
                            <label className="auth-field-label">Email Address</label>
                            <div className="auth-input-wrap">
                                <span className="auth-input-icon">📧</span>
                                <input
                                    type="email"
                                    name="email"
                                    className="auth-input"
                                    placeholder="yourname@gmail.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="auth-field">
                            <label className="auth-field-label">Password</label>
                            <div className="auth-input-wrap">
                                <span className="auth-input-icon">🔒</span>
                                <input
                                    type="password"
                                    name="password"
                                    className="auth-input"
                                    placeholder="Min 8 chars, A-z, 0-9, @$!"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="auth-field">
                            <label className="auth-field-label">Confirm Password</label>
                            <div className="auth-input-wrap">
                                <span className="auth-input-icon">🔒</span>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    className="auth-input"
                                    placeholder="Repeat your password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            className="auth-submit-btn" 
                            disabled={loading}
                            style={{background: 'linear-gradient(135deg, #34d399, #10b981)', marginTop: '24px'}}
                        >
                            {loading ? '⏳ Creating Account...' : '✨ Create My Account'}
                        </button>
                    </form>

                    <div className="auth-divider" style={{margin:'20px 0'}}>or</div>

                    <p className="auth-switch-link" style={{textAlign:'center'}}>
                        Already have an account? <Link to="/login" style={{color:'#10b981', fontWeight:'700'}}>Sign In →</Link>
                    </p>

                    <div className="auth-hint" style={{marginTop:'24px', background:'rgba(0,0,0,0.2)', padding:'12px', borderRadius:'12px', fontSize:'13px'}}>
                        💡 By joining, you get access to all premium WellNest features at zero cost.
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
