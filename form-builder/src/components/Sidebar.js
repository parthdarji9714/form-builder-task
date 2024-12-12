import React from 'react';
import DraggableItem from './DraggableItem';

const Sidebar = ({ fields }) => {
  return (
    <div
      style={{
        border: '1px solid gray',
        padding: '10px',
        width: '200px',
        background: '#f9f9f9',
      }}
    >
      <h4>Fields</h4>
      {fields.map((field) => (
        <DraggableItem key={field.id} id={field.id} label={field.label} />
      ))}
    </div>
  );
};

export default Sidebar;
