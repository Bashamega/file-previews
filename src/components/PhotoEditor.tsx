import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';

import {
  openDefaultEditor,
} from '@pqina/pintura';
import '@pqina/pintura/pintura.css';

export interface PhotoEditorProps {
  updateImage: (base64: string) => void;
}

export interface PhotoEditorHandle {
  open: (options: { image: string }) => void;
}

const PhotoEditor = forwardRef<PhotoEditorHandle, PhotoEditorProps>(
  ({ updateImage }, ref) => {
    const editorRef = useRef<any>(null);

    useImperativeHandle(ref, () => ({
      open({ image }) {
        const editor = openDefaultEditor({
          src: image,
        });

        editor.on('process', (res: any) => {
          // res.dest is a blob, we might need to convert it or use it as is
          // If updateImage expects base64, we need to convert it
          const reader = new FileReader();
          reader.onloadend = () => {
            updateImage(reader.result as string);
          };
          reader.readAsDataURL(res.dest);

          editor.close();
        });

        // Listen for the close event to clean up
        editor.on('close', () => {
          editorRef.current = null;
        });

        editorRef.current = editor;
      },
    }));

    return null;
  }
);

export default PhotoEditor;