import React, { useState, useEffect } from 'react';
import { FilePreviewProps } from './file-preview-props';
import { BaseOfficePreview } from './base-office-preview';
import { ExcelEditor } from '../components/ExcelEditor';

export function ExcelFilePreview(props: FilePreviewProps) {
  const { url, editable, onSave } = props;
  const [activeTab, setActiveTab] = useState<'preview' | 'edit'>('preview');

  useEffect(() => {
    if (editable) {
      setActiveTab('edit');
    } else {
      setActiveTab('preview');
    }
  }, [editable]);

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
        <button
          style={tabStyle(activeTab === 'preview')}
          onClick={() => setActiveTab('preview')}
        >
          Preview
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
      <div style={{ flex: 1, overflow: 'hidden', padding: activeTab === 'edit' ? '20px' : '0' }}>
        {activeTab === 'preview' ? (
          <BaseOfficePreview {...props} title="Excel document preview" />
        ) : (
          <ExcelEditor url={url} onSave={(blob) => onSave?.(blob)} />
        )}
      </div>
    </div>
  );
}
