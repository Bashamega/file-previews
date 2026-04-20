import {FilePreviewProps} from './file-preview-props';
import {BaseOfficePreview} from './base-office-preview';

export function CsvFilePreview(props: FilePreviewProps) {
  return <BaseOfficePreview {...props} title="CSV document preview" />;
}
