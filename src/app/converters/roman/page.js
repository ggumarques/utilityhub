'use client';

import { useState } from 'react';
import styles from './Roman.module.css';

export default function RomanConverter() {
  const [roman, setRoman] = useState('');
  const [number, setNumber] = useState('');
  const [error, setError] = useState('');

  const romanToInt = (s) => {
    const map = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
    let result = 0;
    
    // Basic validation regex
    if (!/^M*(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/i.test(s)) {
        throw new Error("Invalid format");
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

  const intToRoman = (num) => {
    if (num < 1 || num > 3999) throw new Error("Range: 1-3999");
    const val = [
      1000, 900, 500, 400,
      100, 90, 50, 40,
      10, 9, 5, 4,
      1
    ];
    const syms = [
      "M", "CM", "D", "CD",
      "C", "XC", "L", "XL",
      "X", "IX", "V", "IV",
      "I"
    ];
    let roman = "";
    let n = num;
    for (let i = 0; i < val.length; i++) {
      while (n >= val[i]) {
        roman += syms[i];
        n -= val[i];
      }
    }
    return roman;
  };

  const handleChangeRoman = (e) => {
    const val = e.target.value.toUpperCase();
    // Allow typing only valid chars
    if (val && !/^[IVXLCDM]*$/.test(val)) return;
    
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
        // Only show error if formatting rule (regex) failed specifically
        // But for typing flow we can just clear number if invalid
        setNumber('');
        setError("Invalid format");
    }
  };

  const handleChangeNumber = (e) => {
    const val = e.target.value;
    setNumber(val);
    setError('');

    if (!val) {
        setRoman('');
        return;
    }

    const num = parseInt(val, 10);
    if (isNaN(num)) return;

    try {
        const res = intToRoman(num);
        setRoman(res);
    } catch (err) {
        setRoman('');
        setError(err.message);
    }
  };

  const referenceData = [
    { symbol: 'I', value: 1 },
    { symbol: 'V', value: 5 },
    { symbol: 'X', value: 10 },
    { symbol: 'L', value: 50 },
    { symbol: 'C', value: 100 },
    { symbol: 'D', value: 500 },
    { symbol: 'M', value: 1000 },
  ];

  return (
    <div className={styles.container}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Roman Converter</h1>
      
      <div className={styles.converterSection}>
        <div className={styles.card}>
          <label className={styles.label}>Roman Numeral</label>
          <input 
            type="text" 
            value={roman} 
            onChange={handleChangeRoman}
            placeholder="e.g. XIV, MCMXC"
            className={styles.input}
            spellCheck={false}
          />
          <div className={styles.error}>{error && error.includes("Invalid") ? error : ''}</div>
        </div>

        <div className={styles.card}>
          <label className={styles.label}>Number (1-3999)</label>
          <input 
            type="number" 
            value={number} 
            onChange={handleChangeNumber}
            placeholder="e.g. 14, 1990"
            className={styles.input}
            min="1"
            max="3999"
          />
          <div className={styles.error}>{error && error.includes("Range") ? error : ''}</div>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <h2 className={styles.tableTitle}>Roman Numerals Reference</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {referenceData.map((row) => (
              <tr key={row.symbol}>
                <td>{row.symbol}</td>
                <td>{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
