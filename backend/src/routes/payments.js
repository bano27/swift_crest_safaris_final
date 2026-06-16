const express = require('express');
const axios   = require('axios');
const router  = express.Router();

// ── M-Pesa STK Push ───────────────────────────────────────────
router.post('/mpesa/stk', async (req, res) => {
  const { phone, amount, ref, description } = req.body;

  if (!process.env.MPESA_CONSUMER_KEY || process.env.MPESA_CONSUMER_KEY === 'your_consumer_key') {
    // Simulation mode — return success for development
    console.log(`📱 M-Pesa STK Push (SIMULATION): ${phone} → KES ${amount} [${ref}]`);
    return res.json({ success: true, simulation: true, message: 'STK Push sent (simulation mode)', CheckoutRequestID: 'sim_' + Date.now() });
  }

  try {
    const isSandbox = process.env.MPESA_ENV !== 'production';
    const baseURL   = isSandbox ? 'https://sandbox.safaricom.co.ke' : 'https://api.safaricom.co.ke';

    // Get access token
    const tokenRes = await axios.get(`${baseURL}/oauth/v1/generate?grant_type=client_credentials`, {
      auth: { username: process.env.MPESA_CONSUMER_KEY, password: process.env.MPESA_CONSUMER_SECRET }
    });
    const token = tokenRes.data.access_token;

    // Build STK payload
    const timestamp = new Date().toISOString().replace(/[-T:.Z]/g,'').slice(0,14);
    const password  = Buffer.from(`${process.env.MPESA_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`).toString('base64');

    const formatted = phone.replace(/^\+?254|^0/, '254');
    const stkRes = await axios.post(`${baseURL}/mpesa/stkpush/v1/processrequest`, {
      BusinessShortCode: process.env.MPESA_SHORTCODE,
      Password:          password,
      Timestamp:         timestamp,
      TransactionType:   'CustomerPayBillOnline',
      Amount:            Math.ceil(amount),
      PartyA:            formatted,
      PartyB:            process.env.MPESA_SHORTCODE,
      PhoneNumber:       formatted,
      CallBackURL:       process.env.MPESA_CALLBACK_URL,
      AccountReference:  ref,
      TransactionDesc:   description || 'Safari Booking',
    }, { headers: { Authorization: `Bearer ${token}` } });

    res.json({ success: true, ...stkRes.data });
  } catch (err) {
    console.error('M-Pesa error:', err.response?.data || err.message);
    res.status(500).json({ error: 'M-Pesa request failed', details: err.response?.data });
  }
});

// ── M-Pesa Callback ───────────────────────────────────────────
router.post('/mpesa/callback', (req, res) => {
  const result = req.body?.Body?.stkCallback;
  if (result?.ResultCode === 0) {
    console.log('✅ M-Pesa payment successful:', result.CheckoutRequestID);
    // TODO: Update booking status in database
  } else {
    console.log('❌ M-Pesa payment failed:', result?.ResultDesc);
  }
  res.json({ ResultCode: 0, ResultDesc: 'Accepted' });
});

module.exports = router;
