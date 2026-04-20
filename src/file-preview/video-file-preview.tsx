import {FilePreviewProps} from './file-preview-props';

export function VideoFilePreview({url, mimeType}: FilePreviewProps) {
  return (
    <div style={{textAlign: 'center', padding: '20px'}}>
      <video controls style={{maxWidth: '100%', maxHeight: '80vh', display: 'block', margin: '0 auto'}}>
        <source src={url} type={mimeType} />
        Your browser does not support the video element.
      </video>
    </div>
  );
}
