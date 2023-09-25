#server
const express = require('express');
const bodyParser = require('body-parser');
const Razorpay = require('razorpay');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

const razorpay = new Razorpay({
  key_id: 'rzp_test_PZyAbV4v53aT53',
  key_secret: 'ZJglfp42hOC1VJ9KTmOoAPxZ',
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.post('/createOrder', async (req, res) => {
  try {
    const { amount } = req.body;

    // Create a Razorpay order
    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: 'INR',
      receipt: 'order_receipt',
    });

    res.json(order);
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ error: 'Order creation error' });
  }
});

// Add other server-side routes and logic as needed

