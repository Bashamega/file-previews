import React from 'react';
import { ImageFilePreview } from './file-preview/image-file-preview';
import { AudioFilePreview } from './file-preview/audio-file-preview';
import { VideoFilePreview } from './file-preview/video-file-preview';
import { PdfFilePreview } from './file-preview/pdf-file-preview';
import { TextFilePreview } from './file-preview/text-file-preview';
import { WordDocumentFilePreview } from './file-preview/word-document-file-preview';

export interface PreviewHandlerProps {
  url: string;
  mimeType: string;
}

export type PreviewHandler = React.FC<PreviewHandlerProps>;

export interface RegistryEntry {
  test: (mimeType: string) => boolean;
  component: PreviewHandler;
}

export const previewRegistry: RegistryEntry[] = [
  {
    test: (mimeType: string) => mimeType.startsWith('image/'),
    component: ImageFilePreview as PreviewHandler,
  },
  {
    test: (mimeType: string) => mimeType.startsWith('audio/'),
    component: AudioFilePreview as PreviewHandler,
  },
  {
    test: (mimeType: string) => mimeType.startsWith('video/'),
    component: VideoFilePreview as PreviewHandler,
  },
  {
    test: (mimeType: string) => mimeType === 'application/pdf',
    component: PdfFilePreview as PreviewHandler,
  },
  {
    test: (mimeType: string) => 
      mimeType.startsWith('text/') ||
      mimeType === 'text/plain' ||
      mimeType === 'application/json' || 
      mimeType === 'application/javascript' ||
      mimeType === 'application/xml',
    component: TextFilePreview as PreviewHandler,
  },
  {
    test: (mimeType: string) => 
      mimeType === 'application/msword' || 
      mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    component: WordDocumentFilePreview as PreviewHandler,
  },
];

export function getPreviewComponent(mimeType: string): PreviewHandler | null {
  const entry = previewRegistry.find(e => e.test(mimeType));
  return entry ? entry.component : null;
}
