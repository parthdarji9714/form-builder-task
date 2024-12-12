import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, Divider, Typography } from '@mui/material';

const FormList = ({ fetchForms }) => {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    fetchForms().then((data) => setForms(data));
  }, [fetchForms]);

  return (
    <div style={{ padding: '20px', width: '100%' }}>
      <Typography variant="h5" gutterBottom>
        Previously Created Forms
      </Typography>
      <List>
        {forms.map((form, index) => (
          <React.Fragment key={index}>
            <ListItem>
              <ListItemText
                primary={`Form ${index + 1}`}
                secondary={`Fields: ${form.fields.length}`}
              />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </div>
  );
};

export default FormList;
