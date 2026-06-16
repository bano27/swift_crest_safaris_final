// ── contact.js ────────────────────────────────────────────────
const express = require('express');
const { body, validationResult } = require('express-validator');
const { sendContactAlert } = require('../services/emailService');

const contactRouter = express.Router();
const contacts = [];

contactRouter.post('/', [
  body('name').trim().notEmpty(),
  body('email').isEmail(),
  body('message').trim().notEmpty(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const contact = { ...req.body, id: Date.now(), createdAt: new Date().toISOString() };
  contacts.push(contact);

  try { await sendContactAlert(contact); } catch(e) { console.error('Email error:', e.message); }
  res.status(201).json({ success: true, message: 'Message received. We\'ll reply within 24 hours.' });
});

contactRouter.get('/', (req, res) => res.json({ contacts, total: contacts.length }));
module.exports = contactRouter;
