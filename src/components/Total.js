import { Button, Typography } from '@mui/material';
import Container from '@mui/system/Container';
import accounting from 'accounting';
import { useStateValue } from '../context/ProductContext';
import { Link } from 'react-router-dom';

export default function Total() {
  const [state] = useStateValue();
  const basket = state.basket;

  function getBasketTotal(basket) {
    const suma = basket?.reduce((amount, item) => item.price + amount, 0);
    return suma;
  }
  return (
    <Container>
      <Typography variant='h5'>Total Items: {basket?.length}</Typography>
      <Typography variant='h5'>
        {accounting.formatMoney(getBasketTotal(basket), '💲')}
      </Typography>
      <Link to='/checkoutPage' style={{ textDecoration: 'none' }}>
        <Button variant='contained' color='error' sx={{ mt: 2 }}>
          Check out
        </Button>
      </Link>
    </Container>
  );
}
