import {FilePreviewProps} from './file-preview-props';

interface BaseOfficePreviewProps extends FilePreviewProps {
  title: string;
}

export function BaseOfficePreview({url, title}: BaseOfficePreviewProps) {
  const officeUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(url)}`;
  
  return (
    <iframe
      title={title}
      style={{width: '100%', height: '100%', border: 'none', minHeight: '500px'}}
      src={officeUrl}
    />
  );
}
