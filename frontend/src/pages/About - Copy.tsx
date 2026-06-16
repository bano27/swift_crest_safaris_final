import { Link } from 'react-router-dom'

const TEAM = [
  { name:'James Kipchoge',  role:'Founder & Head Guide',  emoji:'🦁', bio:'18 years guiding in the Maasai Mara. KWS certified, wildlife photographer, and passionate conservationist.' },
  { name:'Amina Hassan',    role:'Operations Director',   emoji:'🌍', bio:'Logistics expert ensuring every transfer, lodge, and experience runs seamlessly for our guests.' },
  { name:'David Mutai',     role:'Senior Safari Guide',   emoji:'🐘', bio:'Specialist in elephant behaviour. Amboseli expert. Trained at Wildlife Direct Kenya.' },
  { name:'Grace Wanjiku',   role:'Guest Relations',       emoji:'⭐', bio:'Ensures every guest feels valued from first inquiry to farewell — the heart of Swift Crest.' },
]

const VALUES = [
  { icon:'🌿', title:'Conservation First',       desc:'We partner with local conservancies and contribute 5% of every booking to wildlife conservation and community uplift programs across Kenya.' },
  { icon:'👑', title:'Luxury Without Compromise',desc:'Premium camps, gourmet bush dining, expert naturalist guides, and private vehicles — every detail curated for the discerning traveller.' },
  { icon:'🤝', title:'Authentic Community Ties', desc:'Our guides are from the communities we visit. Your journey directly supports Maasai families, local artisans, and indigenous land stewards.' },
  { icon:'🛡️', title:'Safety & Reliability',    desc:'Fully licensed and insured, with 24/7 operations support, medical evacuation cover, and partnerships with Kenya\'s top emergency services.' },
]

export default function About() {
  return (
    <main className="page-fade">
      {/* Hero */}
      <section className="page-hero" style={{ paddingBottom:'5rem' }}>
        <div className="container page-hero-inner">
          <div className="eyebrow">Our Story</div>
          <h1 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(2.4rem,6vw,4.5rem)', color:'var(--ivory)', marginBottom:'1rem' }}>
            About <span style={{ color:'var(--gold)', fontStyle:'italic' }}>Swift Crest</span>
          </h1>
          <p style={{ color:'rgba(245,237,214,.65)', maxWidth:650, margin:'0 auto', fontStyle:'italic' }}>
            Born from a deep love of Kenya's wilderness and a commitment to world-class hospitality
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="scs-section scs-section-mid">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <div className="eyebrow eyebrow-left">Est. 2012, Nairobi Kenya</div>
              <h2 style={{ fontFamily:'var(--font-display)', fontSize:'2.4rem', color:'var(--ivory)', marginBottom:'1.5rem' }}>
                A Decade of Crafting<br /><span style={{ color:'var(--gold)' }}>Extraordinary Safaris</span>
              </h2>
              <p style={{ color:'var(--text-muted-custom)', lineHeight:1.85, marginBottom:'1rem' }}>
                Swift Crest Safaris was founded in 2012 by a team of passionate Kenyan wildlife guides and hospitality professionals who believed that luxury and authenticity were not mutually exclusive — that you could sleep in supreme comfort, yet wake to the raw, untamed beauty of the African bush.
              </p>
              <p style={{ color:'var(--text-muted-custom)', lineHeight:1.85, marginBottom:'2rem' }}>
                Over twelve years, we have escorted more than 500 groups — families, honeymooners, photographers, conservation enthusiasts — across Kenya's most iconic landscapes. Each journey is meticulously crafted, never rushed, and always unforgettable.
              </p>
              <div className="row g-3">
                {[['500+','Safaris Completed'],['98%','Guest Satisfaction'],['12+','Years Experience'],['30+','Expert Guides']].map(([n,l]) => (
                  <div key={l} className="col-6">
                    <div style={{ background:'var(--dark-card)', border:'1px solid var(--border-gold)', borderRadius:4, padding:'1.25rem', textAlign:'center' }}>
                      <div style={{ fontFamily:'var(--font-display)', fontSize:'2rem', fontWeight:700, color:'var(--gold)' }}>{n}</div>
                      <div style={{ fontFamily:'var(--font-ui)', fontSize:'.62rem', letterSpacing:'.1em', textTransform:'uppercase', color:'var(--text-muted-custom)' }}>{l}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-6">
              <div style={{ position:'relative' }}>
                <img src="https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80" alt="Safari" style={{ width:'100%', borderRadius:4, border:'1px solid var(--border-gold)' }} />
                <div style={{ position:'absolute', bottom:-20, left:-20, background:'var(--dark-card)', border:'1px solid var(--gold)', borderRadius:4, padding:'1rem 1.5rem' }}>
                  <div style={{ fontFamily:'var(--font-ui)', fontSize:'.6rem', color:'var(--gold)', letterSpacing:'.1em', textTransform:'uppercase' }}>TripAdvisor</div>
                  <div style={{ color:'#f1c40f', fontSize:'1rem' }}>★★★★★</div>
                  <div style={{ fontFamily:'var(--font-ui)', fontSize:'.68rem', color:'var(--text-muted-custom)' }}>Certificate of Excellence</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="scs-section scs-section-dark">
        <div className="container">
          <div className="text-center mb-5">
            <div className="eyebrow">Our Promise</div>
            <h2 className="section-title">The Swift Crest Way</h2>
            <div className="gold-divider"></div>
          </div>
          <div className="row g-4">
            {VALUES.map(v => (
              <div key={v.title} className="col-md-6 col-lg-3">
                <div style={{ background:'var(--dark-card)', border:'1px solid var(--border-gold)', borderRadius:4, padding:'2rem', textAlign:'center', height:'100%', transition:'all .3s' }} className="scs-card">
                  <div style={{ fontSize:'2.5rem', marginBottom:'1rem' }}>{v.icon}</div>
                  <h4 style={{ fontFamily:'var(--font-display)', fontSize:'1.15rem', color:'var(--ivory)', marginBottom:'.75rem' }}>{v.title}</h4>
                  <p style={{ color:'var(--text-muted-custom)', fontSize:'.88rem', lineHeight:1.65 }}>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="scs-section scs-section-mid">
        <div className="container">
          <div className="text-center mb-5">
            <div className="eyebrow">The People</div>
            <h2 className="section-title">Meet Our Expert Team</h2>
            <div className="gold-divider"></div>
          </div>
          <div className="row g-4 justify-content-center">
            {TEAM.map(t => (
              <div key={t.name} className="col-md-6 col-lg-3">
                <div style={{ background:'var(--dark-card)', border:'1px solid var(--border-gold)', borderRadius:4, padding:'1.75rem', textAlign:'center', transition:'all .4s' }} className="scs-card">
                  <div style={{ width:76, height:76, borderRadius:'50%', background:'linear-gradient(135deg, var(--gold-dark), var(--gold))', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'2rem', margin:'0 auto 1rem' }}>{t.emoji}</div>
                  <div style={{ fontFamily:'var(--font-display)', fontSize:'1.05rem', fontWeight:700, color:'var(--ivory)', marginBottom:'.2rem' }}>{t.name}</div>
                  <div style={{ fontFamily:'var(--font-ui)', fontSize:'.6rem', letterSpacing:'.15em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'.75rem' }}>{t.role}</div>
                  <p style={{ color:'var(--text-muted-custom)', fontSize:'.82rem', lineHeight:1.55 }}>{t.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding:'5rem 0', background:'linear-gradient(135deg, #1A0F00, #0A0A0A)', borderTop:'1px solid var(--border-gold)' }}>
        <div className="container text-center">
          <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(1.8rem,4vw,3rem)', color:'var(--ivory)', marginBottom:'1rem' }}>Ready to Experience Wild Kenya?</h2>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Link to="/bookings" className="btn-primary-scs">🗓 Book Your Safari</Link>
            <Link to="/contact"  className="btn-secondary-scs">💬 Get in Touch</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
