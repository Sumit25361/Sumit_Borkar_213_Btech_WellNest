const fs = require('fs');

const path = 'C:/Users/sumit/OneDrive/Desktop/wellnest/frontend/src/MatchingSystem.jsx';
let content = fs.readFileSync(path, 'utf8');

const target = `<button 
                            className="ms-next-btn" 
                            disabled={selections.goals.length === 0}
                            onClick={() => setStep(1)}
                        >
                            Next Step
                        </button>`;

const targetRegex = /<button[\s\n\r]*className="ms-next-btn"[\s\n\r]*disabled=\{selections\.goals\.length\s*===\s*0\}[\s\n\r]*onClick=\{[^}]+\}[\s\n\r]*>[\s\n\r]*Next Step[\s\n\r]*<\/button>/g;

const replacement = `<div className="ms-btn-row">
                            <button className="ms-back-btn" onClick={() => navigate('/dashboard')}>Back</button>
                            <button 
                                className="ms-next-btn" 
                                disabled={selections.goals.length === 0}
                                onClick={() => setStep(1)}
                            >
                                Next Step
                            </button>
                        </div>`;

content = content.replace(targetRegex, replacement);

fs.writeFileSync(path, content, 'utf8');
console.log("Replaced successfully!");
