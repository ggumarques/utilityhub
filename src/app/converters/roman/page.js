'use client';

import { useState } from 'react';

export default function RomanConverter() {
  const [roman, setRoman] = useState('');
  const [number, setNumber] = useState('');
  const [error, setError] = useState('');

  const romanToInt = (s) => {
    const map = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
    let result = 0;
    
    // Basic validation regex
    if (!/^M*(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/i.test(s)) {
        throw new Error("Invalid Roman Numeral format");
    }

    const str = s.toUpperCase();
    for (let i = 0; i < str.length; i++) {
      const curr = map[str[i]];
      const next = map[str[i + 1]];
      if (next && curr < next) {
        result -= curr;
      } else {
        result += curr;
      }
    }
    return result;
  };

  const handleConvert = (e) => {
    const val = e.target.value.toUpperCase();
    setRoman(val);
    setError('');
    
    if (!val) {
        setNumber('');
        return;
    }

    try {
        const result = romanToInt(val);
        setNumber(result);
    } catch (err) {
        setNumber('');
        // Don't show error immediately on typing, maybe just on invalid char? 
        // For premium feel, maybe just show '...' or red border.
        // I'll show error message if it's clearly invalid and non-empty.
        if (val.length > 0) setError("Invalid Roman Numeral");
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem', fontSize: '1.8rem' }}>Roman to Number Converter</h2>
      
      <div className="card" style={{ maxWidth: '600px' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <label className="label">Roman Numeral</label>
          <input 
            type="text" 
            value={roman} 
            onChange={handleConvert}
            placeholder="e.g. XIV, MCMXC"
            className="input"
            style={{ textTransform: 'uppercase', borderColor: error ? '#ef4444' : '' }}
          />
          {error && <p style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.5rem' }}>{error}</p>}
        </div>

        <div style={{ marginBottom: '1.5rem', textAlign: 'center', fontSize: '1.5rem', color: 'var(--text-muted)' }}>
          ↓
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label className="label">Integer Number</label>
          <input 
            type="number" 
            value={number} 
            readOnly
            placeholder="Result"
            className="input"
            style={{ fontWeight: 'bold' }}
          />
        </div>
      </div>
    </div>
  );
}
