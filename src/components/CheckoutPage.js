import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CheckouCard from './CheckoutCard';
import Total from './Total';
import { Fragment } from 'react';
import { useStateValue } from '../context/ProductContext';

export default function CheckoutPage() {
  const [state] = useStateValue();
  function FormRow() {
    return (
      <Fragment>
        {state.basket?.map((product) => (
          <Grid item xs={12} sm={8} md={6} key={product.id}>
            <CheckouCard product={product} />
          </Grid>
        ))}
      </Fragment>
    );
  }
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        // columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid item xs={12}>
          <Typography align='center' gutterBottom variant='h4'>
            Shopping Card
          </Typography>
        </Grid>

        <Grid item xs={12} sm={8} md={9} container spacing={2}>
          <FormRow />
        </Grid>

        <Grid item xs={12} sm={4} md={3}>
          <Typography align='center' gutterBottom variant='h4'>
            <Total />
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
