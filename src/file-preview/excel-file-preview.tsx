import {FilePreviewProps} from './file-preview-props';

export function ExcelFilePreview({url}: FilePreviewProps) {
  const officeUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(url)}`;
  
  return (
    <iframe
      title="Excel document preview"
      style={{width: '100%', height: '100%', border: 'none', minHeight: '500px'}}
      src={officeUrl}
    />
  );
}
