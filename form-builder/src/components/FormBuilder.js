import React, { useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import Sidebar from './Sidebar';
import DroppableCanvas from './DroppableCanvas';
import PropertiesPanel from './PropertiesPanel';
import { Button } from '@mui/material';

const FormBuilder = ({ onSave }) => {
  const [items, setItems] = useState([]);
  const [selectedField, setSelectedField] = useState(null);

  const fields = [
    { id: 'text', label: 'Text Field', type: 'text', placeholder: 'Enter text', value: '' },
    { id: 'textarea', label: 'Text Area', type: 'textarea', placeholder: 'Enter text', value: '' },
    { id: 'number', label: 'Number', type: 'number', placeholder: 'Enter number', value: '' },
    { id: 'checkbox', label: 'Checkbox', type: 'checkbox', value: false },
    { id: 'button', label: 'Button', type: 'button' },
  ];

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over?.id === 'canvas') {
      const draggedItem = fields.find((item) => item.id === active.id);
      setItems([
        ...items,
        { ...draggedItem, id: `${active.id}-${Date.now()}` }, // Unique ID
      ]);
    }
  };

  const handleUpdate = (key, value) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === selectedField.id ? { ...item, [key]: value } : item
      )
    );
    setSelectedField((prev) => ({ ...prev, [key]: value }));
  };

  const handleInputChange = (id, value) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, value } : item))
    );
  };

  const handleSave = () => {
    const formStructure = { fields: items };
    console.log('Form Data:', JSON.stringify(formStructure, null, 2));
    onSave(formStructure);
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>
        <Sidebar fields={fields} />
        <DroppableCanvas
          items={items}
          setSelectedField={setSelectedField}
          selectedField={selectedField}
          onInputChange={handleInputChange}
        />
        <PropertiesPanel selectedField={selectedField} onUpdate={handleUpdate} />
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSave}
        style={{ margin: '20px auto', display: 'block' }}
      >
        Save Form
      </Button>
    </DndContext>
  );
};

export default FormBuilder;
