import {FilePreviewProps} from './file-preview-props';
import {BaseOfficePreview} from './base-office-preview';

export function WordDocumentFilePreview(props: FilePreviewProps) {
  return <BaseOfficePreview {...props} title="Word document preview" />;
}
