import { useState, useEffect } from 'react';

export interface FileTypeInfo {
  mimeType: string | null;
  loading: boolean;
  error: Error | null;
}

export function useFileType(url: string): FileTypeInfo {
  const [info, setInfo] = useState<FileTypeInfo>({
    mimeType: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;

    async function fetchType() {
      setInfo({ mimeType: null, loading: true, error: null });
      try {
        const response = await fetch(url, { method: 'HEAD' });
        if (!isMounted) return;

        if (response.ok) {
          const contentType = response.headers.get('content-type');
          setInfo({ mimeType: contentType, loading: false, error: null });
        } else {
          // Fallback if HEAD is not allowed or failed, try a small GET range or just assume based on extension if needed
          // For now, let's just fail if HEAD fails
          throw new Error(`Failed to fetch file type: ${response.statusText}`);
        }
      } catch (err) {
        if (!isMounted) return;
        setInfo({ 
          mimeType: null, 
          loading: false, 
          error: err instanceof Error ? err : new Error('Unknown error') 
        });
      }
    }

    fetchType();

    return () => {
      isMounted = false;
    };
  }, [url]);

  return info;
}
