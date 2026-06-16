const express = require('express');
const { body, validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');
const { sendBookingAlert, sendGuestConfirmation } = require('../services/emailService');
const router = express.Router();

// In-memory store (replace with Prisma DB in production)
const bookings = [];

// ── POST /api/bookings ─────────────────────────────────────────
router.post('/', [
  body('firstName').trim().notEmpty().withMessage('First name is required'),
  body('lastName').trim().notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('arrival').notEmpty().withMessage('Arrival date is required'),
  body('departure').notEmpty().withMessage('Departure date is required'),
  body('adults').isInt({ min: 0 }).withMessage('Adults must be a number'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const booking = {
    id: uuidv4(),
    ref: req.body.ref || ('SCS-' + Date.now().toString(36).toUpperCase()),
    ...req.body,
    createdAt: new Date().toISOString(),
  };

  bookings.push(booking);
  console.log(`📋 New booking: ${booking.ref} — ${booking.firstName} ${booking.lastName}`);

  // Send emails (don't fail request if email fails)
  try {
    await sendBookingAlert(booking);
    console.log(`✅ Alert sent to ${process.env.ADMIN_EMAIL}`);
  } catch (e) {
    console.error('❌ Admin email error:', e.message);
  }
  try {
    await sendGuestConfirmation(booking);
    console.log(`✅ Confirmation sent to ${booking.email}`);
  } catch (e) {
    console.error('❌ Guest email error:', e.message);
  }

  res.status(201).json({ success: true, ref: booking.ref, booking });
});

// ── GET /api/bookings ──────────────────────────────────────────
router.get('/', (req, res) => {
  res.json({ bookings, total: bookings.length });
});

// ── GET /api/bookings/:ref ─────────────────────────────────────
router.get('/:ref', (req, res) => {
  const booking = bookings.find(b => b.ref === req.params.ref);
  if (!booking) return res.status(404).json({ error: 'Booking not found' });
  res.json(booking);
});

// ── PUT /api/bookings/:id ──────────────────────────────────────
router.put('/:id', (req, res) => {
  const idx = bookings.findIndex(b => b.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Booking not found' });
  bookings[idx] = { ...bookings[idx], ...req.body, updatedAt: new Date().toISOString() };
  res.json(bookings[idx]);
});

// ── DELETE /api/bookings/:id ───────────────────────────────────
router.delete('/:id', (req, res) => {
  const idx = bookings.findIndex(b => b.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Booking not found' });
  bookings.splice(idx, 1);
  res.json({ success: true, message: 'Booking deleted' });
});

module.exports = router;
