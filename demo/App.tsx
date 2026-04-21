import React, { useState } from 'react';
import { FilePreview, DetectionMethod } from '../src';

const App = () => {
  const [url, setUrl] = useState('https://picsum.photos/400/300');
  const [inputUrl, setInputUrl] = useState('https://picsum.photos/400/300');
  const [method, setMethod] = useState<DetectionMethod>('request');
  const [editable, setEditable] = useState(false);

  const handleSave = (content: string | Blob) => {
    console.log('Saving content:', content);
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        alert('File saved successfully (see console for details)');
        resolve();
      }, 1000);
    });
  };

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

      <div style={{ marginBottom: '20px', display: 'flex', gap: '20px', alignItems: 'center' }}>
        <div>
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
        <div>
          <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <input 
              type="checkbox" 
              checked={editable} 
              onChange={(e) => setEditable(e.target.checked)} 
              style={{ marginRight: '8px' }}
            />
            Enable Editing (onSave)
          </label>
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <p>Examples:</p>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button onClick={() => { setUrl('https://picsum.photos/400/300'); setInputUrl('https://picsum.photos/400/300'); }}>Image</button>
          <button onClick={() => { setUrl('https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'); setInputUrl('https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'); }}>PDF</button>
          <button onClick={() => { setUrl('https://raw.githubusercontent.com/mdn/learning-area/master/javascript/oojs/json/superheroes.json'); setInputUrl('https://raw.githubusercontent.com/mdn/learning-area/master/javascript/oojs/json/superheroes.json'); }}>JSON (Code)</button>
          <button onClick={() => { setUrl('https://raw.githubusercontent.com/facebook/react/main/README.md'); setInputUrl('https://raw.githubusercontent.com/facebook/react/main/README.md'); }}>Markdown</button>
          <button onClick={() => { setUrl('https://raw.githubusercontent.com/facebook/react/main/packages/react/index.js'); setInputUrl('https://raw.githubusercontent.com/facebook/react/main/packages/react/index.js'); }}>JS (Code)</button>
        </div>
      </div>

      <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', background: '#f9f9f9' }}>
        <h3>Current Preview:</h3>
        <p style={{ fontSize: '12px', color: '#666' }}>URL: {url}</p>
        <p style={{ fontSize: '12px', color: '#666' }}>Method: {method}</p>
        <p style={{ fontSize: '12px', color: '#666' }}>Editable: {editable ? 'Yes' : 'No'}</p>
        
        <div style={{ marginTop: '20px', minHeight: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <FilePreview 
            url={url} 
            method={method}
            editable={editable}
            onSave={handleSave}
            loadingComponent={<div style={{ color: 'blue' }}>Checking file type...</div>}
            fallback={<div style={{ color: 'orange' }}>No preview available for this file type.</div>}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
