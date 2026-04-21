import { useState, useEffect } from 'react';

export interface FileTypeInfo {
  mimeType: string | null;
  loading: boolean;
  error: Error | null;
}

export type DetectionMethod = 'request' | 'url';

const mimeMap: Record<string, string> = {
  'jpg': 'image/jpeg',
  'jpeg': 'image/jpeg',
  'png': 'image/png',
  'gif': 'image/gif',
  'svg': 'image/svg+xml',
  'webp': 'image/webp',
  'bmp': 'image/bmp',
  'ico': 'image/x-icon',
  'pdf': 'application/pdf',
  'txt': 'text/plain',
  'html': 'text/html',
  'htm': 'text/html',
  'json': 'application/json',
  'mp4': 'video/mp4',
  'webm': 'video/webm',
  'ogg': 'video/ogg',
  'mp3': 'audio/mpeg',
  'wav': 'audio/wav',
  'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'doc': 'application/msword',
  'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'xls': 'application/vnd.ms-excel',
  'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'ppt': 'application/vnd.ms-powerpoint',
  'csv': 'text/csv',
  'md': 'text/markdown',
  'markdown': 'text/markdown',
};

function getMimeFromUrl(url: string): string | null {
  try {
    const urlObj = new URL(url, 'http://dummy.com');
    const pathname = urlObj.pathname;
    const extension = pathname.split('.').pop()?.toLowerCase();
    return extension ? mimeMap[extension] || null : null;
  } catch (err) {
    const extension = url.split(/[#?]/)[0].split('.').pop()?.toLowerCase();
    return extension ? mimeMap[extension] || null : null;
  }
}

export function useFileType(url: string, method: DetectionMethod = 'request'): FileTypeInfo {
  const [info, setInfo] = useState<FileTypeInfo>({
    mimeType: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;

    async function detect() {
      setInfo({ mimeType: null, loading: true, error: null });

      if (method === 'url') {
        const mimeType = getMimeFromUrl(url);
        if (isMounted) {
          setInfo({ mimeType, loading: false, error: null });
        }
        return;
      }

      try {
        const response = await fetch(url, { method: 'HEAD' });
        if (!isMounted) return;

        if (response.ok) {
          // Handle case where markdown files might sometimes return text/plain or similar generic types
          let contentType = response.headers.get('content-type');
          // Fallback to file extension-based detection if ambiguous/unknown type
          if (
            contentType !== null &&
            (
              contentType === 'application/octet-stream' ||
              contentType === 'text/plain' ||
              contentType === 'text/x-markdown'
            )
          ) {
            const urlMime = getMimeFromUrl(url);
            // If extension indicates markdown, return the correct mime type
            if (urlMime === 'text/markdown') {
              contentType = 'text/markdown';
            }
          }
          setInfo({ mimeType: contentType, loading: false, error: null });
        } else {
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

    detect();

    return () => {
      isMounted = false;
    };
  }, [url, method]);

  return info;
}
