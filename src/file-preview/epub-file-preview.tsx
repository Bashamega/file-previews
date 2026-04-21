import { useEffect, useRef, useState } from 'react';
import ePub from 'epubjs';
import type { Rendition } from 'epubjs';
import { FilePreviewProps } from './file-preview-props';

export function EpubFilePreview({ url }: FilePreviewProps) {
  const viewerRef = useRef<HTMLDivElement>(null);
  const renditionRef = useRef<Rendition | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!viewerRef.current) return;

    const book = ePub(url);
    const rendition = book.renderTo(viewerRef.current, {
      width: '100%',
      height: '100%',
      flow: 'paginated',
      manager: 'default',
    });

    renditionRef.current = rendition;

    rendition.display().then(() => {
      setIsLoaded(true);
    }).catch((err) => {
      setError(err instanceof Error ? err.message : String(err));
    });

    return () => {
      if (book) {
        book.destroy();
      }
    };
  }, [url]);

  const prevPage = () => {
    if (renditionRef.current) {
      renditionRef.current.prev();
    }
  };

  const nextPage = () => {
    if (renditionRef.current) {
      renditionRef.current.next();
    }
  };

  if (error) {
    return (
      <div style={{ padding: '20px', color: 'red', border: '1px solid red', borderRadius: '4px' }}>
        Error loading EPUB: {error}
      </div>
    );
  }

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%', 
      width: '100%', 
      border: '1px solid #dee2e6', 
      borderRadius: '4px', 
      overflow: 'hidden',
      backgroundColor: '#fff'
    }}>
      <div style={{ flex: 1, position: 'relative', minHeight: '500px' }}>
        <div ref={viewerRef} style={{ height: '100%', width: '100%' }} />
        {!isLoaded && (
          <div style={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            color: '#6c757d'
          }}>
            Loading EPUB...
          </div>
        )}
      </div>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '20px', 
        padding: '10px', 
        backgroundColor: '#f8f9fa', 
        borderTop: '1px solid #dee2e6' 
      }}>
        <button 
          onClick={prevPage} 
          style={{ 
            padding: '8px 16px', 
            cursor: 'pointer',
            border: '1px solid #ced4da',
            borderRadius: '4px',
            background: '#fff',
            color: '#495057',
            fontSize: '14px'
          }}
        >
          Previous
        </button>
        <button 
          onClick={nextPage} 
          style={{ 
            padding: '8px 16px', 
            cursor: 'pointer',
            border: '1px solid #ced4da',
            borderRadius: '4px',
            background: '#fff',
            color: '#495057',
            fontSize: '14px'
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
