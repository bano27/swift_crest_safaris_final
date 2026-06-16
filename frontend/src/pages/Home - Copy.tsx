import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { DESTINATIONS, FLAT_PACKAGES, detectSeason, SEASON_LABELS, KES_PER_USD } from '../data/destinations'
import CampCard from '../components/CampCard'
import { SeasonPill } from '../components/SeasonBadge'
import type { Season } from '../types'

/* ── Animal Facts ── */
const FACTS = [
  { e:'🐆', a:'Cheetah',           f:'Can accelerate 0–100 km/h in 3 seconds. The Maasai Mara has one of Africa\'s largest cheetah populations.' },
  { e:'🦁', a:'African Lion',       f:'A lion\'s roar carries up to 8 km. Mara prides are famous for dramatic hunts during the Migration.' },
  { e:'🐘', a:'African Elephant',   f:'Elephants grieve their dead and recognise themselves in mirrors. Amboseli hosts Kenya\'s largest herds.' },
  { e:'🦒', a:'Reticulated Giraffe',f:'Found only in Samburu. Endangered — fewer than 16,000 remain worldwide.' },
  { e:'🦏', a:'Black Rhinoceros',   f:'Can sprint at 55 km/h. Ol Pejeta houses the world\'s last two northern white rhinos.' },
  { e:'🦓', a:'Plains Zebra',       f:'No two zebras have identical stripes. Over 200,000 migrate through the Mara annually.' },
  { e:'🦅', a:'African Fish Eagle', f:'Kenya\'s national bird — "the voice of Africa." It spots fish from 25 metres in the air.' },
]

/* ── Wildlife Events ── */
const EVENTS = [
  { title:'Great Wildebeest Migration', img:'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800&q=80', date:'Jul–Oct', loc:'Maasai Mara', badge:'Peak Season', pkg:'mara__enkorok-mara' },
  { title:'Flamingo Breeding Season',   img:'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80', date:'Nov–Jan', loc:'Lake Nakuru',  badge:'Spectacular',  pkg:'nakuru__nakuru-sopa' },
  { title:'Elephant Calving Season',    img:'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800&q=80', date:'Nov–Dec', loc:'Amboseli',     badge:'Family Friendly',pkg:'amboseli__kibo-safari' },
  { title:'Whale Shark Season',         img:'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80', date:'Oct–Mar', loc:'Diani/Watamu',  badge:'Ocean Safari',  pkg:'diani__diani-reef' },
]

/* ── Testimonials ── */
const TESTIMONIALS = [
  { name:'Sarah Mitchell', country:'United Kingdom 🇬🇧', rating:5, text:'An absolutely magical experience from start to finish. Our guide James was extraordinary — he spotted a leopard kill we\'d have missed entirely. Swift Crest handled every detail flawlessly.', pkg:'10-Day Maasai Mara Safari' },
  { name:'Henrik Larsson', country:'Sweden 🇸🇪',         rating:5, text:'The Great Migration river crossing was beyond words. Watching 50,000 wildebeest plunge into the Mara River is something I\'ll carry forever. Worth every shilling.', pkg:'Maasai Mara Grand Safari' },
  { name:'Priya Sharma',   country:'India 🇮🇳',           rating:5, text:'Amboseli with Kilimanjaro at sunrise and a herd of 200 elephants — I still can\'t believe that was real. The Ol Tukai Lodge team were exceptional. Book through Swift Crest!', pkg:'Amboseli Kilimanjaro Explorer' },
]

export default function Home() {
  const [factIdx, setFactIdx]         = useState(0)
  const [factFading, setFactFading]   = useState(false)
  const [activeDestId, setActiveDestId] = useState('mara')
  const [previewDate, setPreviewDate] = useState('')
  const [catFilter, setCatFilter]     = useState<'all'|'budget'|'mid-range'|'luxury'>('all')
  const [searchQ, setSearchQ]         = useState('')
  const navigate = useNavigate()

  const season: Season = detectSeason(previewDate)
  const sl = SEASON_LABELS[season]
  const activeDest = DESTINATIONS.find(d => d.id === activeDestId) || DESTINATIONS[0]
  const filteredCamps = activeDest.camps.filter(c =>
    (catFilter === 'all' || c.category === catFilter) &&
    (!searchQ || c.name.toLowerCase().includes(searchQ.toLowerCase()))
  )

  const detailRows: [string, string][] = [
    ['Best Time', activeDest.bestTime],
    ['Duration', activeDest.duration],
    activeDest.parkFee.adultUSD > 0
      ? ['Park Fees/Day', `Adult $${activeDest.parkFee.adultUSD} · Child $${activeDest.parkFee.childUSD}`]
      : null,
  ].filter((item): item is [string, string] => item !== null)

  const nextFact = () => { setFactFading(true); setTimeout(() => { setFactIdx(i => (i+1)%FACTS.length); setFactFading(false); }, 280); }
  useEffect(() => { const t = setInterval(nextFact, 7000); return () => clearInterval(t); }, [])
  const fact = FACTS[factIdx]

  return (
    <main className="page-fade">
      {/* ── HERO ── */}
      <section className="hero-section">
        <div className="hero-bg"></div>
        <div className="container hero-content">
          <div className="row" style={{ minHeight: '100vh', alignItems: 'center' }}>
            <div className="col-lg-8 col-xl-7">
              <div className="hero-eyebrow">Kenya's Premier Luxury Safari Operator</div>
              <h1 className="hero-title mb-3">Wild <span className="accent">Kenya</span><br />Awaits You</h1>
              <p className="hero-subtitle mb-4">"Where comfort meets unforgettable experience."</p>
              <div className="d-flex flex-wrap gap-3 mb-4">
                <Link to="/bookings" className="btn-primary-scs">🗓 Book Your Safari</Link>
                <Link to="/events"   className="btn-secondary-scs">🔭 Explore Events</Link>
              </div>
              <div className="hero-stats d-flex gap-4 flex-wrap">
                {[['500+','Safaris Done'],['12+','Years'],['98%','Satisfaction'],['6','Destinations']].map(([n,l]) => (
                  <div key={l} className="hero-stat"><div className="num">{n}</div><div className="lbl">{l}</div></div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="hero-scroll"><span>Scroll</span><i className="bi bi-chevron-down"></i></div>
      </section>

      {/* ── WILDLIFE SEASONS ── */}
      <section className="scs-section scs-section-dark">
        <div className="container">
          <div className="text-center mb-5">
            <div className="eyebrow">Wildlife Calendar</div>
            <h2 className="section-title">Upcoming Wildlife Seasons</h2>
            <p className="section-sub">Plan around Kenya's most spectacular natural events</p>
            <div className="gold-divider"></div>
          </div>
          <div className="row g-4">
            {EVENTS.map((ev, i) => (
              <div key={i} className="col-lg-3 col-md-6">
                <div className="scs-card">
                  <div className="scs-card-img-wrap">
                    <img src={ev.img} className="scs-card-img" style={{ height: 200 }} alt={ev.title} loading="lazy" />
                    <span className="scs-badge" style={{ position:'absolute', top:10, right:10 }}>{ev.badge}</span>
                    <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(10,10,10,.85) 0%, transparent 60%)' }} />
                    <div style={{ position:'absolute', bottom:10, left:12 }}>
                      <div style={{ fontFamily:'var(--font-ui)', fontSize:'.6rem', color:'var(--gold)', letterSpacing:'.12em', textTransform:'uppercase' }}>📅 {ev.date}</div>
                      <div style={{ fontFamily:'var(--font-ui)', fontSize:'.7rem', fontWeight:600, color:'var(--ivory)' }}>📍 {ev.loc}</div>
                    </div>
                  </div>
                  <div className="p-3">
                    <h5 style={{ fontFamily:'var(--font-display)', fontSize:'1rem', color:'var(--ivory)', marginBottom:'.5rem' }}>{ev.title}</h5>
                    <button className="btn-gold-outline w-100 mt-2" onClick={() => navigate(`/bookings?pkg=${ev.pkg}`)}>
                      Book Now →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── POPULAR PACKAGES (Top 6) ── */}
      <section className="scs-section scs-section-mid">
        <div className="container">
          <div className="text-center mb-5">
            <div className="eyebrow">Safari Packages</div>
            <h2 className="section-title">Popular Packages</h2>
            <p className="section-sub">From KES {Math.min(...FLAT_PACKAGES.map(p=>p.priceFromKES)).toLocaleString()}/night — handcrafted journeys for the discerning traveller</p>
            <div className="gold-divider"></div>
          </div>
          <div className="row g-4">
            {FLAT_PACKAGES.slice(0, 6).map(pkg => (
              <div key={pkg.id} className="col-lg-4 col-md-6">
                <div className="scs-card">
                  <div className="scs-card-img-wrap">
                    {(() => { const camp = DESTINATIONS.find(d=>d.id===pkg.destinationId)?.camps.find(c=>c.id===pkg.campId); return (
                      <>
                        <img src={camp?.imageUrl} className="scs-card-img" style={{ height:210 }} alt={pkg.campName} loading="lazy" />
                        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(10,10,10,.85) 0%, transparent 55%)' }} />
                        <div style={{ position:'absolute', bottom:10, left:12 }}>
                          <div style={{ fontFamily:'var(--font-ui)', fontSize:'.58rem', color:'var(--gold)', letterSpacing:'.1em', textTransform:'uppercase' }}>{pkg.destinationName}</div>
                          <div style={{ fontFamily:'var(--font-ui)', fontSize:'.6rem', color:'rgba(245,237,214,.7)' }}>{pkg.duration}</div>
                        </div>
                        <span className="scs-badge scs-badge-luxury" style={{ position:'absolute', top:10, left:10 }}>{pkg.category}</span>
                      </>
                    )})()}
                  </div>
                  <div className="p-3">
                    <h5 style={{ fontFamily:'var(--font-display)', fontSize:'.95rem', color:'var(--ivory)', marginBottom:'.25rem' }}>{pkg.campName}</h5>
                    <div style={{ fontFamily:'var(--font-ui)', fontSize:'1rem', fontWeight:700, color:'var(--gold)', marginBottom:'.75rem' }}>
                      KES {pkg.priceFromKES.toLocaleString()} <small style={{ fontSize:'.6rem', color:'var(--text-muted-custom)', fontWeight:400 }}>/adult/night (low season)</small>
                    </div>
                    <button className="btn-gold-outline w-100" onClick={() => navigate(`/bookings?pkg=${pkg.id}`)}>
                      Book This Package →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DESTINATIONS & CAMPS ── */}
      <section className="scs-section scs-section-dark" id="camps">
        <div className="container">
          <div className="text-center mb-4">
            <div className="eyebrow">Hotels & Camps</div>
            <h2 className="section-title">Popular Camps & Lodges</h2>
            <p className="section-sub">Browse by destination · Adult (13+) & Child (under 12) rates</p>
            <div className="gold-divider"></div>
          </div>

          {/* Date picker */}
          <div className="d-flex align-items-center gap-3 flex-wrap p-3 mb-4" style={{ background:'var(--dark-card)', border:'1px solid var(--border-gold)', borderRadius:4 }}>
            <i className="bi bi-calendar-event" style={{ color:'var(--gold)', fontSize:'1.1rem' }}></i>
            <div>
              <div style={{ fontFamily:'var(--font-ui)', fontSize:'.6rem', fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:'var(--gold)' }}>Preview prices for your travel date</div>
              <div style={{ fontFamily:'var(--font-ui)', fontSize:'.62rem', color:'var(--text-muted-custom)' }}>Low=Apr–Jun · Shoulder=Jan–Mar,Nov · Peak=Jul–Oct,Dec</div>
            </div>
            <input type="date" className="form-control-scs" style={{ maxWidth:190, padding:'8px 12px' }} value={previewDate} onChange={e=>setPreviewDate(e.target.value)} min={new Date().toISOString().split('T')[0]} />
            {previewDate && <SeasonPill season={season} />}
            {!previewDate && <span style={{ fontFamily:'var(--font-ui)', fontSize:'.62rem', color:'var(--text-muted-custom)', fontStyle:'italic' }}>← Pick a date to see live seasonal pricing</span>}
          </div>

          {/* Destination tabs */}
          <div className="dest-tabs-scroll mb-4">
            {DESTINATIONS.map(d => (
              <button key={d.id} className={`dest-tab-btn ${activeDestId===d.id?'active':''}`} onClick={()=>{ setActiveDestId(d.id); setCatFilter('all'); }}>
                {d.name}
              </button>
            ))}
          </div>

          {/* Destination info */}
          <div className="row g-4 mb-4" style={{ alignItems:'flex-start' }}>
            <div className="col-lg-5">
              <div style={{ borderRadius:4, overflow:'hidden', border:'1px solid var(--border-gold)', position:'relative' }}>
                <img src={activeDest.heroImage} alt={activeDest.name} style={{ width:'100%', height:260, objectFit:'cover' }} />
                <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(10,10,10,.9) 0%, transparent 55%)' }} />
                <div style={{ position:'absolute', bottom:'1rem', left:'1rem' }}>
                  <div style={{ fontFamily:'var(--font-ui)', fontSize:'.58rem', color:'var(--gold)', letterSpacing:'.15em', textTransform:'uppercase' }}>{activeDest.region}</div>
                  <h3 style={{ fontFamily:'var(--font-display)', fontSize:'1.5rem', color:'var(--ivory)', margin:0 }}>{activeDest.name}</h3>
                </div>
              </div>
            </div>
            <div className="col-lg-7">
              {previewDate && <div className="mb-2"><SeasonPill season={season} /></div>}
              <p style={{ color:'var(--text-muted-custom)', fontSize:'.9rem', lineHeight:1.7 }}>{activeDest.description}</p>
              <div className="d-flex flex-wrap gap-2 mb-3">
                {activeDest.highlights.map(h => (
                  <span key={h} style={{ fontFamily:'var(--font-ui)', fontSize:'.58rem', color:'rgba(245,237,214,.6)', background:'rgba(201,151,43,.07)', border:'1px solid var(--border-gold)', borderRadius:'20px', padding:'3px 10px' }}>✦ {h}</span>
                ))}
              </div>
              <div className="d-flex gap-4 flex-wrap">
                {detailRows.map(([l,v]) => (
                  <div key={l}>
                    <div style={{ fontFamily:'var(--font-ui)', fontSize:'.56rem', color:'var(--gold)', letterSpacing:'.1em', textTransform:'uppercase' }}>{l}</div>
                    <div style={{ fontSize:'.82rem', color:'var(--ivory)' }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Camp filters & search */}
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3 pb-3" style={{ borderBottom:'1px solid var(--border-gold)' }}>
            <div style={{ fontFamily:'var(--font-display)', fontSize:'1.1rem', color:'var(--gold)' }}>🏕 Available Camps ({filteredCamps.length})</div>
            <div className="d-flex gap-2 flex-wrap align-items-center">
              <input placeholder="Search camps…" value={searchQ} onChange={e=>setSearchQ(e.target.value)}
                style={{ background:'var(--dark-mid)', border:'1px solid var(--border-gold)', color:'var(--ivory)', borderRadius:2, padding:'5px 10px', fontFamily:'var(--font-ui)', fontSize:'.68rem', width:160 }} />
              {(['all','budget','mid-range','luxury'] as const).map(f => (
                <button key={f} className={`dest-tab-btn ${catFilter===f?'active':''}`} style={{ padding:'5px 12px', fontSize:'.58rem' }} onClick={()=>setCatFilter(f)}>
                  {f==='all'?'All':f}
                </button>
              ))}
            </div>
          </div>

          <div className="row g-3">
            {filteredCamps.map(camp => (
              <div key={camp.id} className="col-xl-4 col-md-6">
                <CampCard camp={camp} season={previewDate ? season : 'shoulder'} parkFee={activeDest.parkFee} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRAVEL GUIDE / FACTS ── */}
      <section className="scs-section scs-section-mid">
        <div className="container">
          <div className="text-center mb-5">
            <div className="eyebrow">Travel Guide & Wildlife</div>
            <h2 className="section-title">Discover Kenya</h2>
            <div className="gold-divider"></div>
          </div>
          <div className="row g-4">
            {/* Tips */}
            <div className="col-lg-4">
              <div style={{ background:'var(--dark-card)', border:'1px solid var(--border-gold)', borderRadius:4, padding:'1.5rem' }}>
                <div className="eyebrow eyebrow-left" style={{ fontSize:'.6rem' }}>🧳 Travel Tips</div>
                {[
                  ['bi-thermometer-sun','Best weather: Jun–Oct & Jan–Feb'],
                  ['bi-shield-check','Yellow fever vaccination required'],
                  ['bi-currency-exchange','KES & USD widely accepted'],
                  ['bi-camera','Telephoto lens 400mm+ recommended'],
                  ['bi-airplane','Flights land at JKIA, Nairobi'],
                  ['bi-file-text','eTA required for most nationalities'],
                  ['bi-sun','UV protection essential on game drives'],
                ].map(([icon, tip]) => (
                  <div key={tip} className="d-flex align-items-center gap-2 py-2" style={{ borderBottom:'1px solid var(--border-gold)' }}>
                    <i className={`bi ${icon}`} style={{ color:'var(--gold)', width:16 }}></i>
                    <span style={{ fontFamily:'var(--font-ui)', fontSize:'.72rem', color:'rgba(245,237,214,.7)' }}>{tip}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Animal Facts Rotator */}
            <div className="col-lg-4">
              <div style={{ background:'linear-gradient(135deg, var(--dark-card), var(--dark-mid))', border:'1px solid var(--border-gold)', borderRadius:4, padding:'1.85rem', position:'relative', overflow:'hidden', opacity: factFading ? 0.3 : 1, transition:'opacity .28s' }}>
                <div style={{ position:'absolute', top:'-2rem', left:'.5rem', fontFamily:'var(--font-display)', fontSize:'9rem', color:'rgba(201,151,43,.05)', lineHeight:1, pointerEvents:'none' }}>"</div>
                <div className="eyebrow eyebrow-left" style={{ fontSize:'.6rem' }}>⚡ Did You Know?</div>
                <div style={{ fontSize:'2.8rem', margin:'.5rem 0' }}>{fact.e}</div>
                <p style={{ fontSize:'1rem', color:'var(--ivory)', fontStyle:'italic', lineHeight:1.6 }}>"{fact.f}"</p>
                <div style={{ fontFamily:'var(--font-ui)', fontSize:'.65rem', color:'var(--text-muted-custom)' }}>— {fact.a}</div>
                <div className="d-flex align-items-center gap-2 mt-3">
                  <button className="btn-gold-outline" style={{ padding:'5px 14px', fontSize:'.6rem' }} onClick={nextFact}>🔀 Next Fact</button>
                  <div className="d-flex gap-1">
                    {FACTS.map((_,i) => (
                      <div key={i} onClick={()=>setFactIdx(i)} style={{ width:6, height:6, borderRadius:'50%', background: i===factIdx?'var(--gold)':'var(--border-gold)', cursor:'pointer' }}></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Age & Season guide */}
            <div className="col-lg-4">
              <div style={{ background:'var(--dark-card)', border:'1px solid var(--border-gold)', borderRadius:4, padding:'1.5rem', marginBottom:'1rem' }}>
                <div className="eyebrow eyebrow-left" style={{ fontSize:'.6rem' }}>👥 Age & Pricing Guide</div>
                {[
                  ['👤','Adults (13+ years)','Full adult rate applies'],
                  ['🧒','Children (Under 12)','≈ 50% of adult rate'],
                  ['👶','Infants (Under 2)','Free of charge'],
                ].map(([e,l,n]) => (
                  <div key={l} className="d-flex gap-2 py-2" style={{ borderBottom:'1px solid var(--border-gold)' }}>
                    <span style={{ fontSize:'1.1rem' }}>{e}</span>
                    <div>
                      <div style={{ fontFamily:'var(--font-ui)', fontSize:'.7rem', fontWeight:600, color:'var(--ivory)' }}>{l}</div>
                      <div style={{ fontFamily:'var(--font-ui)', fontSize:'.6rem', color:'var(--text-muted-custom)' }}>{n}</div>
                    </div>
                  </div>
                ))}
                <div className="mt-3 p-2" style={{ background:'rgba(201,151,43,.06)', borderRadius:3, border:'1px solid var(--border-gold)' }}>
                  <div style={{ fontFamily:'var(--font-ui)', fontSize:'.6rem', color:'var(--text-muted-custom)', lineHeight:1.65 }}>
                    <strong style={{ color:'var(--gold)' }}>🗓 Season Guide:</strong><br/>
                    🟢 Low = Apr–Jun &nbsp;·&nbsp; 🟡 Shoulder = Jan–Mar, Nov &nbsp;·&nbsp; 🔴 Peak = Jul–Oct, Dec
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="scs-section scs-section-dark">
        <div className="container">
          <div className="text-center mb-5">
            <div className="eyebrow">Guest Reviews</div>
            <h2 className="section-title">What Our Guests Say</h2>
            <div className="gold-divider"></div>
          </div>
          <div className="row g-4">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="col-lg-4">
                <div style={{ background:'var(--dark-card)', border:'1px solid var(--border-gold)', borderRadius:4, padding:'1.75rem', height:'100%' }}>
                  <div style={{ color:'#f39c12', fontSize:'1.1rem', marginBottom:'.75rem' }}>{'★'.repeat(t.rating)}</div>
                  <p style={{ fontSize:'.92rem', color:'var(--ivory)', fontStyle:'italic', lineHeight:1.7, marginBottom:'1.25rem' }}>"{t.text}"</p>
                  <div style={{ borderTop:'1px solid var(--border-gold)', paddingTop:'1rem' }}>
                    <div style={{ fontFamily:'var(--font-ui)', fontWeight:700, color:'var(--ivory)', fontSize:'.82rem' }}>{t.name}</div>
                    <div style={{ fontFamily:'var(--font-ui)', fontSize:'.62rem', color:'var(--text-muted-custom)' }}>{t.country}</div>
                    <div style={{ fontFamily:'var(--font-ui)', fontSize:'.6rem', color:'var(--gold)', marginTop:'3px' }}>{t.pkg}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="scs-section scs-section-mid">
        <div className="container">
          <div className="text-center mb-5">
            <div className="eyebrow">Frequently Asked Questions</div>
            <h2 className="section-title">Got Questions?</h2>
            <div className="gold-divider"></div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="accordion" id="faqAccordion">
                {[
                  ['What is included in the safari package?', 'All packages include accommodation, full board meals (unless otherwise stated), game drives in a 4x4 vehicle with pop-up roof, a professional driver-guide, and return airport transfers. Park fees are charged separately.'],
                  ['What is the difference between high and low season?', 'High season (Jul–Oct, Dec) coincides with the Great Migration and school holidays — prices are highest and advance booking essential. Low season (Apr–Jun) offers up to 40% savings with lush, green parks and fewer visitors.'],
                  ['What are the child pricing rules?', 'Children under 12 years receive child rates (approximately 50% of adult). Children under 2 travel free. Ages 12 and above are charged full adult rates.'],
                  ['Can I pay with M-Pesa?', 'Yes! We accept M-Pesa (Lipa Na M-Pesa STK push), Visa, and Mastercard. All payments are processed securely with SSL encryption.'],
                  ['Do I need a visa to visit Kenya?', 'Most nationalities can apply for an eTA (Electronic Travel Authorisation) online at etakenya.go.ke. US, UK, EU, and most African citizens are eligible. Yellow fever vaccination is required.'],
                  ['What should I pack for a safari?', 'Light neutral-coloured clothing (khaki, olive), sun protection, a quality camera with telephoto lens (400mm+), binoculars, insect repellent, and a light fleece for cool mornings.'],
                ].map(([q, a], i) => (
                  <div key={i} className="accordion-item" style={{ background:'var(--dark-card)', border:'1px solid var(--border-gold)', borderRadius:'4px !important', marginBottom:'8px' }}>
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#faq${i}`}
                        style={{ background:'var(--dark-card)', color:'var(--ivory)', fontFamily:'var(--font-display)', fontSize:'.95rem', boxShadow:'none' }}>
                        {q}
                      </button>
                    </h2>
                    <div id={`faq${i}`} className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                      <div className="accordion-body" style={{ color:'var(--text-muted-custom)', fontSize:'.9rem', lineHeight:1.7 }}>{a}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding:'5rem 0', background:'linear-gradient(135deg, #1A0F00, #0A0A0A)', borderTop:'1px solid var(--border-gold)', borderBottom:'1px solid var(--border-gold)' }}>
        <div className="container text-center">
          <div className="eyebrow">Start Your Journey</div>
          <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(2rem,5vw,3.5rem)', color:'var(--ivory)', margin:'0 0 1rem' }}>Ready for the Adventure of a Lifetime?</h2>
          <p style={{ color:'var(--text-muted-custom)', maxWidth:600, margin:'0 auto 2rem', fontStyle:'italic' }}>
            Our expert safari consultants craft your perfect Kenyan journey. Every detail handled. Every moment unforgettable.
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Link to="/bookings" className="btn-primary-scs">🗓 Book Now</Link>
            <Link to="/contact"  className="btn-secondary-scs">💬 Talk to an Expert</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
