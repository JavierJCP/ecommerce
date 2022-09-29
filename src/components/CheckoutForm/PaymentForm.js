import { Button, Divider, Typography } from '@mui/material';
import Review from './Review';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useStateValue } from '../../context/ProductContext';
import accounting from 'accounting';
import axios from 'axios';
import { useState } from 'react';
import './styles/PaymentLoader.css';

const CARD_ELEMENT_OPTIONS = {
  iconSyle: 'solid',
  hidePostalCode: true,
  style: {
    base: {
      iconColor: 'rgb(240,57,122)',
      color: '#333',
      fontSize: '18px',
      '::placeholder': {
        color: '#ccc',
      },
    },
    invalid: {
      color: '#e5424d',
      ':focus': {
        color: '#303238',
      },
    },
  },
};

const CheckoutForm = ({ backStep, nextStep }) => {
  const [state, dispatch] = useStateValue();
  const basket = state.basket;
  const [loading, setLoading] = useState(false);

  const stripe = useStripe();
  const element = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: element.getElement(CardElement),
    });
    setLoading(true);
    // console.log(paymentMethod);
    if (!error) {
      try {
        const { id } = paymentMethod;
        const { data } = await axios.post(
          'http://localhost:4000/api/checkout',
          {
            id: id,
            amount: getBasketTotal(basket) * 100,
          }
        );
        // console.log(data);
        dispatch({
          type: 'PAYMENT_MESSAGE',
          paymentMessage: data.message,
        });
        // console.log(state.paymentMessage);
        // alert(data.message);
        if (data.message === 'Succesful payment') {
          dispatch({
            type: 'EMPTY_BASKET',
            basket: [],
          });
        }

        element.getElement(CardElement.clear());
        nextStep();
      } catch (error) {
        // console.error(error);
        nextStep();
      }
      setLoading(false);
    }
  };

  function getBasketTotal(basket) {
    const suma = basket?.reduce((amount, item) => item.price + amount, 0);
    return suma;
  }
  return (
    <form onSubmit={handleSubmit}>
      <CardElement options={CARD_ELEMENT_OPTIONS} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '1rem',
        }}
      >
        <Button variant='outlined' onClick={backStep}>
          Back
        </Button>
        <Button
          type='submit'
          variant='contained'
          color='primary'
          disabled={false}
        >
          {loading ? (
            <div class='lds-dual-ring'></div>
          ) : (
            `Pay ${accounting.formatMoney(getBasketTotal(basket), '💲')}`
          )}
        </Button>
      </div>
    </form>
  );
};

const PaymentForm = ({ backStep, nextStep }) => {
  const stripePromise = loadStripe(
    'pk_test_51LmfcfAZeQjH9mEg7AUDUBJDIgv1oUZ9viGDkJhPzkiZZIqNySCUw4U7v3iKtl92V13TYYx10qrddIqxd8F16mZ300bESbYVu9'
  );
  return (
    <>
      <Review />
      <Divider />
      <Typography variant='h6' gutterBottom style={{ margin: '20px 0' }}>
        Payment method
      </Typography>
      <Elements stripe={stripePromise}>
        <CheckoutForm backStep={backStep} nextStep={nextStep} />
      </Elements>
    </>
  );
};

export default PaymentForm;
