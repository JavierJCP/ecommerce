import { Button, Grid, Typography } from '@mui/material';
import { Fragment } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import AddressInput from './AddressInput';
import { useStateValue } from '../../context/ProductContext';

export default function AddressForm({ nextStep }) {
  const methods = useForm();
  const [state, dispatch] = useStateValue();

  const onSubmit = (data) => {
    // console.log(data);
    dispatch({
      type: 'SET_SHIPPING_DATA',
      shippingData: data,
    });

    nextStep();
  };
  return (
    <Fragment>
      <Typography variant='h6' gutterBottom>
        Shipping Addres
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            {/* <input {...register('first_name', { required: true })} />
          {errors.first_name && <span>This field is required</span>}
          <button>Enviar</button> */}
            <AddressInput required name='firstName' label='Firts Name' />
            <AddressInput required name='lastName' label='Last Name' />
            <AddressInput required name='address' label='Address' />
            <AddressInput required name='email' label='Email' />
            <AddressInput required name='city' label='City' />
            <AddressInput required name='postCode' label='Post Code' />
          </Grid>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '1rem',
            }}
          >
            <Button
              variant='contained'
              color='primary'
              component={Link}
              to='/checkout'
            >
              Back
            </Button>
            <Button variant='contained' color='primary' type='submit'>
              Next
            </Button>
          </div>
        </form>
      </FormProvider>
    </Fragment>
  );
}
