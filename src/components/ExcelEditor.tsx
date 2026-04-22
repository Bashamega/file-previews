import React, { useState, useEffect } from 'react';
import ExcelJS from 'exceljs';

interface ExcelEditorProps {
  url: string;
  onSave?: (blob: Blob) => void | Promise<void>;
}

export const ExcelEditor: React.FC<ExcelEditorProps> = ({ url, onSave }) => {
  const [workbook, setWorkbook] = useState<ExcelJS.Workbook | null>(null);
  const [data, setData] = useState<any[][]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadWorkbook = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch file');
        const arrayBuffer = await response.arrayBuffer();
        
        const wb = new ExcelJS.Workbook();
        await wb.xlsx.load(arrayBuffer);
        setWorkbook(wb);

        const sheet = wb.worksheets[0];
        const rows: any[][] = [];
        sheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
          const rowData: any[] = [];
          // ExcelJS rows are 1-indexed
          for (let i = 1; i <= sheet.columnCount; i++) {
            const cell = row.getCell(i);
            rowData.push(cell.value);
          }
          rows[rowNumber - 1] = rowData;
        });
        
        // Ensure we have a rectangular grid
        const maxCols = sheet.columnCount || 0;
        const normalizedData = rows.map(row => {
            const newRow = row || [];
            while (newRow.length < maxCols) newRow.push('');
            return newRow;
        });

        setData(normalizedData);
      } catch (err: any) {
        setError(err.message || 'Failed to load Excel file');
      } finally {
        setIsLoading(false);
      }
    };

    loadWorkbook();
  }, [url]);

  const handleCellChange = (rowIndex: number, colIndex: number, value: string) => {
    const newData = [...data];
    newData[rowIndex] = [...newData[rowIndex]];
    newData[rowIndex][colIndex] = value;
    setData(newData);
  };

  const handleSave = async () => {
    if (!workbook || !onSave) return;
    
    setIsSaving(true);
    try {
      const sheet = workbook.worksheets[0];
      
      data.forEach((rowData, rowIndex) => {
        const row = sheet.getRow(rowIndex + 1);
        rowData.forEach((value, colIndex) => {
          row.getCell(colIndex + 1).value = value;
        });
        row.commit();
      });

      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      await onSave(blob);
    } catch (err: any) {
      setError(err.message || 'Failed to save Excel file');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <div style={{ padding: '20px' }}>Loading Excel editor...</div>;
  if (error) return <div style={{ padding: '20px', color: 'red' }}>Error: {error}</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '10px' }}>
      <div style={{ flex: 1, overflow: 'auto', border: '1px solid #ccc' }}>
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td style={{ 
                    backgroundColor: '#f0f0f0', 
                    border: '1px solid #ccc', 
                    padding: '4px', 
                    width: '30px', 
                    textAlign: 'center',
                    fontSize: '12px'
                }}>
                  {rowIndex + 1}
                </td>
                {row.map((cell, colIndex) => (
                  <td key={colIndex} style={{ border: '1px solid #ccc', padding: 0 }}>
                    <input
                      type="text"
                      value={cell?.toString() || ''}
                      onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                      style={{
                        width: '100%',
                        border: 'none',
                        padding: '8px',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <button
          onClick={handleSave}
          disabled={isSaving}
          style={{
            padding: '8px 16px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isSaving ? 'not-allowed' : 'pointer'
          }}
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
};
