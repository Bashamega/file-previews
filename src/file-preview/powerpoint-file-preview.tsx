import {FilePreviewProps} from './file-preview-props';
import {BaseOfficePreview} from './base-office-preview';

export function PowerPointFilePreview(props: FilePreviewProps) {
  return <BaseOfficePreview {...props} title="PowerPoint presentation preview" />;
}
