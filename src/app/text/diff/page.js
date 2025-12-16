'use client';

import { useState, useEffect } from 'react';
import * as Diff from 'diff';

export default function TextDiff() {
  const [oldText, setOldText] = useState('');
  const [newText, setNewText] = useState('');
  const [diffResult, setDiffResult] = useState([]);

  useEffect(() => {
    // Determine diff
    // We can use Diff.diffChars or Diff.diffWords or Diff.diffLines
    // diffChars is good for detailed text but can be noisy. diffWords is usually better for prose.
    // Let's us diffChars for code-like precision or diffWords for general text.
    // I'll stick to diffChars as requested "diferenciador de texto" can imply checking minor edits.
    // Actually, let's provide a toggle? Or just default to diffLines or diffChars.
    // diffChars is often what developers want for "what changed exactly".
    
    if (!oldText && !newText) {
        setDiffResult([]);
        return;
    }

    const diff = Diff.diffChars(oldText, newText);
    setDiffResult(diff);
  }, [oldText, newText]);

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem', fontSize: '1.8rem' }}>Text Diff</h2>
      
      <div className="card">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
             <div>
                <label className="label">Original Text</label>
                <textarea 
                    className="input" 
                    value={oldText} 
                    onChange={(e) => setOldText(e.target.value)}
                    rows={8}
                    placeholder="Paste original text here..."
                    style={{ resize: 'vertical', fontFamily: 'monospace' }}
                />
             </div>
             <div>
                <label className="label">New Text</label>
                <textarea 
                    className="input" 
                    value={newText} 
                    onChange={(e) => setNewText(e.target.value)}
                    rows={8}
                    placeholder="Paste new text here..."
                    style={{ resize: 'vertical', fontFamily: 'monospace' }}
                />
             </div>
        </div>

        <div style={{ padding: '1rem', backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
            <label className="label" style={{ marginBottom: '0.5rem' }}>Difference</label>
            <div style={{ 
                fontFamily: 'monospace', 
                whiteSpace: 'pre-wrap', 
                wordBreak: 'break-all',
                lineHeight: '1.5',
                minHeight: '100px'
            }}>
                {diffResult.map((part, index) => {
                    const style = {
                        backgroundColor: part.added ? 'rgba(34, 197, 94, 0.2)' : part.removed ? 'rgba(239, 68, 68, 0.2)' : 'transparent',
                        color: part.added ? '#4ade80' : part.removed ? '#f87171' : 'inherit',
                        textDecoration: part.removed ? 'line-through' : 'none'
                    };
                    return <span key={index} style={style}>{part.value}</span>;
                })}
            </div>
        </div>
      </div>
    </div>
  );
}
