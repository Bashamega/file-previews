import {FilePreviewProps} from './file-preview-props';

export function DefaultFilePreview({url, mimeType}: FilePreviewProps) {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: '400px',
        margin: '0 auto',
        padding: '20px',
        textAlign: 'center',
        border: '1px solid #ccc',
        borderRadius: '8px',
      }}
    >
      <div style={{fontSize: '18px', marginBottom: '10px'}}>
        No file preview available
      </div>
      <div>Type: {mimeType}</div>
      <div style={{marginTop: '20px'}}>
        <a
          href={url}
          download
          style={{
            display: 'inline-block',
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '4px',
          }}
        >
          Download
        </a>
      </div>
    </div>
  );
}
