import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Editor from '@monaco-editor/react';
import { FilePreviewProps } from './file-preview-props';
import { DefaultFilePreview } from './default-file-preview';

export function MarkdownFilePreview(props: FilePreviewProps) {
  const { url, editable, onSave, mimeType } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [isFailed, setIsFailed] = useState(false);
  const [contents, setContents] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'preview' | 'code' | 'edit'>('preview');
  const [editedContent, setEditedContent] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    if (editable) {
      setActiveTab('edit');
    } else {
      setActiveTab('preview');
    }
  }, [editable]);

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
        setEditedContent(text);
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

  const handleSave = async () => {
    if (!onSave) return;
    setIsSaving(true);
    setSaveError(null);
    try {
      await onSave(editedContent);
    } catch (err: any) {
      setSaveError(err?.message || 'Failed to save');
    } finally {
      setIsSaving(false);
    }
  };

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
        <button
          style={tabStyle(activeTab === 'preview')}
          onClick={() => setActiveTab('preview')}
        >
          Preview
        </button>
        <button
          style={tabStyle(activeTab === 'code')}
          onClick={() => setActiveTab('code')}
        >
          Code Preview
        </button>
        {editable && (
          <button
            style={tabStyle(activeTab === 'edit')}
            onClick={() => setActiveTab('edit')}
          >
            Edit
          </button>
        )}
      </div>
      <div style={{ flex: 1, overflow: 'auto', padding: '20px' }}>
        {activeTab === 'preview' ? (
          <div className="markdown-preview" style={{ lineHeight: '1.6', color: '#212529' }}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {editable ? editedContent : contents}
            </ReactMarkdown>
          </div>
        ) : activeTab === 'code' ? (
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
            {editable ? editedContent : contents}
          </pre>
        ) : (
          // Edit tab using Monaco Editor
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ flex: 1, minHeight: 200, marginBottom: '14px', border: '1px solid #e2e5e7', borderRadius: '3px', overflow: 'hidden' }}>
              <Editor
                height="300px"
                language="markdown"
                theme="vs-dark"
                value={editedContent}
                onChange={(value) => setEditedContent(value ?? '')}
                options={{
                  fontSize: 14,
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  fontFamily: 'SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace',
                  wordWrap: 'on',
                  automaticLayout: true,
                }}
              />
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <button
                onClick={handleSave}
                disabled={isSaving || !onSave}
                style={{
                  background: '#007bff',
                  color: '#fff',
                  padding: '8px 20px',
                  fontSize: '14px',
                  border: 'none',
                  borderRadius: '3px',
                  cursor: isSaving || !onSave ? 'not-allowed' : 'pointer',
                  fontWeight: '600'
                }}
              >
                {isSaving ? 'Saving...' : 'Save'}
              </button>
              {saveError && <span style={{ color: 'red', fontSize: '13px' }}>{saveError}</span>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
