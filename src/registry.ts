import React from 'react';
import { ImageFilePreview } from './file-preview/image-file-preview';
import { AudioFilePreview } from './file-preview/audio-file-preview';
import { VideoFilePreview } from './file-preview/video-file-preview';
import { PdfFilePreview } from './file-preview/pdf-file-preview';
import { TextFilePreview } from './file-preview/text-file-preview';
import { WordDocumentFilePreview } from './file-preview/word-document-file-preview';
import { ExcelFilePreview } from './file-preview/excel-file-preview';
import { PowerPointFilePreview } from './file-preview/powerpoint-file-preview';
import { CsvFilePreview } from './file-preview/csv-file-preview';
import { MarkdownFilePreview } from './file-preview/markdown-file-preview';
import { RtfFilePreview } from './file-preview/rtf-file-preview';
import { EpubFilePreview } from './file-preview/epub-file-preview';

export interface PreviewHandlerProps {
  url: string;
  mimeType: string;
  editable?: boolean;
  onSave?: (content: string | Blob) => void | Promise<void>;
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
    test: (mimeType: string) => mimeType === 'text/csv',
    component: CsvFilePreview as PreviewHandler,
  },
  {
    test: (mimeType: string) => mimeType === 'text/markdown',
    component: MarkdownFilePreview as PreviewHandler,
  },
  {
    test: (mimeType: string) => mimeType === 'application/rtf' || mimeType === 'text/rtf',
    component: RtfFilePreview as PreviewHandler,
  },
  {
    test: (mimeType: string) => mimeType === 'application/epub+zip',
    component: EpubFilePreview as PreviewHandler,
  },
  {
    test: (mimeType: string) => 
      mimeType.startsWith('text/') ||
      mimeType === 'text/plain' ||
      mimeType === 'application/json' || 
      mimeType === 'application/javascript' ||
      mimeType === 'application/xml' ||
      mimeType === 'application/x-yaml' ||
      mimeType === 'text/yaml',
    component: TextFilePreview as PreviewHandler,
  },
  {
    test: (mimeType: string) => 
      mimeType === 'application/msword' || 
      mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    component: WordDocumentFilePreview as PreviewHandler,
  },
  {
    test: (mimeType: string) => 
      mimeType === 'application/vnd.ms-excel' || 
      mimeType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    component: ExcelFilePreview as PreviewHandler,
  },
  {
    test: (mimeType: string) => 
      mimeType === 'application/vnd.ms-powerpoint' || 
      mimeType === 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    component: PowerPointFilePreview as PreviewHandler,
  },
];

export function getPreviewComponent(mimeType: string): PreviewHandler | null {
  const entry = previewRegistry.find(e => e.test(mimeType));
  return entry ? entry.component : null;
}
