import React from 'react';
import { useFileType } from '../hooks/useFileType';
import { getPreviewComponent } from '../registry';

export interface FilePreviewProps {
  url: string;
  fallback?: React.ReactNode;
  loadingComponent?: React.ReactNode;
  errorComponent?: (error: Error) => React.ReactNode;
}

export const FilePreview: React.FC<FilePreviewProps> = ({
  url,
  fallback = <div>Unsupported file type</div>,
  loadingComponent = <div>Loading preview...</div>,
  errorComponent = (error) => <div>Error loading preview: {error.message}</div>,
}) => {
  const { mimeType, loading, error } = useFileType(url);

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

  return <PreviewComponent url={url} mimeType={mimeType} />;
};
