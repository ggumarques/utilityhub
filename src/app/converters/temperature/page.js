'use client';

import { useState } from 'react';
import styles from './Temperature.module.css';

const UNITS = [
  { id: 'kelvin', label: 'Kelvin', symbol: 'K' },
  { id: 'celsius', label: 'Celsius', symbol: '°C' },
  { id: 'fahrenheit', label: 'Fahrenheit', symbol: '°F' },
  { id: 'rankine', label: 'Rankine', symbol: '°R' },
  { id: 'delisle', label: 'Delisle', symbol: '°De' },
  { id: 'newton', label: 'Newton', symbol: '°N' },
  { id: 'reaumur', label: 'Réaumur', symbol: '°Ré' },
  { id: 'romer', label: 'Rømer', symbol: '°Rø' },
];

export default function TemperatureConverter() {
  // Store all values in a map for easy access. Initialize with 0 Celsius equivalent.
  // 0 Celsius = 273.15 K, 32 F, etc.
  const [values, setValues] = useState({
    celsius: '',
    fahrenheit: '',
    kelvin: '',
    rankine: '',
    delisle: '',
    newton: '',
    reaumur: '',
    romer: ''
  });

  const toCelsius = (val, fromUnit) => {
    const v = parseFloat(val);
    if (isNaN(v)) return null;

    switch (fromUnit) {
      case 'celsius': return v;
      case 'fahrenheit': return (v - 32) * 5 / 9;
      case 'kelvin': return v - 273.15;
      case 'rankine': return (v - 491.67) * 5 / 9;
      case 'delisle': return 100 - v * 2 / 3;
      case 'newton': return v * 100 / 33;
      case 'reaumur': return v * 5 / 4;
      case 'romer': return (v - 7.5) * 40 / 21;
      default: return v;
    }
  };

  const fromCelsius = (c, toUnit) => {
    if (c === null) return '';
    
    let res;
    switch (toUnit) {
      case 'celsius': res = c; break;
      case 'fahrenheit': res = (c * 9 / 5) + 32; break;
      case 'kelvin': res = c + 273.15; break;
      case 'rankine': res = (c + 273.15) * 9 / 5; break;
      case 'delisle': res = (100 - c) * 3 / 2; break;
      case 'newton': res = c * 33 / 100; break;
      case 'reaumur': res = c * 4 / 5; break;
      case 'romer': res = c * 21 / 40 + 7.5; break;
      default: res = c;
    }
    // Round to reasonable decimals (e.g., 2) to avoid floating point mess, 
    // but keep it precise enough.
    return parseFloat(res.toFixed(2)).toString();
  };

  const handleChange = (newValue, unit) => {
    if (newValue === '' || newValue === '-') {
      setValues(prev => ({ ...prev, [unit]: newValue })); // Allow clearing or negative sign
      if (newValue === '') {
         // Clear all
         const empty = {};
         UNITS.forEach(u => empty[u.id] = '');
         setValues(empty);
      }
      return;
    }

    const cel = toCelsius(newValue, unit);
    const newValues = {};
    
    UNITS.forEach(u => {
      // Don't overwrite the field being typed into to prevent cursor jumps or formatting issues
      if (u.id === unit) {
        newValues[u.id] = newValue;
      } else {
        newValues[u.id] = fromCelsius(cel, u.id);
      }
    });

    setValues(newValues);
  };

  return (
    <div className={styles.container}>
      <h1>Temperature Converter</h1>
      <div className={styles.converterList}>
        {UNITS.map((unit) => (
          <div key={unit.id} className={styles.row}>
            <label className={styles.label}>{unit.label}</label>
            <div className={styles.inputGroup}>
              <input
                type="number"
                className={styles.input}
                value={values[unit.id]}
                onChange={(e) => handleChange(e.target.value, unit.id)}
                placeholder="0"
              />
            </div>
            <span className={styles.unit}>{unit.symbol}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
