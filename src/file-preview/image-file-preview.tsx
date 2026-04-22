import React, { useRef } from 'react';
import { FilePreviewProps } from './file-preview-props';
import PhotoEditor, { PhotoEditorHandle } from '../components/PhotoEditor';

export function ImageFilePreview({ url, mimeType, editable, onSave }: FilePreviewProps) {
  const editorRef = useRef<PhotoEditorHandle>(null);
  const [imageSrc, setImageSrc] = React.useState<string>(url);

  const handleEdit = () => {
    if (editorRef.current) {
      editorRef.current.open({ image: imageSrc });
    }
  };

  const handleUpdateImage = (base64: string) => {
    setImageSrc(base64);
    if (onSave) {
      // base64 string needs to be converted to Blob if onSave expects Blob
      onSave(base64);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <img
        style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }}
        src={imageSrc}
        alt="File preview"
      />
      {editable && (
        <button onClick={handleEdit} style={{ marginTop: '8px' }}>
          Edit Image
        </button>
      )}
      <PhotoEditor ref={editorRef} updateImage={handleUpdateImage} />
    </div>
  );
}
