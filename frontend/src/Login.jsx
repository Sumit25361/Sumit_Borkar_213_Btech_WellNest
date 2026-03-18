<<<<<<< HEAD
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
=======
import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
>>>>>>> 43b7b37 (Initial commit: Health and Wellness project)
import { useAuth } from './AuthContext';
import './index.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
<<<<<<< HEAD
    const { login } = useAuth();
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        return re.test(String(email).toLowerCase());
=======
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Pre-fill email if coming from trainer page
    const trainerEmail = location.state?.trainerEmail || '';
    const trainerName  = location.state?.trainerName  || '';

    useEffect(() => {
        if (trainerEmail) {
            setEmail(trainerEmail);
        }
    }, [trainerEmail]);

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._%+-]+@gmail\.com$/i;
        return re.test(String(email).trim());
>>>>>>> 43b7b37 (Initial commit: Health and Wellness project)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

<<<<<<< HEAD
        if (!validateEmail(email)) {
=======
        const trimmedEmail = email.trim();

        if (!validateEmail(trimmedEmail)) {
>>>>>>> 43b7b37 (Initial commit: Health and Wellness project)
            setError('Please enter a valid Gmail address (e.g., user@gmail.com)');
            return;
        }

<<<<<<< HEAD
        const result = await login(email, password);
        if (result.success) {
            if (result.role === 'admin') {
                navigate('/admin-dashboard');
=======
        setLoading(true);
        const result = await login(trimmedEmail, password);
        setLoading(false);

        if (result.success) {
            if (result.role === 'admin') {
                navigate('/admin-dashboard');
            } else if (result.role === 'trainer') {
                navigate('/trainer-dashboard');
>>>>>>> 43b7b37 (Initial commit: Health and Wellness project)
            } else {
                navigate('/dashboard');
            }
        } else {
            setError(result.message);
        }
    };

    return (
<<<<<<< HEAD
        <div className="login-container">
            <div className="login-box">
                <div className="logo-section">
                    <h1 className="brand-logo">Health & Wellness</h1>
                    <h2>Welcome Back</h2>
                    <p>Login to your account</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    {error && <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
                    <div className="input-group">
                        <input
                            type="text"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder=" "
                        />
                        <label>Email (Gmail only)</label>
                    </div>

                    <div className="input-group">
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder=" "
                        />
                        <label>Password</label>
                    </div>

                    <div className="actions">
                        <Link to="/forgot-password" className="forgot-email">
                            Forgot password?
                        </Link>
                    </div>

                    <div className="footer-actions">
                        <Link to="/register" className="create-account">
                            Create account
                        </Link>

                        <button type="submit" className="next-btn">
                            Next
                        </button>
                    </div>

                </form>
=======
        <div className="auth-page">
            {/* Left branding panel */}
            <div className="auth-left">
                <div className="auth-brand-block">
                    <div className="auth-brand-icon">🌿</div>
                    <div>
                        <div className="auth-brand-name">WellNest</div>
                        <div className="auth-brand-sub">Smart Health & Fitness Companion</div>
                    </div>
                </div>
                <div className="auth-tagline-block">
                    <h2>Track Your Fitness Journey</h2>
                    <p>Monitor your health, stay hydrated, practice yoga, and achieve your wellness goals every day.</p>
                </div>
                <div className="auth-features-list">
                    <div className="auth-feature-item"><span className="af-icon">💧</span><span>Daily hydration tracking</span></div>
                    <div className="auth-feature-item"><span className="af-icon">🧘</span><span>Yoga & breathing exercises</span></div>
                    <div className="auth-feature-item"><span className="af-icon">🚶</span><span>Step counter & walking goals</span></div>
                    <div className="auth-feature-item"><span className="af-icon">⚖️</span><span>BMI calculator & health tips</span></div>
                    <div className="auth-feature-item"><span className="af-icon">🏋️</span><span>Connect with expert trainers</span></div>
                </div>
            </div>

            {/* Right form panel */}
            <div className="auth-right">
                <div className="auth-card">
                    <div className="auth-card-title">Welcome back 👋</div>
                    <p className="auth-card-sub">Sign in to continue your health journey</p>

                    {trainerName && (
                        <div className="auth-trainer-banner">
                            🏋️ Logging in as <strong>{trainerName}</strong>
                            <span className="auth-trainer-email">{trainerEmail}</span>
                        </div>
                    )}

                    {error && <div className="auth-error-msg">⚠️ {error}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="auth-field">
                            <label className="auth-field-label">Email Address</label>
                            <div className="auth-input-wrap">
                                <span className="auth-input-icon">📧</span>
                                <input
                                    type="text"
                                    className={`auth-input${error ? ' input-err' : ''}`}
                                    placeholder="yourname@gmail.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
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
                                    className={`auth-input${error ? ' input-err' : ''}`}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="forgot-link-row">
                            <Link to="/forgot-password">Forgot password?</Link>
                        </div>

                        <button type="submit" className="auth-submit-btn" disabled={loading}>
                            {loading ? '⏳ Signing in...' : '🚀 Sign In'}
                        </button>
                    </form>

                    <div className="auth-divider">or</div>

                    <p className="auth-switch-link">
                        Don't have an account? <Link to="/register">Create one free →</Link>
                    </p>

                    <div className="auth-hint">
                        💡 New here? <Link to="/register">Register first</Link> to create your account
                    </div>
                </div>
>>>>>>> 43b7b37 (Initial commit: Health and Wellness project)
            </div>
        </div>
    );
}

export default Login;
