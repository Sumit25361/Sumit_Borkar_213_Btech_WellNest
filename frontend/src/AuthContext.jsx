import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = async (email, password) => {
        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (data.success) {
                localStorage.setItem('user', JSON.stringify(data.user));
                setUser(data.user);
                return { success: true, role: data.user.role };
            }
            return { success: false, message: data.message };
        } catch (error) {
            return { success: false, message: 'Server error. Please try again later.' };
        }
    };

    const register = async (userData) => {
        try {
            const response = await fetch('http://localhost:5000/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });
            const data = await response.json();
            return data;
        } catch (error) {
            return { success: false, message: 'Server error. Please try again later.' };
        }
    };

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    const checkEmail = async (email) => {
        try {
            const response = await fetch('http://localhost:5000/api/check-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const data = await response.json();
            return data.success;
        } catch (error) {
            console.error('Check email error:', error);
            return false;
        }
    };

    const resetPassword = async (email, newPassword) => {
        try {
            const response = await fetch('http://localhost:5000/api/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, newPassword })
            });
            const data = await response.json();
            return data;
        } catch (error) {
            return { success: false, message: 'Server error. Please try again later.' };
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, checkEmail, resetPassword }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
