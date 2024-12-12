import React, { useState } from 'react';
import FormBuilder from './components/FormBuilder';
import FormList from './components/FormList';

const App = () => {
  const [savedForms] = useState([]);

  const handleSaveForm = async (formStructure) => {
    try {
      // debugger
      const response = await fetch('http://localhost/form-builder/save-form.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'My Form', // You can make this dynamic
          structure: formStructure.fields,
        }),
      });
  
      if (response.ok) {
        alert('Form saved successfully!');
      } else {
        alert('Error saving form!');
      }
    } catch (error) {
      console.error('Error saving form:', error);
      alert('Failed to save the form!');
    }
  };
  

  const fetchForms = async () => {
    // Simulate fetching from the backend
    return savedForms;

    // Uncomment the following lines to fetch from a real backend:
    /*
    const response = await fetch('http://your-backend-url/get-forms');
    const data = await response.json();
    return data;
    */
  };

  return (
    <div>
      <FormBuilder onSave={handleSaveForm} />
      <FormList fetchForms={fetchForms} />
    </div>
  );
};

export default App;
