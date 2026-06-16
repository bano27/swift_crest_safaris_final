const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// ── Booking Alert Email ────────────────────────────────────────
async function sendBookingAlert(booking) {
  const kw = Array.isArray(booking.keywords) ? booking.keywords.join(', ') : (booking.keywords || 'None');
  const html = `
  <div style="font-family:Arial,sans-serif;max-width:620px;margin:0 auto;background:#0a0a0a;color:#f5edd6;border:1px solid #9a6f1a">
    <div style="background:linear-gradient(135deg,#1a0f00,#0a0a0a);padding:28px;text-align:center;border-bottom:2px solid #C9972B">
      <h1 style="font-size:26px;color:#C9972B;margin:0">🦁 Swift Crest Safaris</h1>
      <p style="color:#f5edd6;font-style:italic;margin:6px 0 0">New Booking Received!</p>
    </div>
    <div style="padding:28px">
      <table style="width:100%;border-collapse:collapse">
        ${[
          ['Booking Ref', booking.ref, true],
          ['Guest Name', `${booking.firstName} ${booking.lastName}`],
          ['Email', booking.email],
          ['Phone', booking.phone || 'Not provided'],
          ['Nationality', booking.nationality || 'Not provided'],
          ['Destination', booking.destination],
          ['Camp / Lodge', booking.camp],
          ['Adults (13+)', booking.adults],
          ['Children (<12)', booking.children],
          ['Arrival', booking.arrival],
          ['Departure', booking.departure],
          ['Nights', booking.nights],
          ['Season', booking.season],
          ['Adult Rate/Night', `KES ${Number(booking.adultRateKES).toLocaleString()}`],
          ['Child Rate/Night', `KES ${Number(booking.childRateKES).toLocaleString()}`],
          ['TOTAL KES', `KES ${Number(booking.totalKES).toLocaleString()}`, false, true],
          ['TOTAL USD', `USD $${Number(booking.totalUSD).toLocaleString()}`, false, true],
          ['Payment Method', booking.paymentMethod === 'mpesa' ? '📱 M-Pesa' : '💳 Card'],
          ['Interests', kw],
          ['Notes', booking.notes || 'None'],
        ].map(([l, v, big, gold]) => `
          <tr style="background:${gold?'rgba(201,151,43,0.1)':'transparent'}">
            <td style="padding:10px 14px;color:#C9972B;border-bottom:1px solid #2a2a2a;width:40%;font-family:Arial;font-size:13px;font-weight:bold">${l}</td>
            <td style="padding:10px 14px;border-bottom:1px solid #2a2a2a;font-size:${big?'18px':'14px'};font-weight:${big||gold?'bold':'normal'};color:${gold?'#C9972B':'#f5edd6'};letter-spacing:${big?'2px':'normal'}">${v}</td>
          </tr>`).join('')}
      </table>
      <div style="margin-top:20px;padding:14px;background:rgba(201,151,43,0.1);border-left:3px solid #C9972B;border-radius:2px">
        <p style="margin:0;color:#C9972B;font-weight:bold;font-size:14px">⏰ Action Required</p>
        <p style="margin:8px 0 0;color:#f5edd6;font-size:13px">Please contact this guest within 24 hours to confirm their itinerary and arrange logistics.</p>
      </div>
    </div>
    <div style="padding:18px;text-align:center;border-top:1px solid #2a2a2a;color:#666;font-size:12px">
      <p>Swift Crest Safaris · Kenyatta Avenue, Nairobi · +254 700 000 000</p>
      <p style="margin:4px 0 0;font-style:italic">"Where comfort meets unforgettable experience."</p>
    </div>
  </div>`;

  await transporter.sendMail({
    from: `"Swift Crest Safaris" <${process.env.GMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL || process.env.GMAIL_USER,
    subject: `🦁 New Booking ${booking.ref} — ${booking.firstName} ${booking.lastName} (${booking.destination})`,
    html,
  });
}

// ── Guest Confirmation Email ────────────────────────────────────
async function sendGuestConfirmation(booking) {
  const html = `
  <div style="font-family:Arial,sans-serif;max-width:620px;margin:0 auto;background:#0a0a0a;color:#f5edd6;border:1px solid #9a6f1a">
    <div style="background:linear-gradient(135deg,#1a0f00,#0a0a0a);padding:28px;text-align:center;border-bottom:2px solid #C9972B">
      <h1 style="font-size:26px;color:#C9972B;margin:0">🦁 Swift Crest Safaris</h1>
      <h2 style="color:#f5edd6;margin:10px 0 0;font-size:18px">Your Safari is Confirmed!</h2>
    </div>
    <div style="padding:28px">
      <p style="font-size:16px">Dear <strong>${booking.firstName}</strong>,</p>
      <p style="color:#ccc;line-height:1.7">Thank you for choosing Swift Crest Safaris. Your booking is confirmed and our team is already planning your extraordinary Kenyan adventure.</p>
      <div style="background:rgba(201,151,43,0.08);border:1px solid #9a6f1a;border-radius:4px;padding:20px;margin:20px 0">
        <h3 style="color:#C9972B;margin:0 0 14px;font-size:16px">Booking Summary</h3>
        <table style="width:100%;border-collapse:collapse">
          ${[
            ['Booking Ref', booking.ref],
            ['Destination', booking.destination],
            ['Camp / Lodge', booking.camp],
            ['Arrival', booking.arrival],
            ['Departure', booking.departure],
            ['Guests', `${booking.adults} Adult(s), ${booking.children} Child(ren)`],
            ['Total Amount', `KES ${Number(booking.totalKES).toLocaleString()} (≈ USD $${Number(booking.totalUSD).toLocaleString()})`],
            ['Payment', booking.paymentMethod === 'mpesa' ? 'M-Pesa' : 'Credit/Debit Card'],
          ].map(([l,v]) => `<tr><td style="padding:7px 0;color:#999;font-size:13px;width:40%">${l}:</td><td style="padding:7px 0;color:#f5edd6;font-size:13px;font-weight:bold">${v}</td></tr>`).join('')}
        </table>
      </div>
      <p style="color:#ccc;font-size:14px">Our team will contact you within 24 hours to finalize your itinerary. For any queries, call us on <strong style="color:#C9972B">+254 700 000 000</strong> or WhatsApp.</p>
      <div style="margin-top:20px;padding:14px;background:rgba(201,151,43,0.08);border-radius:4px;text-align:center">
        <p style="color:#C9972B;font-style:italic;font-size:15px;margin:0">"Where comfort meets unforgettable experience."</p>
      </div>
    </div>
    <div style="padding:18px;text-align:center;border-top:1px solid #2a2a2a;color:#666;font-size:12px">
      <p>Swift Crest Safaris · Kenyatta Avenue, Nairobi · thairukibe2798@gmail.com</p>
    </div>
  </div>`;

  await transporter.sendMail({
    from: `"Swift Crest Safaris" <${process.env.GMAIL_USER}>`,
    to: booking.email,
    subject: `✅ Booking Confirmed – ${booking.ref} | Swift Crest Safaris`,
    html,
  });
}

// ── Contact Alert Email ────────────────────────────────────────
async function sendContactAlert(contact) {
  const html = `
  <div style="font-family:Arial,sans-serif;max-width:620px;margin:0 auto;background:#0a0a0a;color:#f5edd6;border:1px solid #9a6f1a">
    <div style="background:#1a0f00;padding:20px;text-align:center;border-bottom:2px solid #C9972B">
      <h2 style="color:#C9972B;margin:0">📨 New Contact Message</h2>
    </div>
    <div style="padding:24px">
      <p><strong style="color:#C9972B">From:</strong> ${contact.name}</p>
      <p><strong style="color:#C9972B">Email:</strong> ${contact.email}</p>
      <p><strong style="color:#C9972B">Phone:</strong> ${contact.phone || 'Not provided'}</p>
      <p><strong style="color:#C9972B">Subject:</strong> ${contact.subject || 'Not specified'}</p>
      <div style="background:#1a1a1a;padding:16px;border-radius:4px;margin-top:12px">
        <strong style="color:#C9972B">Message:</strong>
        <p style="margin-top:8px;line-height:1.7;color:#ccc">${contact.message}</p>
      </div>
    </div>
  </div>`;

  await transporter.sendMail({
    from: `"Swift Crest Safaris" <${process.env.GMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL || process.env.GMAIL_USER,
    subject: `📨 Contact: ${contact.name} — ${contact.subject || 'General Inquiry'}`,
    html,
  });
}

module.exports = { sendBookingAlert, sendGuestConfirmation, sendContactAlert };
