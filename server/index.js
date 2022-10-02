const express = require('express');
const Stripe = require('stripe');
const cors = require('cors');
require('dotenv').config();
const path = require('node:path');

const app = express();

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

//midleware
app.use(cors({ origin: 'http://localhost:3000' }));
// app.use(cors());
app.use(express.json());

//static
app.use(express.static(path.join(__dirname, '../build')));

console.log(path.join(__dirname, '../build'));

app.post('/api/checkout', async (req, res) => {
  // console.log(process.env.STRIPE_PRIVATE_KEY);
  const { id, amount } = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: 'USD',
      description: 'Basket of products',
      payment_method: id,
      confirm: true,
    });
    console.log(payment);
    return res.status(200).json({ message: 'Succesful payment' });
  } catch (error) {
    // console.log(error.message);
    return res.json({ message: error.message });
  }
});

const port = 4000;

app.listen(port, () => {
  console.log(`Server ready on http://localhost:${port}`);
});
