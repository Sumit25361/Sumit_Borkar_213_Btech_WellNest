import { useState, useEffect } from 'react';

// Common key to store the "last active date"
const DATE_KEY = 'wn_last_active_date';

// A custom hook to manage a daily local storage list
export function useDailyLogs(metricKey, initialData = [], userEmail = 'default') {
    // Check if it's a new day and reset all logs if so
    useEffect(() => {
        const todayStr = new Date().toLocaleDateString();
        const userDateKey = `${userEmail}_${DATE_KEY}`;
        const storedDate = localStorage.getItem(userDateKey);

        if (storedDate !== todayStr) {
            // It's a new day (or first time)! Reset everything.
            localStorage.setItem(userDateKey, todayStr);
            localStorage.removeItem(`${userEmail}_wn_hydration_logs`);
            localStorage.removeItem(`${userEmail}_wn_walking_logs`);
            localStorage.removeItem(`${userEmail}_wn_yoga_logs`);
            localStorage.removeItem(`${userEmail}_wn_diet_logs`);
        }
    }, [userEmail]);

    // State for the logs
    const [logs, setLogs] = useState(() => {
        const saved = localStorage.getItem(`${userEmail}_wn_${metricKey}_logs`);
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                return initialData;
            }
        }
        return initialData;
    });

    // Update state when userEmail changes (handles login/logout/switch user)
    useEffect(() => {
        const saved = localStorage.getItem(`${userEmail}_wn_${metricKey}_logs`);
        if (saved) {
            try {
                setLogs(JSON.parse(saved));
            } catch (e) {
                setLogs(initialData);
            }
        } else {
            setLogs(initialData);
        }
    }, [userEmail, metricKey]);

    // Save to local storage whenever logs change
    useEffect(() => {
        if (logs !== initialData) { // Avoid overwriting with initialData on first render
            localStorage.setItem(`${userEmail}_wn_${metricKey}_logs`, JSON.stringify(logs));
        }
    }, [logs, metricKey, userEmail]);

    const addLog = (newLog) => {
        setLogs(prev => [newLog, ...prev]);
        // Immediately save to storage so it's not missed if re-rendered quickly
        const updatedLogs = [newLog, ...logs];
        localStorage.setItem(`${userEmail}_wn_${metricKey}_logs`, JSON.stringify(updatedLogs));
    };

    const removeLog = (idToRemove) => {
        setLogs(prev => {
            const updatedLogs = prev.filter(item => item.id !== idToRemove);
            localStorage.setItem(`${userEmail}_wn_${metricKey}_logs`, JSON.stringify(updatedLogs));
            return updatedLogs;
        });
    };

    return { logs, addLog, removeLog, setLogs };
}
