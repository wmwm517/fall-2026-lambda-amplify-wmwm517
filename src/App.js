import React, { useState } from 'react';
import './App.css';

const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_URL;

export default function App() {
  const [x, setX] = useState('');
  const [y, setY] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const calculate = async () => {
    if (x === '' || isNaN(x) ) {
      setError('Please enter a valid integer for x.');
      return;
    }
    if (y === '' || isNaN(y) ) {
      setError('Please enter a valid integer for y.');
      return;
    }

    setError(null);
    setResult(null);

    try {
      const res = await fetch(
        `${BACKEND_BASE_URL}?x=${x}&y=${y}`
      );

      const data = await res.json();

      if (data.type === 'success') setResult({x, y, sum: data.sum, prod: data.prod});
      else setError(data.message);

    } catch (err) {
      setError('Server error occurred.');
    }
  };

  return (
    <div>
      <h2>Calculate Sum and Product</h2>
      <input
        type="number"
        value={x}
        placeholder="Enter a number for X"
        onChange={e => setX(e.target.value)}
      />
      <input
        type="number"
        value={y}
        placeholder="Enter a number for Y"
        onChange={e => setY(e.target.value)}
      />
      <br />
      <button onClick={calculate} >
        Calculate
      </button>

      <div className="calcResult">
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {result && <>
          <p>X + Y = <strong>{result.sum}</strong></p>
          <p>X * Y = <strong>{result.prod}</strong></p>
        </>}
      </div>
    </div>
  );
}