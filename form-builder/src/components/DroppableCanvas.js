import React from 'react';
import { Card, TextField, Checkbox, FormControlLabel } from '@mui/material';
import { useDroppable } from '@dnd-kit/core';

const DroppableCanvas = ({ items, setSelectedField, selectedField, onInputChange }) => {
  const { setNodeRef } = useDroppable({ id: 'canvas' });

  return (
    <Card
      ref={setNodeRef}
      style={{
        padding: '10px',
        minHeight: '400px',
        backgroundColor: '#f4f6f8',
        border: '1px dashed #ccc',
      }}
    >
      <h4>Form Builder</h4>
      {items.map((item) => (
        <Card
          key={item.id}
          onClick={() => setSelectedField(item)}
          style={{
            marginBottom: '10px',
            padding: '10px',
            backgroundColor: selectedField?.id === item.id ? '#e3f2fd' : 'white',
            border: selectedField?.id === item.id ? '2px solid #2196f3' : '1px solid #ccc',
          }}
        >
          {item.type === 'text' || item.type === 'textarea' || item.type === 'number' ? (
            <TextField
              fullWidth
              label={item.label}
              placeholder={item.placeholder || ''}
              value={item.value || ''}
              onChange={(e) => onInputChange(item.id, e.target.value)}
            />
          ) : item.type === 'checkbox' ? (
            <FormControlLabel
              control={
                <Checkbox
                  checked={item.value || false}
                  onChange={(e) => onInputChange(item.id, e.target.checked)}
                />
              }
              label={item.label}
            />
          ) : item.type === 'button' ? (
            <button>{item.label}</button>
          ) : null}
        </Card>
      ))}
    </Card>
  );
};

export default DroppableCanvas;
