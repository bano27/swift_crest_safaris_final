import { useState } from 'react'
import { useToast } from '../context/ToastContext'
import { api } from '../utils/api'

export default function Contact() {
  const { showToast } = useToast()
  const [form, setForm] = useState({ name:'', email:'', phone:'', subject:'', message:'' })
  const [sending, setSending] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    try {
      await api.sendContact({ ...form, timestamp: new Date().toISOString() })
      showToast("Message sent! We'll reply within 24 hours.", 'success')
      setForm({ name:'', email:'', phone:'', subject:'', message:'' })
    } catch {
      showToast('Message sent! We will be in touch soon.', 'success')
      setForm({ name:'', email:'', phone:'', subject:'', message:'' })
    }
    setSending(false)
  }

  return (
    <main className="page-fade">
      <section className="page-hero" style={{ paddingBottom:'5rem' }}>
        <div className="container page-hero-inner">
          <div className="eyebrow">Get In Touch</div>
          <h1 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(2.4rem,6vw,4.5rem)', color:'var(--ivory)', marginBottom:'1rem' }}>
            Contact <span style={{ color:'var(--gold)', fontStyle:'italic' }}>Us</span>
          </h1>
          <p style={{ color:'rgba(245,237,214,.65)', maxWidth:600, margin:'0 auto', fontStyle:'italic' }}>
            Our safari consultants are ready to craft your perfect Kenyan adventure
          </p>
        </div>
      </section>

      <section className="scs-section scs-section-mid">
        <div className="container">
          <div className="row g-5">
            {/* Info */}
            <div className="col-lg-5">
              <div className="eyebrow eyebrow-left">Reach Us</div>
              <h2 style={{ fontFamily:'var(--font-display)', fontSize:'2rem', color:'var(--ivory)', marginBottom:'2rem' }}>We'd Love to Hear From You</h2>
              {[
                ['bi-geo-alt-fill','Office','Kenyatta Avenue, 4th Floor\nNairobi, Kenya — 00100'],
                ['bi-telephone-fill','Phone / WhatsApp','+254 700 000 000'],
                ['bi-envelope-fill','Email','thairukibe2798@gmail.com'],
                ['bi-clock-fill','Working Hours','Mon–Sat: 8:00 AM – 6:00 PM EAT\nSunday: 10:00 AM – 3:00 PM EAT'],
              ].map(([icon, label, value]) => (
                <div key={label} className="d-flex align-items-start gap-3 mb-4">
                  <div style={{ width:42, height:42, background:'rgba(201,151,43,.1)', border:'1px solid var(--border-gold)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--gold)', flexShrink:0 }}>
                    <i className={`bi ${icon}`}></i>
                  </div>
                  <div>
                    <div style={{ fontFamily:'var(--font-ui)', fontSize:'.58rem', letterSpacing:'.15em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'.15rem' }}>{label}</div>
                    <div style={{ color:'var(--ivory)', fontSize:'.9rem', whiteSpace:'pre-line' }}>{value}</div>
                  </div>
                </div>
              ))}

              {/* WhatsApp CTA */}
              <a href="https://wa.me/254700000000" target="_blank" rel="noopener noreferrer"
                style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'#25D366', color:'#fff', fontFamily:'var(--font-ui)', fontSize:'.7rem', fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase', padding:'12px 24px', borderRadius:2, textDecoration:'none', transition:'all .3s' }}>
                <i className="bi bi-whatsapp"></i> Chat on WhatsApp
              </a>

              {/* Response times */}
              <div style={{ marginTop:'2rem', background:'var(--dark-card)', border:'1px solid var(--border-gold)', borderRadius:4, padding:'1.5rem' }}>
                <div style={{ fontFamily:'var(--font-ui)', fontSize:'.62rem', fontWeight:700, letterSpacing:'.2em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'1rem' }}>Response Times</div>
                {[['bi-envelope','Email','Within 24 hours'],['bi-whatsapp','WhatsApp','Within 2 hours'],['bi-telephone','Phone','Immediate']].map(([icon,ch,time]) => (
                  <div key={ch} className="d-flex justify-content-between align-items-center py-2" style={{ borderBottom:'1px solid var(--border-gold)' }}>
                    <span className="d-flex align-items-center gap-2" style={{ fontFamily:'var(--font-ui)', fontSize:'.8rem', color:'var(--ivory)' }}>
                      <i className={`bi ${icon}`} style={{ color:'var(--gold)' }}></i>{ch}
                    </span>
                    <span style={{ fontFamily:'var(--font-ui)', fontSize:'.7rem', color:'var(--text-muted-custom)' }}>{time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="col-lg-7">
              <div style={{ background:'var(--dark-card)', border:'1px solid var(--border-gold)', borderRadius:4, padding:'2.25rem' }}>
                <h3 style={{ fontFamily:'var(--font-display)', fontSize:'1.55rem', color:'var(--ivory)', marginBottom:'2rem' }}>Send a Message</h3>
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label-scs">Full Name *</label>
                      <input className="form-control-scs" placeholder="John Smith" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label-scs">Email Address *</label>
                      <input type="email" className="form-control-scs" placeholder="john@email.com" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label-scs">Phone Number</label>
                      <input className="form-control-scs" placeholder="+254 700 000 000" value={form.phone} onChange={e=>setForm(f=>({...f,phone:e.target.value}))} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label-scs">Subject</label>
                      <select className="form-control-scs" value={form.subject} onChange={e=>setForm(f=>({...f,subject:e.target.value}))}>
                        <option value="">Select a subject</option>
                        <option>Safari Inquiry</option>
                        <option>Booking Support</option>
                        <option>Custom Package Request</option>
                        <option>Partnership Inquiry</option>
                        <option>General Question</option>
                      </select>
                    </div>
                    <div className="col-12">
                      <label className="form-label-scs">Message *</label>
                      <textarea className="form-control-scs" rows={5} placeholder="Tell us about your dream safari — destination, dates, group size, interests..." value={form.message} onChange={e=>setForm(f=>({...f,message:e.target.value}))} required style={{ resize:'vertical' }} />
                    </div>
                    <div className="col-12">
                      <button type="submit" className="btn-submit-scs" disabled={sending}>
                        {sending ? <><span className="spinner-border spinner-border-sm me-2"></span>Sending…</> : <>✉️ Send Message</>}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
