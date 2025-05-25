// server.js
const express = require('express');
const app = express();
const stripe = require('stripe')('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');

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
          unit_amount: 2500, // $25.00
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
