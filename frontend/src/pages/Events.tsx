import { useNavigate } from 'react-router-dom'

const EVENTS = [
  { id:'migration', title:'Great Wildebeest Migration', img:'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800&q=80', date:'July – October 2025', loc:'Maasai Mara, Narok', badge:'Peak Season', price:'From KES 35,000', pkg:'mara__enkorok-mara', desc:'Over 1.5 million wildebeest and 500,000 zebras thunder across the crocodile-infested Mara River in one of nature\'s most dramatic spectacles. River crossings peak August–September.' },
  { id:'flamingo',  title:'Flamingo Breeding Season',   img:'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80', date:'November – January', loc:'Lake Nakuru & Bogoria', badge:'Spectacular', price:'From KES 14,000', pkg:'nakuru__nakuru-sopa', desc:'Millions of Lesser and Greater Flamingos paint Kenya\'s soda lakes vivid pink. The view from Baboon Cliff — flamingos stretching to the horizon — is utterly surreal.' },
  { id:'calving',   title:'Elephant Calving Season',    img:'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800&q=80', date:'November – December 2025', loc:'Amboseli NP', badge:'Family Friendly', price:'From KES 18,000', pkg:'amboseli__kibo-safari', desc:'Rain brings lush grass which triggers elephant birthing. Newborn calves wobble on unsteady legs while protective mothers form tight circles beneath Kilimanjaro\'s peak.' },
  { id:'cheetah',   title:'Cheetah Mating Season',      img:'https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=800&q=80', date:'January – March 2026', loc:'Maasai Mara & Amboseli', badge:'Rare Sighting', price:'From KES 35,000', pkg:'mara__mara-chui', desc:'Cheetah coalitions patrol vast territories and become highly active. Witness dramatic chases at full throttle across open savanna — the fastest animal on Earth unleashed.' },
  { id:'whaleshark',title:'Whale Shark Season',          img:'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80', date:'October – March', loc:'Watamu & Kilifi Coast', badge:'Ocean Safari', price:'From KES 12,000', pkg:'diani__diani-reef', desc:'The warm waters off Kenya\'s coast attract whale sharks — the world\'s largest fish. Snorkel alongside these gentle giants in crystal-clear Indian Ocean waters.' },
  { id:'wildebeest-calving', title:'Wildebeest Calving Season', img:'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80', date:'January – March 2026', loc:'Maasai Mara', badge:'Drama', price:'From KES 32,000', pkg:'mara__simba-oryx', desc:'Half a million wildebeest calves born in just 3 weeks. Lions, cheetahs, and hyenas converge for the feast. Raw, primal, and extraordinarily dramatic.' },
  { id:'birding',   title:'Long Rains Bird Migration',   img:'https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=800&q=80', date:'April – June 2026', loc:'Rift Valley Lakes', badge:'Birding', price:'From KES 15,000', pkg:'nakuru__nakuru-sopa', desc:'Over 1,000 bird species inhabit Kenya. European migrants join resident African species on the Rift Valley lakes — paradise for birders and wildlife photographers.' },
  { id:'maasai-festival', title:'Maasai Cultural Festival', img:'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80', date:'August 2025', loc:'Maasai Mara Conservancies', badge:'Cultural', price:'From KES 4,500', pkg:'mara__enkorok-mara', desc:'Immerse in ancient Maasai traditions — warrior jumping competitions, ceremonial dances, beadwork markets, and storytelling around the fire.' },
]

const MONTHS = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']
const MONTH_EVENTS: Record<string, string[]> = {
  JAN:['cheetah','whaleshark','wildebeest-calving'], FEB:['cheetah','whaleshark','wildebeest-calving'],
  MAR:['cheetah','whaleshark','wildebeest-calving'], APR:['birding'], MAY:['birding'], JUN:['birding'],
  JUL:['migration'], AUG:['migration','maasai-festival'], SEP:['migration'],
  OCT:['migration','whaleshark'], NOV:['flamingo','calving','whaleshark'],
  DEC:['flamingo','calving','whaleshark'],
}

export default function Events() {
  const navigate = useNavigate()

  return (
    <main className="page-fade">
      {/* Hero */}
      <section className="page-hero">
        <div className="container page-hero-inner">
          <div className="eyebrow">Wildlife Calendar 2025/26</div>
          <h1 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(2.4rem,6vw,4.5rem)', color:'var(--ivory)', marginBottom:'1rem' }}>
            Kenya's <span style={{ color:'var(--gold)', fontStyle:'italic' }}>Wild</span> Seasons
          </h1>
          <p style={{ color:'rgba(245,237,214,.65)', maxWidth:600, margin:'0 auto', fontSize:'1.05rem', fontStyle:'italic' }}>
            Every month brings a new spectacle. Plan your safari around nature's most extraordinary events.
          </p>
        </div>
      </section>

      {/* Calendar strip */}
      <section style={{ background:'var(--dark-card)', borderBottom:'1px solid var(--border-gold)', padding:'1.5rem 0' }}>
        <div className="container">
          <div className="d-flex justify-content-between flex-wrap gap-2">
            {MONTHS.map(m => {
              const hasEvent = MONTH_EVENTS[m]?.length > 0
              return (
                <div key={m} style={{ textAlign:'center', flex:'1', minWidth:52 }}>
                  <div style={{ fontFamily:'var(--font-ui)', fontSize:'.58rem', fontWeight:700, letterSpacing:'.1em', color: hasEvent ? 'var(--gold)' : 'var(--text-muted-custom)', marginBottom:4 }}>{m}</div>
                  <div style={{ height:4, background: hasEvent ? 'var(--gold)' : 'var(--border-gold)', borderRadius:2 }}></div>
                </div>
              )
            })}
          </div>
          <p style={{ fontFamily:'var(--font-ui)', fontSize:'.58rem', color:'var(--text-muted-custom)', textAlign:'center', marginTop:'.75rem', letterSpacing:'.1em' }}>
            GOLD = ACTIVE WILDLIFE EVENT SEASON
          </p>
        </div>
      </section>

      {/* Events grid */}
      <section className="scs-section scs-section-mid">
        <div className="container">
          <div className="row g-4">
            {EVENTS.map(ev => (
              <div key={ev.id} className="col-lg-6">
                <div className="scs-card d-flex flex-column flex-md-row">
                  <div style={{ width:200, flexShrink:0, overflow:'hidden' }}>
                    <img src={ev.img} alt={ev.title} style={{ width:'100%', height:'100%', objectFit:'cover', minHeight:200 }} loading="lazy" />
                  </div>
                  <div className="p-3 d-flex flex-column flex-grow-1">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <span className="scs-badge" style={{ position:'static', display:'inline-block' }}>{ev.badge}</span>
                    </div>
                    <div style={{ fontFamily:'var(--font-ui)', fontSize:'.6rem', color:'var(--gold)', letterSpacing:'.12em', textTransform:'uppercase', marginBottom:'.35rem' }}>📅 {ev.date}</div>
                    <h4 style={{ fontFamily:'var(--font-display)', fontSize:'1.05rem', color:'var(--ivory)', marginBottom:'.5rem' }}>{ev.title}</h4>
                    <p style={{ color:'var(--text-muted-custom)', fontSize:'.82rem', lineHeight:1.55, flex:1 }}>{ev.desc}</p>
                    <div className="d-flex justify-content-between align-items-center mt-2 pt-2" style={{ borderTop:'1px solid var(--border-gold)' }}>
                      <div>
                        <div style={{ fontFamily:'var(--font-ui)', fontSize:'.62rem', color:'var(--text-muted-custom)' }}>📍 {ev.loc}</div>
                        <div style={{ fontFamily:'var(--font-ui)', fontSize:'.85rem', fontWeight:700, color:'var(--gold)' }}>{ev.price}</div>
                      </div>
                      <button className="btn-gold-outline" style={{ padding:'7px 16px', fontSize:'.62rem' }} onClick={() => navigate(`/bookings?pkg=${ev.pkg}`)}>
                        Book →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
