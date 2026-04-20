import {FilePreviewProps} from './file-preview-props';

export function PowerPointFilePreview({url}: FilePreviewProps) {
  const officeUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(url)}`;
  
  return (
    <iframe
      title="PowerPoint presentation preview"
      style={{width: '100%', height: '100%', border: 'none', minHeight: '500px'}}
      src={officeUrl}
    />
  );
}
