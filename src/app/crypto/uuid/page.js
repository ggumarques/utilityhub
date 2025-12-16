'use client';

import { useState } from 'react';

export default function UuidGenerator() {
  const [uuids, setUuids] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const generateUuid = () => {
    // Basic UUID v4 generator since crypto.randomUUID might not be available in all older contexts,
    // but in modern browsers it is. We'll use a polyfill-like approach if needed or just randomUUID.
    // For "premium" feel, reliability is key.
    
    const newUuids = [];
    for (let i = 0; i < quantity; i++) {
      if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        newUuids.push(crypto.randomUUID());
      } else {
         // Fallback
         newUuids.push('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        }));
      }
    }
    setUuids(newUuids);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(uuids.join('\n'));
    alert('Copied all UUIDs!');
  };

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem', fontSize: '1.8rem' }}>UUID Generator</h2>
      
      <div className="card" style={{ maxWidth: '600px' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <label className="label">Quantity: {quantity}</label>
          <input 
            type="range" 
            min="1" 
            max="50" 
            value={quantity} 
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--primary)' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
          <button className="btn" onClick={generateUuid}>Generate UUIDs</button>
        </div>

        {uuids.length > 0 && (
          <div style={{ position: 'relative' }}>
             <div style={{ 
               backgroundColor: 'var(--background)', 
               border: '1px solid var(--border)', 
               borderRadius: 'var(--radius)',
               maxHeight: '400px',
               overflowY: 'auto'
             }}>
                {uuids.map((uuid, index) => (
                  <div key={index} style={{ 
                    padding: '0.75rem', 
                    borderBottom: index < uuids.length - 1 ? '1px solid var(--border)' : 'none',
                    fontFamily: 'monospace',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span>{uuid}</span>
                  </div>
                ))}
             </div>
             
             <div style={{ marginTop: '1rem', textAlign: 'right' }}>
                <button className="btn-secondary" onClick={copyAll}>Copy All</button>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
