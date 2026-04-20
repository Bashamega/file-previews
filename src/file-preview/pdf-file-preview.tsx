import {FilePreviewProps} from './file-preview-props';

export function PdfFilePreview({url}: FilePreviewProps) {
  return (
    <iframe
      title="PDF preview"
      style={{width: '100%', height: '100%', border: 'none', minHeight: '500px'}}
      src={`${url}#toolbar=0`}
    />
  );
}
