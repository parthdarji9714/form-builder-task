import React from 'react';
import { useDraggable } from '@dnd-kit/core';

const DraggableItem = ({ id, label }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({ id });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        padding: '10px',
        margin: '5px 0',
        background: 'white',
        border: '1px solid #ccc',
        cursor: 'grab',
      }}
    >
      {label}
    </div>
  );
};

export default DraggableItem;
