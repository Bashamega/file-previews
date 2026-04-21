import {FilePreviewProps} from './file-preview-props';
import {BaseOfficePreview} from './base-office-preview';

export function RtfFilePreview(props: FilePreviewProps) {
  return <BaseOfficePreview {...props} title="RTF document preview" />;
}
