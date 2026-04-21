export interface FilePreviewProps {
  url: string;
  mimeType: string;
  editable?: boolean;
  onSave?: (content: string | Blob) => void | Promise<void>;
}
