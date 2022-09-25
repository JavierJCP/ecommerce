import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Product from './Product';
import products from '../Product.data';

export default function Products() {
  return (
    <Box sx={{ marginTop: 15, p: 3 }}>
      <Grid container spacing={{ xs: 2, md: 3 }}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <Product key={product.id} product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
