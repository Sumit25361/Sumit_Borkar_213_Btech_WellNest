import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Chatbot.css';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { sender: 'bot', text: 'Hi! I am your WellNest AI assistant. Tell me your weight/height or ask about your diet and yoga!' }
    ]);
    const [input, setInput] = useState('');
    // Contextual memory for the session
    const [userMetrics, setUserMetrics] = useState({ weight: null, height: null });
    
    const messagesEndRef = useRef(null);
    const navigate = useNavigate();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userText = input.trim();
        setMessages(prev => [...prev, { sender: 'user', text: userText }]);
        setInput('');

        // Simulate bot thinking
        setTimeout(() => {
            const response = generateBotResponse(userText.toLowerCase());
            setMessages(prev => [...prev, { sender: 'bot', text: response.text, action: response.action }]);
        }, 600);
    };

    const generateBotResponse = (text) => {
        // 1. Detect New Metrics
        const weightMatch = text.match(/(\d+)\s*(?:kg|kilo|weight)/i) || text.match(/(?:weight|am|is)\s*(?:is|:)?\s*(\d+)\s*(?:kg|kilo)?/i);
        const heightMatch = text.match(/(\d+)\s*(?:cm|cms|height)/i) || text.match(/(?:height|am|is)\s*(?:is|:)?\s*(\d+)\s*(?:cm|cms)?/i);

        let newWeight = userMetrics.weight;
        let newHeight = userMetrics.height;

        if (weightMatch) {
            newWeight = parseInt(weightMatch[1] || weightMatch[0].match(/\d+/)[0]);
        }
        if (heightMatch) {
            newHeight = parseInt(heightMatch[1] || heightMatch[0].match(/\d+/)[0]);
        }

        // Update memory if new info found
        if (newWeight !== userMetrics.weight || newHeight !== userMetrics.height) {
            setUserMetrics({ weight: newWeight, height: newHeight });
        }

        const { weight, height } = { weight: newWeight, height: newHeight };

        // 2. Hydration Logic
        if (text.includes('hydration') || text.includes('water') || text.includes('drink')) {
            if (weight) {
                const waterIntake = (weight * 0.033).toFixed(1);
                return {
                    text: `For your weight of ${weight}kg, the ideal daily water intake is ${waterIntake} Liters. Remember to drink consistently throughout the day!`,
                    action: { label: 'Track Hydration', path: '/hydration' }
                };
            }
            return {
                text: 'Staying hydrated is critical! Generally, 2-3 liters a day is recommended. Tell me your weight for a personalized calculation.',
                action: { label: 'Go to Hydration', path: '/hydration' }
            };
        }

        // 3. Diet Logic (Polished)
        if (text.includes('diet') || text.includes('food') || text.includes('nutrition') || text.includes('eat')) {
            if (weight) {
                const protein = Math.round(weight * 1.5);
                const calories = Math.round(weight * 30);
                return {
                    text: `Based on your weight (${weight}kg), I recommend a diet of approx ${calories} calories with ${protein}g of protein daily to maintain muscle and energy levels. Focus on lean proteins and fiber!`,
                    action: { label: 'View Diet Dashboard', path: '/diet' }
                };
            }
            return {
                text: 'Eating whole foods and plenty of protein is key. If you provide your weight, I can calculate your specific calorie and protein targets!',
                action: { label: 'Go to Diet & Nutrition', path: '/diet' }
            };
        }

        // 4. Yoga Logic (Polished)
        if (text.includes('yoga') || text.includes('stretch') || text.includes('meditat')) {
            let yogaInfo = 'Yoga is perfect for flexibility and stress relief. Start with our guided sessions.';
            if (height && weight) {
                const bmi = (weight / ((height/100)*(height/100))).toFixed(1);
                if (bmi > 25) yogaInfo = `At a BMI of ${bmi}, I recommend low-impact Vinyasa or Hatha yoga to help with mobility and calorie burn without straining your joints.`;
                else yogaInfo = `With your current BMI of ${bmi}, you should try Power Yoga to build strength and further improve your flexibility!`;
            }
            return {
                text: yogaInfo,
                action: { label: 'Start Yoga Now', path: '/yoga' }
            };
        }

        // 5. Walking / Active Logic
        if (text.includes('walk') || text.includes('step') || text.includes('run') || text.includes('active')) {
            if (weight) {
                const caloriesBurned = Math.round(weight * 0.5 * 5); // Rough calc for 5km walk
                return {
                    text: `At ${weight}kg, walking just 5km will burn approximately ${caloriesBurned} calories. Try hitting 10,000 steps today!`,
                    action: { label: 'Track Steps', path: '/walking' }
                };
            }
            return {
                text: 'Walking 10,000 steps a day is a great target for heart health. Log your daily activity on our walking tracker.',
                action: { label: 'Go to Walking Tracker', path: '/walking' }
            };
        }

        // 6. Generic BMI/Height/Weight responses
        if (text.includes('bmi') || (weightMatch && heightMatch)) {
            if (weight && height) {
                const bmi = (weight / ((height/100)*(height/100))).toFixed(1);
                return {
                    text: `I've calculated your BMI as ${bmi}. You can ask me how this affects your diet or yoga routine now!`,
                    action: { label: 'Detailed BMI Tool', path: '/bmi' }
                };
            }
        }

        // 7. General Greetings / Default
        if (text.includes('hi') || text.includes('hello') || text.includes('hey')) {
            return { text: 'Hello! I am your AI assistant. Tell me your weight/height, or ask about diet, yoga, and hydration!' };
        }
        if (text.includes('thank')) {
            return { text: "You're very welcome! Stay consistent and see the results! 🌿" };
        }
        
        return {
            text: "I'm here to help with your health journey! You can ask me about Hydration, Diet, Yoga, Walking, or provide your weight/height for specific advice."
        };
    };

    const handleActionClick = (path) => {
        navigate(path);
        setIsOpen(false);
    };

    return (
        <div className="chatbot-wrapper">
            {isOpen && (
                <div className="chatbot-window">
                    <div className="chatbot-header">
                        <div className="chatbot-header-title">
                            <span className="chatbot-header-icon">🌿</span> WellNest Guide
                        </div>
                        <button className="chatbot-close" onClick={() => setIsOpen(false)}>×</button>
                    </div>
                    <div className="chatbot-messages">
                        {messages.map((msg, index) => (
                            <div key={index} className={`chatbot-message ${msg.sender}`}>
                                <div className="chatbot-bubble">{msg.text}</div>
                                {msg.action && (
                                    <button 
                                        className="chatbot-action-btn"
                                        onClick={() => handleActionClick(msg.action.path)}
                                    >
                                        {msg.action.label} →
                                    </button>
                                )}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    <form className="chatbot-input-area" onSubmit={handleSend}>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask about diet, hydration..."
                            className="chatbot-input"
                        />
                        <button type="submit" className="chatbot-send">Send</button>
                    </form>
                </div>
            )}
            
            {!isOpen && (
                <button className="chatbot-toggle" onClick={() => setIsOpen(true)}>
                    <span>💬</span>
                </button>
            )}
        </div>
    );
};

export default Chatbot;
