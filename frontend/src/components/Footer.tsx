import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="scs-footer">
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-4">
            <div className="d-flex align-items-center gap-3 mb-3">
              <img src={logo} alt="Logo" style={{ height: 50, width: 50, borderRadius: '50%', border: '1.5px solid var(--gold)' }} />
              <div>
                <div className="footer-brand-name">Swift Crest Safaris</div>
                <div className="footer-tagline">"Where comfort meets unforgettable experience."</div>
              </div>
            </div>
            <p className="footer-desc">Kenya's premier luxury safari operator. We craft bespoke wildlife journeys through the Maasai Mara, Amboseli, Samburu, and beyond — connecting you with Africa's wild heart.</p>
            <div className="d-flex gap-2 mt-3">
              {['facebook', 'instagram', 'twitter-x', 'youtube', 'whatsapp'].map(s => (
                <a key={s} href="#" className="social-link"><i className={`bi bi-${s}`}></i></a>
              ))}
            </div>
          </div>

          <div className="col-lg-2 col-md-4 col-6">
            <div className="footer-heading">Quick Links</div>
            <ul className="footer-links">
              {[['/', 'Home'], ['/events', 'Events'], ['/bookings', 'Bookings'], ['/about', 'About Us'], ['/contact', 'Contact']].map(([to, label]) => (
                <li key={to}><Link to={to}>{label}</Link></li>
              ))}
            </ul>
          </div>

          <div className="col-lg-3 col-md-4 col-6">
            <div className="footer-heading">Top Destinations</div>
            <ul className="footer-links">
              {['Maasai Mara', 'Amboseli NP', 'Samburu Reserve', 'Lake Nakuru', 'Tsavo East & West', 'Diani Beach'].map(d => (
                <li key={d}><Link to="/bookings">{d}</Link></li>
              ))}
            </ul>
          </div>

          <div className="col-lg-3 col-md-4">
            <div className="footer-heading">Contact Us</div>
            <div style={{ fontSize: '0.88rem', color: 'var(--text-muted-custom)' }}>
              {[
                ['geo-alt', 'Kenyatta Avenue, Nairobi, Kenya'],
                ['telephone', '+254 700 000 000'],
                ['envelope', 'thairukibe2798@gmail.com'],
                ['clock', 'Mon–Sat: 8:00 AM – 6:00 PM EAT'],
                ['whatsapp', '+254 700 000 000 (WhatsApp)'],
              ].map(([icon, text]) => (
                <p key={icon} className="mb-2 d-flex align-items-center gap-2">
                  <i className={`bi bi-${icon}`} style={{ color: 'var(--gold)' }}></i>
                  <span>{text}</span>
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Map embed */}
        <div className="mt-4" style={{ borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--border-gold)' }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8174!2d36.8219!3d-1.2921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d664b2d8a7%3A0x3b0ce0db8b62c069!2sNairobi%2C%20Kenya!5e0!3m2!1sen!2ske!4v1620000000000"
            width="100%" height="200" style={{ border: 0, filter: 'grayscale(80%) invert(10%)' }}
            allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            title="Swift Crest Safaris Office Location"
          ></iframe>
        </div>

        <div className="footer-bottom d-flex justify-content-between align-items-center flex-wrap gap-3">
          <div className="footer-copy">&copy; {year} <span>Swift Crest Safaris</span>. All Rights Reserved. Crafted with ❤️ in Kenya.</div>
          <div className="d-flex gap-3">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(t => (
              <a key={t} href="#" style={{ color: 'var(--text-muted-custom)', fontSize: '0.6rem', fontFamily: 'var(--font-ui)', letterSpacing: '0.08em' }}>{t}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
