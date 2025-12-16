'use client';

import { useState } from 'react';

export default function TokenGenerator() {
  const [token, setToken] = useState('');
  const [length, setLength] = useState(64);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true
  });

  const generateToken = () => {
    const sets = {
      uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      lowercase: 'abcdefghijklmnopqrstuvwxyz',
      numbers: '0123456789',
      symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
    };

    let charset = '';
    if (options.uppercase) charset += sets.uppercase;
    if (options.lowercase) charset += sets.lowercase;
    if (options.numbers) charset += sets.numbers;
    if (options.symbols) charset += sets.symbols;

    if (charset === '') return;

    let newToken = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        newToken += charset[randomIndex];
    }
    setToken(newToken);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(token);
    alert('Token copied!');
  };

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem', fontSize: '1.8rem' }}>Token Generator</h2>
      
      <div className="card" style={{ maxWidth: '600px' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <label className="label">Length: {length}</label>
          <input 
            type="range" 
            min="1" 
            max="128" 
            value={length} 
            onChange={(e) => setLength(parseInt(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--primary)' }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
          {Object.keys(options).map(key => (
            <label key={key} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                checked={options[key]} 
                onChange={() => setOptions(prev => ({ ...prev, [key]: !prev[key] }))}
                style={{ accentColor: 'var(--primary)', width: '1.25rem', height: '1.25rem' }}
              />
              <span style={{ textTransform: 'capitalize' }}>{key}</span>
            </label>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
          <button className="btn" onClick={generateToken}>Generate</button>
        </div>

        {token && (
          <div style={{ position: 'relative' }}>
            <textarea 
              className="input" 
              readOnly 
              value={token} 
              rows={4}
              style={{ fontFamily: 'monospace', resize: 'vertical' }}
            />
            <button 
              className="btn-secondary" 
              onClick={copyToClipboard}
              style={{ 
                position: 'absolute', 
                top: '0.5rem', 
                right: '0.5rem', 
                padding: '0.25rem 0.75rem', 
                fontSize: '0.8rem' 
              }}
            >
              Copy
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
