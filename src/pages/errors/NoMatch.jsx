import React from 'react';
import {
    Container,
    Typography
} from '@mui/material';

const NoMatch = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh'
      }}
    >
      <Typography variant="h1">
        404
      </Typography>
    </Container>
  );
};

export default NoMatch;
