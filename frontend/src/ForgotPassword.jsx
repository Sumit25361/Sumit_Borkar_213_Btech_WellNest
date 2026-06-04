import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './index.css';

function ForgotPassword() {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSendOTP = async (e) => {
        e.preventDefault();
        setError('');
        if (!email.includes('@gmail.com')) {
            setError('Please enter a valid Gmail address');
            return;
        }
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setStep(2);
        }, 1500);
    };

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        setStep(3);
    };

    const handleReset = async (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            navigate('/login');
        }, 1500);
    };

    return (
        <div className="auth-page">
            <div className="auth-right" style={{margin:'0 auto', maxWidth:480}}>
                <div className="auth-card">
                    {/* Stepper */}
                    <div className="fp-stepper">
                        {[1, 2, 3].map(s => (
                            <div key={s} className={`fp-step ${step >= s ? 'active' : ''}`}>
                                <div className="fp-step-num">{s}</div>
                                <div className="fp-step-label">{s===1?'FIND EMAIL':s===2?'VERIFY OTP':'NEW PASSWORD'}</div>
                            </div>
                        ))}
                    </div>

                    <div className="auth-card-title">
                        {step === 1 ? '🔍 Find Your Account' : step === 2 ? '📧 Enter OTP' : '🔑 Reset Password'}
                    </div>
                    <p className="auth-card-sub">
                        {step === 1 ? 'Enter your Gmail to receive a one-time code' : 
                         step === 2 ? `We've sent a code to ${email}` : 
                         'Create a strong new password for your account'}
                    </p>

                    {error && <div className="auth-error-msg">⚠️ {error}</div>}

                    {step === 1 && (
                        <form onSubmit={handleSendOTP}>
                            <div className="auth-field">
                                <label className="auth-field-label">Email Address</label>
                                <div className="auth-input-wrap">
                                    <span className="auth-input-icon">📧</span>
                                    <input 
                                        type="email" 
                                        className="auth-input" 
                                        placeholder="sumitkborkar2004@gmail.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <button type="submit" className="auth-submit-btn" disabled={loading}>
                                {loading ? '⏳ Sending OTP...' : '🚀 Send Code'}
                            </button>
                        </form>
                    )}

                    {step === 2 && (
                        <form onSubmit={handleVerifyOTP}>
                            <div className="auth-field">
                                <label className="auth-field-label">One-Time Code</label>
                                <div className="auth-input-wrap">
                                    <span className="auth-input-icon">🔢</span>
                                    <input 
                                        type="text" 
                                        className="auth-input" 
                                        placeholder="Enter 6-digit code"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <button type="submit" className="auth-submit-btn">Verify & Continue</button>
                        </form>
                    )}

                    {step === 3 && (
                        <form onSubmit={handleReset}>
                            <div className="auth-field">
                                <label className="auth-field-label">New Password</label>
                                <div className="auth-input-wrap">
                                    <span className="auth-input-icon">🔒</span>
                                    <input 
                                        type="password" 
                                        className="auth-input" 
                                        placeholder="Minimum 8 characters"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <button type="submit" className="auth-submit-btn" disabled={loading}>
                                {loading ? '⏳ Updating...' : '✅ Reset Password'}
                            </button>
                        </form>
                    )}

                    <div className="auth-divider">or</div>
                    <p className="auth-switch-link">
                        <Link to="/login">← Back to Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
