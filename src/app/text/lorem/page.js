'use client';

import { useState } from 'react';

export default function LoremIpsum() {
  const [paragraphs, setParagraphs] = useState(3);
  const [text, setText] = useState('');

  const generateLorem = () => {
    // A simple Lorem Ipsum generator. For production, maybe a library, but this is enough.
    const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    
    // Shuffle words or sentences for variety? Or just repeat/slice.
    // Repeating is simpler for a dev tool unless 'random' is key.
    // I'll randomize sentence order for a bit of realism.
    
    const sentences = lorem.split('. ').map(s => s.trim() + '.');
    
    let result = '';
    
    for (let i = 0; i < paragraphs; i++) {
       // Create a paragraph of 3-6 sentences
       const sentenceCount = Math.floor(Math.random() * 4) + 3;
       let paragraph = '';
       for(let j=0; j<sentenceCount; j++) {
           const randIdx = Math.floor(Math.random() * sentences.length);
           paragraph += sentences[randIdx] + ' ';
       }
       result += paragraph.trim() + '\n\n';
    }
    
    setText(result.trim());
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem', fontSize: '1.8rem' }}>Lorem Ipsum Generator</h2>
      
      <div className="card" style={{ maxWidth: '800px' }}>
        <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <label className="label" style={{ marginBottom: 0 }}>Paragraphs: {paragraphs}</label>
          <input 
            type="range" 
            min="1" 
            max="20" 
            value={paragraphs} 
            onChange={(e) => setParagraphs(parseInt(e.target.value))}
            style={{ width: '200px', accentColor: 'var(--primary)' }}
          />
          <button className="btn" onClick={generateLorem}>Generate</button>
        </div>

        {text && (
          <div style={{ position: 'relative' }}>
            <textarea 
              className="input" 
              readOnly 
              value={text} 
              rows={15}
              style={{ fontFamily: 'serif', fontSize: '1.1rem', lineHeight: '1.6', resize: 'vertical' }}
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
