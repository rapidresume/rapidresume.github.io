// server.js
const express = require('express');
const app = express();
const stripe = require('stripe')('pay_api_key');

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Professional Resume Service',
          },
          unit_amount: 1500, // $25.00
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'https://rapidresume.online/form.html',
    cancel_url: 'https://rapidresume.online/fail.html',
  });

  res.json({ url: session.url });
});

app.listen(4242, () => console.log('Server running on port 4242'));
