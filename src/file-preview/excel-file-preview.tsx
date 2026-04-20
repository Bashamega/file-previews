import {FilePreviewProps} from './file-preview-props';
import {BaseOfficePreview} from './base-office-preview';

export function ExcelFilePreview(props: FilePreviewProps) {
  return <BaseOfficePreview {...props} title="Excel document preview" />;
}
