import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FilePreviewProps } from './file-preview-props';
import { DefaultFilePreview } from './default-file-preview';

export function MarkdownFilePreview(props: FilePreviewProps) {
  const { url } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [isFailed, setIsFailed] = useState(false);
  const [contents, setContents] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');

  useEffect(() => {
    setIsLoading(true);
    setIsFailed(false);
    fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch');
        return response.text();
      })
      .then((text) => {
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
    return <div style={{ padding: '20px' }}>Loading markdown...</div>;
  }

  if (isFailed || contents === null) {
    return <DefaultFilePreview {...props} />;
  }

  const tabStyle = (isActive: boolean): React.CSSProperties => ({
    padding: '10px 20px',
    cursor: 'pointer',
    borderBottom: isActive ? '2px solid #007bff' : '2px solid transparent',
    color: isActive ? '#007bff' : '#495057',
    fontWeight: isActive ? '600' : '400',
    backgroundColor: 'transparent',
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    outline: 'none',
    transition: 'all 0.2s ease-in-out',
    fontSize: '14px',
  });

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%', 
      width: '100%',
      backgroundColor: '#fff',
      border: '1px solid #dee2e6',
      borderRadius: '4px',
      overflow: 'hidden'
    }}>
      <div style={{ 
        display: 'flex', 
        borderBottom: '1px solid #dee2e6', 
        backgroundColor: '#f8f9fa'
      }}>
        <button style={tabStyle(activeTab === 'preview')} onClick={() => setActiveTab('preview')}>
          Preview
        </button>
        <button style={tabStyle(activeTab === 'code')} onClick={() => setActiveTab('code')}>
          Code Preview
        </button>
      </div>
      <div style={{ flex: 1, overflow: 'auto', padding: '20px' }}>
        {activeTab === 'preview' ? (
          <div className="markdown-preview" style={{ lineHeight: '1.6', color: '#212529' }}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{contents}</ReactMarkdown>
          </div>
        ) : (
          <pre
            style={{
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-all',
              fontSize: '14px',
              backgroundColor: '#f8f9fa',
              padding: '15px',
              borderRadius: '4px',
              margin: 0,
              fontFamily: 'SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace',
              color: '#212529',
              border: '1px solid #e9ecef'
            }}
          >
            {contents}
          </pre>
        )}
      </div>
    </div>
  );
}
