import { Button, Divider, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { useStateValue } from '../../context/ProductContext';

const Confirmation = () => {
  const [state] = useStateValue();
  return (
    <>
      <Typography variant='h6'>{state.paymentMessage}</Typography>
      <Divider />
      <Typography variant='subtitle' gutterBottom>
        {state.paymentMessage === 'Succesful payment'
          ? 'Your booking reference: Rgh65ffhhtdg'
          : ''}
      </Typography>
      <br />
      <Button
        component={Link}
        to='/'
        variant='outlined'
        type='button'
        sx={{ mt: '2rem' }}
      >
        Back to Home
      </Button>
    </>
  );
};

export default Confirmation;
