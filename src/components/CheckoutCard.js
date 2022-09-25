import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import accounting from 'accounting';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import { useStateValue } from '../context/ProductContext';

export default function CheckouCard({
  product: { id, name, productType, price, rating, image, description, info },
}) {
  const [state, dispatch] = useStateValue();
  const removeItem = () => {
    dispatch({
      type: 'REMOVE_ITEM',
      id: id,
    });
  };
  return (
    <Card sx={{ maxWidth: 360 }}>
      <CardHeader
        action={
          <Typography variant='h6' color='textSecondary'>
            {accounting.formatMoney(price, '💲')}
          </Typography>
        }
        title={name}
        subheader={productType}
        sx={{ whiteSpace: 'noWrap' }}
      />
      <CardMedia component='img' height='194' image={image} alt={name} />
      <CardContent>
        <Typography variant='body2' color='text.secondary'>
          {description}
        </Typography>
      </CardContent>
      <CardActions
        disableSpacing
        sx={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <IconButton aria-label='share'>
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>⭐</p>
            ))}
        </IconButton>
        <IconButton aria-label='Add to Cart'>
          <DeleteForeverRoundedIcon
            fontSize='large'
            color='primary'
            onClick={removeItem}
          />
        </IconButton>
      </CardActions>
    </Card>
  );
}
