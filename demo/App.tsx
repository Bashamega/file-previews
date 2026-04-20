import React, { useState } from 'react';
import { FilePreview, DetectionMethod } from '../src';

const App = () => {
  const [url, setUrl] = useState('https://picsum.photos/400/300');
  const [inputUrl, setInputUrl] = useState('https://picsum.photos/400/300');
  const [method, setMethod] = useState<DetectionMethod>('request');

  return (
    <div style={{ padding: '40px', fontFamily: 'system-ui, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h1>React File Previews Demo</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <input 
          type="text" 
          value={inputUrl} 
          onChange={(e) => setInputUrl(e.target.value)}
          style={{ width: '70%', padding: '10px', marginRight: '10px' }}
        />
        <button 
          onClick={() => setUrl(inputUrl)}
          style={{ padding: '10px 20px', cursor: 'pointer' }}
        >
          Preview
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ marginRight: '10px' }}>Detection Method:</label>
        <select 
          value={method} 
          onChange={(e) => setMethod(e.target.value as DetectionMethod)}
          style={{ padding: '5px' }}
        >
          <option value="request">Request (HEAD)</option>
          <option value="url">URL (Extension)</option>
        </select>
      </div>

      <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', background: '#f9f9f9' }}>
        <h3>Current Preview:</h3>
        <p style={{ fontSize: '12px', color: '#666' }}>URL: {url}</p>
        <p style={{ fontSize: '12px', color: '#666' }}>Method: {method}</p>
        
        <div style={{ marginTop: '20px', minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <FilePreview 
            url={url} 
            method={method}
            loadingComponent={<div style={{ color: 'blue' }}>Checking file type...</div>}
            fallback={<div style={{ color: 'orange' }}>No preview available for this file type.</div>}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
