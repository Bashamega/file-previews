import {useEffect, useState} from 'react';
import {FilePreviewProps} from './file-preview-props';
import {DefaultFilePreview} from './default-file-preview';

export function TextFilePreview(props: FilePreviewProps) {
  const {url} = props;
  const [isLoading, setIsLoading] = useState(true);
  const [isFailed, setIsFailed] = useState(false);
  const [contents, setContents] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setIsFailed(false);
    fetch(url)
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch');
        return response.text();
      })
      .then(text => {
        setContents(text);
      })
      .catch(() => {
        setIsFailed(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [url]);

  if (isLoading) {
    return <div>Loading file contents...</div>;
  }

  if (isFailed) {
    return (
      <DefaultFilePreview
        {...props}
      />
    );
  }

  return (
    <pre
      style={{
        height: '100%',
        width: '100%',
        overflowY: 'auto',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-all',
        padding: '20px',
        fontSize: '14px',
        backgroundColor: '#f8f9fa',
        margin: 0,
      }}
    >
      {contents}
    </pre>
  );
}
