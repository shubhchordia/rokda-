#fnt.js

document.getElementById('payButton').addEventListener('click', async () => {
  const amount = document.getElementById('amount').value;

  // Make an API request to your server to create an order
  const orderResponse = await fetch('/createOrder', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ amount }),
  });

  const orderData = await orderResponse.json();

  // Open the Razorpay checkout form
  const options = {
    key: 'MftfytxaC9YOQ9',
    amount: orderData.amount,
    currency: 'INR',
    order_id: orderData.id,
    name: 'Rokda',
    description: 'Payment for your product/service',
    handler: function (response) {
      // Handle the payment success
      alert('Payment successful. Payment ID: ' + response.razorpay_payment_id);
    },
  };

  const rzp = new Razorpay(options);
  rzp.open();
});


