import React from 'react';
import { TextField, FormControlLabel, Checkbox, Card, Typography } from '@mui/material';

const PropertiesPanel = ({ selectedField, onUpdate }) => {
  if (!selectedField) return <Typography>Select a field to edit its properties</Typography>;

  return (
    <Card style={{ padding: '20px', backgroundColor: '#fafafa' }}>
      <Typography variant="h6" gutterBottom>
        Edit Properties
      </Typography>
      <TextField
        label="Label"
        fullWidth
        value={selectedField.label}
        onChange={(e) => onUpdate('label', e.target.value)}
        style={{ marginBottom: '10px' }}
      />
      {/* {selectedField.type !== 'button' && (
        <TextField
          label="Placeholder"
          fullWidth
          value={selectedField.placeholder || ''}
          onChange={(e) => onUpdate('placeholder', e.target.value)}
          style={{ marginBottom: '10px' }}
        />
      )} */}
      <FormControlLabel
        control={
          <Checkbox
            checked={selectedField.required || false}
            onChange={(e) => onUpdate('required', e.target.checked)}
          />
        }
        label="Required"
      />
    </Card>
  );
};

export default PropertiesPanel;
