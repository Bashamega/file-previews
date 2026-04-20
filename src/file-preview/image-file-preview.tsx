import {FilePreviewProps} from './file-preview-props';

export function ImageFilePreview({url, mimeType}: FilePreviewProps) {
  return (
    <img
      style={{maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto'}}
      src={url}
      alt="File preview"
    />
  );
}
