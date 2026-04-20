import React from 'react';
import { ImagePreview } from './components/ImagePreview';

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
    component: ImagePreview,
  },
  // Future handlers can be added here
  // {
  //   test: (mimeType: string) => mimeType.startsWith('video/'),
  //   component: VideoPreview,
  // }
];

export function getPreviewComponent(mimeType: string): PreviewHandler | null {
  const entry = previewRegistry.find(e => e.test(mimeType));
  return entry ? entry.component : null;
}
