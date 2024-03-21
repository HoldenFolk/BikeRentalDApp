import React, { useEffect, useState } from 'react';
import './App.css';
import HelloWorld from './HelloWorld';

function App() {
  const [message, setMessage] = useState('');

  // useEffect(() => {
  //   fetch('/api')
  //     .then(response => response.json())
  //     .then(data => setMessage(data.message));
  // }, []);

  return (
    <div className="App">
      <HelloWorld></HelloWorld>
    </div>
  );
}

export default App;
