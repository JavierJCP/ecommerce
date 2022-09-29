import { List, ListItem, ListItemText, Typography } from '@mui/material';
import { useStateValue } from '../../context/ProductContext';
import accounting from 'accounting';

const Review = () => {
  const [state] = useStateValue();
  const basket = state.basket;

  function getBasketTotal(basket) {
    const suma = basket?.reduce((amount, item) => item.price + amount, 0);
    return suma;
  }
  return (
    <>
      <Typography variant='h6' gutterBottom>
        Order Sumary
      </Typography>
      <List disablePadding>
        {basket?.map((product) => (
          <ListItem key={product.id}>
            <ListItemText primary={product.name} secondary={`Qty: ${1}`} />
            <Typography variant='body2'>
              {accounting.formatMoney(product.price, '💲')}
            </Typography>
          </ListItem>
        ))}
        <ListItem>
          <ListItemText primary='Total' />
          <Typography variant='subtitle1'>
            {accounting.formatMoney(getBasketTotal(basket), '💲')}
          </Typography>
        </ListItem>
      </List>
    </>
  );
};

export default Review;
