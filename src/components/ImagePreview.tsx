import React from 'react';

export interface ImagePreviewProps {
  url: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({ 
  url, 
  alt = 'Preview', 
  className, 
  style 
}) => {
  return (
    <img 
      src={url} 
      alt={alt} 
      className={className} 
      style={{ maxWidth: '100%', height: 'auto', ...style }} 
    />
  );
};
