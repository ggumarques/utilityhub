'use client';

import { useState } from 'react';

export default function Base64Converter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState('encode'); // encode | decode
  const [error, setError] = useState('');

  const handleConvert = (val, currentMode) => {
    setInput(val);
    setError('');
    
    if (!val) {
        setOutput('');
        return;
    }

    try {
        if (currentMode === 'encode') {
            setOutput(btoa(val));
        } else {
            setOutput(atob(val));
        }
    } catch (err) {
        // setError('Invalid input for ' + currentMode);
        // Only show error for decode usually
        if (currentMode === 'decode') {
            setError('Invalid Base64 string');
            setOutput('');
        }
    }
  };

  const toggleMode = () => {
    const newMode = mode === 'encode' ? 'decode' : 'encode';
    setMode(newMode);
    // Try to convert existing input with new mode
    handleConvert(input, newMode);
  };

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem', fontSize: '1.8rem' }}>Text to Base64 Converter</h2>
      
      <div className="card" style={{ maxWidth: '800px' }}>
        <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <span style={{ fontWeight: 600, color: mode === 'encode' ? 'var(--primary)' : 'var(--text-muted)' }}>Encode</span>
            <button 
                onClick={toggleMode}
                className="btn-secondary"
                style={{ padding: '0.25rem 0.75rem' }}
            >
                ⇄
            </button>
            <span style={{ fontWeight: 600, color: mode === 'decode' ? 'var(--primary)' : 'var(--text-muted)' }}>Decode</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label className="label">{mode === 'encode' ? 'Text Source' : 'Base64 Source'}</label>
                <textarea 
                    className="input" 
                    value={input} 
                    onChange={(e) => handleConvert(e.target.value, mode)}
                    rows={8}
                    style={{ resize: 'vertical', fontFamily: 'monospace' }}
                />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label className="label">{mode === 'encode' ? 'Base64 Result' : 'Text Result'}</label>
                <textarea 
                    className="input" 
                    value={output} 
                    readOnly
                    rows={8}
                    style={{ resize: 'vertical', fontFamily: 'monospace', backgroundColor: 'var(--surface)' }}
                />
                {error && <p style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.5rem' }}>{error}</p>}
            </div>
        </div>
      </div>
    </div>
  );
}
