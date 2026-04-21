import React from 'react';
import { useFileType, DetectionMethod } from '../hooks/useFileType';
import { getPreviewComponent } from '../registry';

export interface FilePreviewProps {
  url: string;
  method?: DetectionMethod;
  fallback?: React.ReactNode;
  loadingComponent?: React.ReactNode;
  errorComponent?: (error: Error) => React.ReactNode;
  editable?: boolean;
  onSave?: (content: string | Blob) => void | Promise<void>;
}

export const FilePreview: React.FC<FilePreviewProps> = ({
  url,
  method = 'request',
  fallback = <div>Unsupported file type</div>,
  loadingComponent = <div>Loading preview...</div>,
  errorComponent = (error) => <div>Error loading preview: {error.message}</div>,
  editable = false,
  onSave,
}) => {
  const { mimeType, loading, error } = useFileType(url, method);

  if (loading) {
    return <>{loadingComponent}</>;
  }

  if (error) {
    return <>{errorComponent(error)}</>;
  }

  if (!mimeType) {
    return <>{fallback}</>;
  }

  const PreviewComponent = getPreviewComponent(mimeType);

  if (!PreviewComponent) {
    return <>{fallback}</>;
  }

  return <PreviewComponent url={url} mimeType={mimeType} editable={editable} onSave={onSave} />;
};
