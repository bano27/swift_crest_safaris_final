require('dotenv').config();
const express    = require('express');
const cors       = require('cors');
const helmet     = require('helmet');
const morgan     = require('morgan');
const rateLimit  = require('express-rate-limit');

const bookingRoutes  = require('./routes/bookings');
const contactRoutes  = require('./routes/contact');
const paymentRoutes  = require('./routes/payments');
const adminRoutes    = require('./routes/admin');
const authRoutes     = require('./routes/auth');

const app  = express();
const PORT = process.env.PORT || 5000;

// ── Security & Middleware ─────────────────────────────────────
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173', credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));

// ── Rate Limiting ─────────────────────────────────────────────
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100, message: { error: 'Too many requests, please try again later.' } });
app.use('/api/', limiter);

// ── Routes ────────────────────────────────────────────────────
app.use('/api/bookings',  bookingRoutes);
app.use('/api/contact',   contactRoutes);
app.use('/api/payments',  paymentRoutes);
app.use('/api/admin',     adminRoutes);
app.use('/api/auth',      authRoutes);

// ── Health Check ──────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', service: 'Swift Crest Safaris API', timestamp: new Date().toISOString() });
});

// ── 404 ───────────────────────────────────────────────────────
app.use((req, res) => res.status(404).json({ error: 'Route not found' }));

// ── Error Handler ─────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});

// ── Start ─────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🦁 Swift Crest Safaris API`);
  console.log(`   Running on http://localhost:${PORT}`);
  console.log(`   Environment: ${process.env.NODE_ENV || 'development'}\n`);
  console.log(`📋 Endpoints:`);
  console.log(`   POST /api/bookings       – Create booking + email alert`);
  console.log(`   GET  /api/bookings       – List bookings`);
  console.log(`   POST /api/contact        – Contact form + email alert`);
  console.log(`   POST /api/payments/mpesa – M-Pesa STK push`);
  console.log(`   GET  /api/admin/stats    – Dashboard stats`);
  console.log(`   POST /api/auth/login     – Admin login\n`);
});

module.exports = app;
