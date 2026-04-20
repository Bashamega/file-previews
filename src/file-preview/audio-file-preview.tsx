import {FilePreviewProps} from './file-preview-props';

export function AudioFilePreview({url, mimeType}: FilePreviewProps) {
  return (
    <div style={{textAlign: 'center', padding: '20px'}}>
      <audio controls style={{width: '100%', maxWidth: '500px'}}>
        <source src={url} type={mimeType} />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}
