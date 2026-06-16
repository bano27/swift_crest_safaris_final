import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { DESTINATIONS, FLAT_PACKAGES, detectSeason, SEASON_LABELS, KES_PER_USD } from '../data/destinations'
import { SeasonPill, SeasonAlert } from '../components/SeasonBadge'
import { useToast } from '../context/ToastContext'
import { api, generateRef } from '../utils/api'
import type { Season, BookingForm, CardDetails } from '../types'

const KEYWORDS = [
  'Maasai Mara Tours','Great Migration','Big Five Safari','Amboseli Elephants',
  'Samburu Reserve','Lake Nakuru Flamingos','Tsavo Red Elephants','Diani Beach',
  'Hot Air Balloon Safari','Bush & Beach Combo','Honeymoon Safari','Family Safari',
  'Photography Safari','Birdwatching Tour','Cultural Maasai Experience','Night Game Drives',
]

type Step = 'details' | 'payment' | 'confirm'
type PayMethod = 'mpesa' | 'card' | ''

const defaultForm: BookingForm = {
  firstName:'', lastName:'', email:'', phone:'', nationality:'',
  adults:2, children:0, packageKey:'mara__mara-budget',
  arrival:'', departure:'', keywords:[], notes:'', paymentMethod:''
}

export default function Bookings() {
  const { showToast } = useToast()
  const [searchParams] = useSearchParams()
  const [step, setStep] = useState<Step>('details')
  const [payMethod, setPayMethod] = useState<PayMethod>('')
  const [submitting, setSubmitting] = useState(false)
  const [mpesaPhase, setMpesaPhase] = useState<'input'|'pending'|'done'>('input')
  const [bookingRef, setBookingRef] = useState('')
  const [form, setForm] = useState<BookingForm>(() => {
    const campParam = searchParams.get('camp')
    const pkgParam  = searchParams.get('pkg')
    let pkgKey = defaultForm.packageKey
    if (pkgParam  && FLAT_PACKAGES.find(p=>p.id===pkgParam))  pkgKey = pkgParam
    if (campParam && FLAT_PACKAGES.find(p=>p.campId===campParam)) pkgKey = FLAT_PACKAGES.find(p=>p.campId===campParam)!.id
    return { ...defaultForm, packageKey: pkgKey }
  })
  const [card, setCard] = useState<CardDetails>({ name:'', number:'', expiry:'', cvv:'' })
  const [mpesaPhone, setMpesaPhone] = useState('')

  const selFlat     = FLAT_PACKAGES.find(p=>p.id===form.packageKey) || FLAT_PACKAGES[0]
  const selDest     = DESTINATIONS.find(d=>d.id===selFlat.destinationId)!
  const selCamp     = selDest.camps.find(c=>c.id===selFlat.campId)!
  const season: Season = detectSeason(form.arrival)
  const prices      = selCamp[season]
  const adults      = Math.max(0, Number(form.adults)||0)
  const children    = Math.max(0, Number(form.children)||0)
  const nights      = (form.arrival && form.departure)
    ? Math.max(1, Math.round((new Date(form.departure).getTime()-new Date(form.arrival).getTime())/86400000)) : 1
  const totalKES    = ((adults * prices.adultSharing)+(children * prices.childSharing)) * nights
  const totalUSD    = Math.round(totalKES / KES_PER_USD)

  const setF = (key: keyof BookingForm, val: unknown) => setForm(f=>({...f,[key]:val}))
  const toggleKw = (kw: string) => setF('keywords', form.keywords.includes(kw) ? form.keywords.filter(k=>k!==kw) : [...form.keywords, kw])

  const fmtCard = (v: string) => v.replace(/\D/g,'').replace(/(\d{4})/g,'$1 ').trim().slice(0,19)
  const fmtExp  = (v: string) => { const d=v.replace(/\D/g,''); return d.length>=2?d.slice(0,2)+'/'+d.slice(2,4):d }

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.firstName||!form.lastName||!form.email||!form.arrival||!form.departure) { showToast('Please fill all required fields.','error'); return }
    if (adults+children<1) { showToast('Please add at least one guest.','error'); return }
    setStep('payment')
    window.scrollTo({top:0,behavior:'smooth'})
  }

  const sendEmail = async (ref: string) => {
    try { await api.createBooking({ ref, ...form, destination:selDest.name, camp:selCamp.name, adults, children, nights, season:SEASON_LABELS[season].label, adultRateKES:prices.adultSharing, childRateKES:prices.childSharing, totalKES, totalUSD, paymentMethod:payMethod, timestamp:new Date().toISOString() }) }
    catch { /* server offline — continue */ }
  }

  const handleMpesa = async () => {
    if (!/^(\+?254|0)\d{9}$/.test(mpesaPhone.replace(/\s/g,''))) { showToast('Enter a valid Safaricom number','error'); return }
    setMpesaPhase('pending')
    await new Promise(r=>setTimeout(r,3000))
    const ref = generateRef(); setBookingRef(ref)
    await sendEmail(ref)
    setMpesaPhase('done')
    setTimeout(()=>{ setStep('confirm'); window.scrollTo({top:0,behavior:'smooth'}) }, 1000)
  }

  const handleCard = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!card.name||card.number.replace(/\s/g,'').length<16||!card.expiry||card.cvv.length<3) { showToast('Please enter valid card details.','error'); return }
    setSubmitting(true)
    await new Promise(r=>setTimeout(r,2200))
    const ref = generateRef(); setBookingRef(ref)
    await sendEmail(ref)
    setSubmitting(false)
    setStep('confirm')
    window.scrollTo({top:0,behavior:'smooth'})
  }

  const brandColor = card.number.replace(/\s/g,'').startsWith('4') ? '#1a1f71' : /^5[1-5]/.test(card.number.replace(/\s/g,'')) ? '#eb001b' : 'var(--gold)'
  const brandName  = card.number.replace(/\s/g,'').startsWith('4') ? 'VISA' : /^5[1-5]/.test(card.number.replace(/\s/g,'')) ? 'Mastercard' : 'Card'

  return (
    <main className="page-fade">
      {/* Hero */}
      <section className="page-hero">
        <div className="container page-hero-inner">
          <div className="eyebrow">Secure Booking</div>
          <h1 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(2.2rem,5vw,3.8rem)', color:'var(--ivory)' }}>Book Your <span style={{ color:'var(--gold)', fontStyle:'italic' }}>Safari</span></h1>
          <p style={{ color:'rgba(245,237,214,.65)', maxWidth:580, margin:'0 auto 1.5rem', fontStyle:'italic' }}>Real-time seasonal pricing · Adult & Child rates · M-Pesa or Card</p>
          {/* Steps */}
          <div className="d-flex justify-content-center align-items-center gap-3 flex-wrap">
            {(['details','payment','confirm'] as Step[]).map((s,i)=>(
              <div key={s} className="d-flex align-items-center gap-2">
                <div style={{ width:32,height:32,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'var(--font-ui)',fontSize:'.68rem',fontWeight:700,border:'1px solid var(--gold)',background:step===s?'var(--gold)':'transparent',color:step===s?'var(--black)':'var(--gold)' }}>{i+1}</div>
                <span style={{ fontFamily:'var(--font-ui)',fontSize:'.6rem',letterSpacing:'.12em',textTransform:'uppercase',color:step===s?'var(--gold)':'var(--text-muted-custom)' }}>{s}</span>
                {i<2&&<div style={{ width:28,height:1,background:'var(--border-gold)' }}></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="scs-section scs-section-mid">
        <div className="container">
          <div className="row g-4">
            <div className={step==='confirm'?'col-12':'col-lg-8'}>

              {/* ── STEP 1 ── */}
              {step==='details'&&(
                <div style={{ background:'var(--dark-card)',border:'1px solid var(--border-gold)',borderRadius:4,padding:'2.25rem' }}>
                  <h3 style={{ fontFamily:'var(--font-display)',fontSize:'1.55rem',color:'var(--ivory)',marginBottom:'1.75rem' }}>Safari Details</h3>
                  <form onSubmit={handleNext}>
                    <div className="row g-3">
                      <div className="col-md-6"><label className="form-label-scs">First Name *</label><input className="form-control-scs" placeholder="John" value={form.firstName} onChange={e=>setF('firstName',e.target.value)} required /></div>
                      <div className="col-md-6"><label className="form-label-scs">Last Name *</label><input className="form-control-scs" placeholder="Smith" value={form.lastName} onChange={e=>setF('lastName',e.target.value)} required /></div>
                      <div className="col-md-6"><label className="form-label-scs">Email Address *</label><input type="email" className="form-control-scs" placeholder="john@email.com" value={form.email} onChange={e=>setF('email',e.target.value)} required /></div>
                      <div className="col-md-6"><label className="form-label-scs">Phone Number</label><input className="form-control-scs" placeholder="+254 700 000 000" value={form.phone} onChange={e=>setF('phone',e.target.value)} /></div>
                      <div className="col-md-6"><label className="form-label-scs">Nationality</label><input className="form-control-scs" placeholder="e.g. Kenyan, British" value={form.nationality} onChange={e=>setF('nationality',e.target.value)} /></div>
                      <div className="col-md-3">
                        <label className="form-label-scs">Adults (13+)</label>
                        <select className="form-control-scs" value={form.adults} onChange={e=>setF('adults',Number(e.target.value))}>
                          {[0,1,2,3,4,5,6,7,8,9,10].map(n=><option key={n} value={n}>{n}</option>)}
                        </select>
                      </div>
                      <div className="col-md-3">
                        <label className="form-label-scs">Children (&lt;12)</label>
                        <select className="form-control-scs" value={form.children} onChange={e=>setF('children',Number(e.target.value))}>
                          {[0,1,2,3,4,5,6].map(n=><option key={n} value={n}>{n}</option>)}
                        </select>
                      </div>
                      <div className="col-12">
                        <label className="form-label-scs">Select Destination & Camp *</label>
                        <select className="form-control-scs" value={form.packageKey} onChange={e=>setF('packageKey',e.target.value)}>
                          {DESTINATIONS.map(d=>(
                            <optgroup key={d.id} label={`━━ ${d.name} ━━`}>
                              {d.camps.map(c=>(
                                <option key={`${d.id}__${c.id}`} value={`${d.id}__${c.id}`}>
                                  [{c.category.charAt(0).toUpperCase()+c.category.slice(1)}] {c.name} — KES {c.low.adultSharing.toLocaleString()}+/adult/night
                                </option>
                              ))}
                            </optgroup>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-6"><label className="form-label-scs">Arrival Date *</label><input type="date" className="form-control-scs" value={form.arrival} min={new Date().toISOString().split('T')[0]} onChange={e=>setF('arrival',e.target.value)} required /></div>
                      <div className="col-md-6"><label className="form-label-scs">Departure Date *</label><input type="date" className="form-control-scs" value={form.departure} min={form.arrival||new Date().toISOString().split('T')[0]} onChange={e=>setF('departure',e.target.value)} required /></div>
                      {form.arrival&&<div className="col-12"><SeasonAlert season={season} arrival={form.arrival} /></div>}
                      <div className="col-12">
                        <label className="form-label-scs">I'm Interested In</label>
                        <div className="d-flex flex-wrap gap-2 mt-1">
                          {KEYWORDS.map(kw=><button key={kw} type="button" className={`keyword-chip ${form.keywords.includes(kw)?'active':''}`} onClick={()=>toggleKw(kw)}>{kw}</button>)}
                        </div>
                      </div>
                      <div className="col-12">
                        <label className="form-label-scs">Special Requests / Notes</label>
                        <textarea className="form-control-scs" rows={3} placeholder="Dietary requirements, accessibility, special occasions…" value={form.notes} onChange={e=>setF('notes',e.target.value)} style={{ resize:'vertical' }} />
                      </div>
                      <div className="col-12"><button type="submit" className="btn-submit-scs">Continue to Payment →</button></div>
                    </div>
                  </form>
                </div>
              )}

              {/* ── STEP 2 ── */}
              {step==='payment'&&(
                <div style={{ background:'var(--dark-card)',border:'1px solid var(--border-gold)',borderRadius:4,padding:'2.25rem' }}>
                  <button onClick={()=>setStep('details')} style={{ background:'none',border:'none',color:'var(--gold)',fontFamily:'var(--font-ui)',fontSize:'.68rem',letterSpacing:'.1em',cursor:'pointer',padding:0,marginBottom:'1.25rem' }}>← Back</button>
                  <h3 style={{ fontFamily:'var(--font-display)',fontSize:'1.55rem',color:'var(--ivory)',marginBottom:'.4rem' }}>Secure Payment</h3>
                  <p style={{ color:'var(--text-muted-custom)',fontSize:'.85rem',marginBottom:'1.75rem' }}>🔒 256-bit SSL encrypted</p>

                  {/* Method picker */}
                  <label className="form-label-scs mb-2">Choose Payment Method</label>
                  <div className="row g-3 mb-4">
                    {([['mpesa','📱','M-PESA','#00a650','Lipa Na M-Pesa STK Push'],['card','💳','VISA / MASTERCARD','var(--gold)','Debit & Credit Cards']] as const).map(([m,icon,lbl,clr,sub])=>(
                      <div key={m} className="col-6">
                        <button type="button" onClick={()=>setPayMethod(m as PayMethod)} style={{ width:'100%',padding:'1rem',borderRadius:4,cursor:'pointer',background:payMethod===m?`${clr}15`:'var(--dark-mid)',border:payMethod===m?`2px solid ${clr}`:'1px solid var(--border-gold)',transition:'all .3s',textAlign:'center' }}>
                          <div style={{ fontSize:'1.8rem',marginBottom:4 }}>{icon}</div>
                          <div style={{ fontFamily:'var(--font-ui)',fontSize:'.72rem',fontWeight:700,color:clr }}>{lbl}</div>
                          <div style={{ fontFamily:'var(--font-ui)',fontSize:'.58rem',color:'var(--text-muted-custom)' }}>{sub}</div>
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* M-Pesa */}
                  {payMethod==='mpesa'&&(
                    <div style={{ background:'rgba(0,150,50,.05)',border:'1px solid rgba(0,166,80,.3)',borderRadius:4,padding:'1.75rem' }}>
                      <div className="d-flex align-items-center gap-3 mb-3">
                        <div style={{ width:42,height:42,background:'#00a650',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.3rem' }}>📱</div>
                        <div><div style={{ fontFamily:'var(--font-ui)',fontWeight:700,color:'#00a650' }}>Lipa Na M-Pesa</div><div style={{ fontFamily:'var(--font-ui)',fontSize:'.6rem',color:'var(--text-muted-custom)' }}>STK Push to your Safaricom number</div></div>
                      </div>
                      {mpesaPhase==='input'&&<>
                        <label className="form-label-scs">Safaricom Phone Number</label>
                        <div className="d-flex gap-2 mb-3">
                          <div style={{ background:'var(--dark-mid)',border:'1px solid var(--border-gold)',borderRadius:2,padding:'11px 12px',whiteSpace:'nowrap',fontFamily:'var(--font-ui)',fontSize:'.82rem',color:'var(--text-muted-custom)' }}>🇰🇪 +254</div>
                          <input className="form-control-scs" placeholder="7XX XXX XXX" value={mpesaPhone} onChange={e=>setMpesaPhone(e.target.value.replace(/\D/g,'').slice(0,10))} />
                        </div>
                        <div style={{ background:'rgba(0,0,0,.3)',borderRadius:4,padding:'1rem',marginBottom:'1rem' }}>
                          <div style={{ fontFamily:'var(--font-ui)',fontSize:'.6rem',color:'var(--text-muted-custom)',textTransform:'uppercase',letterSpacing:'.1em',marginBottom:4 }}>Amount to Pay</div>
                          <div style={{ fontFamily:'var(--font-display)',fontSize:'2rem',fontWeight:700,color:'#00a650' }}>KES {totalKES.toLocaleString()}</div>
                          <div style={{ fontFamily:'var(--font-ui)',fontSize:'.6rem',color:'var(--text-muted-custom)' }}>≈ USD ${totalUSD.toLocaleString()}</div>
                        </div>
                        <button className="btn-submit-scs" style={{ background:'linear-gradient(135deg,#00a650,#006b30)' }} onClick={handleMpesa}>📱 Send STK Push to My Phone</button>
                        <p style={{ fontFamily:'var(--font-ui)',fontSize:'.62rem',color:'var(--text-muted-custom)',textAlign:'center',marginTop:'.75rem' }}>You'll receive a prompt on your phone. Enter your M-Pesa PIN to complete.</p>
                      </>}
                      {mpesaPhase==='pending'&&<div style={{ textAlign:'center',padding:'2rem 0' }}>
                        <div style={{ fontSize:'3rem',marginBottom:'.75rem' }}>📲</div>
                        <h4 style={{ fontFamily:'var(--font-display)',color:'#00a650' }}>STK Push Sent!</h4>
                        <p style={{ fontFamily:'var(--font-ui)',fontSize:'.78rem',color:'var(--text-muted-custom)' }}>Check your phone for the M-Pesa prompt.<br/>Enter PIN to pay KES {totalKES.toLocaleString()}.</p>
                        <div className="d-flex justify-content-center gap-2 mt-3">
                          {[0,1,2].map(i=><div key={i} style={{ width:8,height:8,borderRadius:'50%',background:'#00a650',animation:`pulse 1.2s ${i*.2}s ease-in-out infinite alternate` }}></div>)}
                        </div>
                      </div>}
                      {mpesaPhase==='done'&&<div style={{ textAlign:'center',padding:'1.5rem 0' }}><div style={{ fontSize:'3rem',color:'#00a650' }}>✅</div><h4 style={{ fontFamily:'var(--font-display)',color:'#00a650' }}>Payment Confirmed!</h4></div>}
                    </div>
                  )}

                  {/* Card */}
                  {payMethod==='card'&&(
                    <form onSubmit={handleCard}>
                      {/* Card preview */}
                      <div style={{ background:'linear-gradient(135deg,#1a1a2e,#16213e)',border:'1px solid var(--gold)',borderRadius:12,padding:'1.5rem 2rem',marginBottom:'1.5rem',minHeight:155,position:'relative',overflow:'hidden' }}>
                        <div style={{ position:'absolute',top:0,right:0,width:180,height:180,background:'radial-gradient(circle,rgba(201,151,43,.1),transparent)',borderRadius:'50%' }}></div>
                        <div className="d-flex justify-content-between mb-3">
                          <div style={{ fontFamily:'var(--font-ui)',fontSize:'.56rem',letterSpacing:'.2em',color:'rgba(255,255,255,.35)',textTransform:'uppercase' }}>Swift Crest Safaris</div>
                          <div style={{ fontFamily:'var(--font-ui)',fontWeight:700,fontSize:'.88rem',color:brandColor }}>{brandName}</div>
                        </div>
                        <div style={{ fontFamily:'monospace',fontSize:'1.1rem',letterSpacing:'.2em',color:'rgba(255,255,255,.75)',marginBottom:'1rem' }}>{card.number||'•••• •••• •••• ••••'}</div>
                        <div className="d-flex justify-content-between">
                          <div><div style={{ fontFamily:'var(--font-ui)',fontSize:'.5rem',color:'rgba(255,255,255,.35)',textTransform:'uppercase',letterSpacing:'.1em' }}>Card Holder</div><div style={{ fontFamily:'var(--font-ui)',fontSize:'.75rem',color:'rgba(255,255,255,.75)',fontWeight:600 }}>{card.name||'YOUR NAME'}</div></div>
                          <div><div style={{ fontFamily:'var(--font-ui)',fontSize:'.5rem',color:'rgba(255,255,255,.35)',textTransform:'uppercase',letterSpacing:'.1em' }}>Expires</div><div style={{ fontFamily:'var(--font-ui)',fontSize:'.75rem',color:'rgba(255,255,255,.75)',fontWeight:600 }}>{card.expiry||'MM/YY'}</div></div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center gap-2 mb-3">
                        <span style={{ fontFamily:'var(--font-ui)',fontSize:'.56rem',color:'var(--text-muted-custom)',textTransform:'uppercase',letterSpacing:'.1em' }}>Accepted:</span>
                        {[['#1a1f71','VISA'],['#eb001b','MC'],['#2E77BC','AMEX']].map(([bg,l])=><span key={l} style={{ background:bg,color:'#fff',fontFamily:'var(--font-ui)',fontSize:'.56rem',fontWeight:700,padding:'3px 8px',borderRadius:3 }}>{l}</span>)}
                        <span style={{ marginLeft:'auto',fontFamily:'var(--font-ui)',fontSize:'.58rem',color:'var(--text-muted-custom)' }}>🔒 SSL Secured</span>
                      </div>
                      <div className="row g-3">
                        <div className="col-12"><label className="form-label-scs">Cardholder Name</label><input className="form-control-scs" placeholder="John Smith" value={card.name} onChange={e=>setCard(c=>({...c,name:e.target.value}))} required /></div>
                        <div className="col-12"><label className="form-label-scs">Card Number</label><input className="form-control-scs" placeholder="1234 5678 9012 3456" value={card.number} maxLength={19} onChange={e=>setCard(c=>({...c,number:fmtCard(e.target.value)}))} required /></div>
                        <div className="col-6"><label className="form-label-scs">Expiry Date</label><input className="form-control-scs" placeholder="MM/YY" value={card.expiry} maxLength={5} onChange={e=>setCard(c=>({...c,expiry:fmtExp(e.target.value)}))} required /></div>
                        <div className="col-6"><label className="form-label-scs">CVV</label><input className="form-control-scs" type="password" placeholder="•••" value={card.cvv} maxLength={4} onChange={e=>setCard(c=>({...c,cvv:e.target.value.replace(/\D/g,'').slice(0,4)}))} required /></div>
                        <div className="col-12"><button type="submit" className="btn-submit-scs" disabled={submitting}>{submitting?<><span className="spinner-border spinner-border-sm me-2"></span>Processing…</>:<>🔒 Pay USD ${totalUSD.toLocaleString()} Securely</>}</button></div>
                      </div>
                    </form>
                  )}

                  {!payMethod&&<div style={{ textAlign:'center',padding:'2rem',color:'var(--text-muted-custom)',fontStyle:'italic' }}>↑ Choose a payment method above</div>}
                </div>
              )}

              {/* ── STEP 3 ── */}
              {step==='confirm'&&(
                <div style={{ background:'var(--dark-card)',border:'1px solid var(--border-gold)',borderRadius:4,padding:'2.25rem',textAlign:'center' }}>
                  <div style={{ fontSize:'3.5rem',marginBottom:'1rem' }}>🎉</div>
                  <h2 style={{ fontFamily:'var(--font-display)',fontSize:'2.2rem',color:'var(--gold)',marginBottom:'.5rem' }}>Booking Confirmed!</h2>
                  <p style={{ color:'var(--ivory)',marginBottom:'.5rem' }}>Thank you, <strong>{form.firstName} {form.lastName}</strong>!</p>
                  <p style={{ color:'var(--text-muted-custom)',fontStyle:'italic',marginBottom:'1.5rem' }}>Confirmation sent to <span style={{ color:'var(--gold)' }}>{form.email}</span>. Our team will contact you within 24 hours.</p>
                  <div style={{ background:'var(--dark-mid)',border:'1px solid var(--gold)',borderRadius:4,padding:'1.5rem',marginBottom:'2rem' }}>
                    <div style={{ fontFamily:'var(--font-ui)',fontSize:'.58rem',letterSpacing:'.2em',textTransform:'uppercase',color:'var(--text-muted-custom)',marginBottom:'.5rem' }}>Booking Reference</div>
                    <div style={{ fontFamily:'monospace',fontSize:'1.75rem',fontWeight:700,color:'var(--gold)',letterSpacing:'.15em' }}>{bookingRef}</div>
                  </div>
                  <div className="row g-3 text-start mb-4">
                    {[['Destination',selDest.name],['Camp / Lodge',selCamp.name],['Adults (13+)',String(adults)],['Children (<12)',String(children)],['Arrival',form.arrival],['Departure',form.departure],['Nights',String(nights)],['Season',SEASON_LABELS[season].label],['Total KES',`KES ${totalKES.toLocaleString()}`],['Total USD',`USD $${totalUSD.toLocaleString()}`],['Payment',payMethod==='mpesa'?'📱 M-Pesa':'💳 Card'],['Meal Plan',prices.mealPlan]].map(([l,v])=>(
                      <div key={l} className="col-6"><div style={{ fontFamily:'var(--font-ui)',fontSize:'.56rem',letterSpacing:'.1em',textTransform:'uppercase',color:'var(--text-muted-custom)' }}>{l}</div><div style={{ color:'var(--ivory)',fontWeight:600,fontSize:'.88rem' }}>{v}</div></div>
                    ))}
                  </div>
                  <div style={{ background:'rgba(0,166,80,.08)',border:'1px solid rgba(0,166,80,.3)',borderRadius:4,padding:'.9rem',marginBottom:'1.5rem',fontFamily:'var(--font-ui)',fontSize:'.7rem',color:'#00a650' }}>
                    ✅ Confirmation email sent · Our team will call you within 24 hours to finalize your itinerary.
                  </div>
                  <button className="btn-submit-scs" style={{ maxWidth:300 }} onClick={()=>{ setStep('details'); setPayMethod(''); setMpesaPhase('input'); setForm(defaultForm); }}>+ Book Another Safari</button>
                </div>
              )}
            </div>

            {/* ── SIDEBAR ── */}
            {step!=='confirm'&&(
              <div className="col-lg-4">
                <div className="summary-card">
                  <div style={{ fontFamily:'var(--font-ui)',fontSize:'.62rem',fontWeight:700,letterSpacing:'.2em',textTransform:'uppercase',color:'var(--gold)',paddingBottom:'.75rem',borderBottom:'1px solid var(--border-gold)',marginBottom:'1.1rem' }}>Booking Summary</div>
                  {form.arrival&&<div className="mb-3"><SeasonPill season={season} /></div>}
                  {[['Destination',selDest.name],['Camp',selCamp.name],['Category',selCamp.category.charAt(0).toUpperCase()+selCamp.category.slice(1)],['Meal Plan',prices.mealPlan]].map(([l,v])=>(
                    <div key={l} className="summary-row"><span className="s-lbl">{l}</span><span className="s-val">{v}</span></div>
                  ))}
                  <div style={{ background:'rgba(201,151,43,.06)',border:'1px solid var(--border-gold)',borderRadius:3,padding:'.75rem',margin:'.75rem 0' }}>
                    <div style={{ fontFamily:'var(--font-ui)',fontSize:'.58rem',color:'var(--gold)',letterSpacing:'.1em',textTransform:'uppercase',marginBottom:6 }}>Rate/Person/Night ({SEASON_LABELS[season].label})</div>
                    <div className="price-grid">
                      {[['👤 Adult Sharing',prices.adultSharing],['👤 Adult Solo',prices.adultSolo],['🧒 Child Sharing',prices.childSharing],['🧒 Child Solo',prices.childSolo]].map(([l,v])=>(
                        <div key={l as string} className="price-cell"><div className="price-lbl">{l}</div><div className="price-val">KES {(v as number).toLocaleString()}</div></div>
                      ))}
                    </div>
                  </div>
                  {[['Adults (13+)',adults],['Children (<12)',children],['Nights',nights]].map(([l,v])=>(
                    <div key={l as string} className="summary-row"><span className="s-lbl">{l}</span><span className="s-val">{v}</span></div>
                  ))}
                  <div className="d-flex justify-content-between align-items-baseline py-3">
                    <span style={{ fontFamily:'var(--font-ui)',fontWeight:700,fontSize:'.75rem',color:'var(--ivory)' }}>TOTAL KES</span>
                    <span style={{ fontFamily:'var(--font-display)',fontSize:'1.5rem',fontWeight:700,color:'var(--gold)' }}>KES {totalKES.toLocaleString()}</span>
                  </div>
                  <div style={{ fontFamily:'var(--font-ui)',fontSize:'.65rem',color:'var(--text-muted-custom)',textAlign:'right',marginTop:-6,marginBottom:'.5rem' }}>≈ USD ${totalUSD.toLocaleString()}</div>
                  {selDest.parkFee.adultUSD>0&&<div style={{ background:'rgba(231,76,60,.07)',border:'1px solid rgba(231,76,60,.25)',borderRadius:3,padding:'8px 10px',fontFamily:'var(--font-ui)',fontSize:'.58rem',color:'#e74c3c',marginBottom:'.5rem' }}>⚠️ Park fees NOT included: Adult USD ${selDest.parkFee.adultUSD}/day · Child USD ${selDest.parkFee.childUSD}/day</div>}
                  <div style={{ padding:'.85rem',background:'rgba(201,151,43,.05)',border:'1px solid var(--border-gold)',borderRadius:4,marginTop:'.5rem' }}>
                    {[['🛡️','Free cancellation up to 30 days'],['🎧','24/7 on-safari support'],['🏆','Best price guarantee']].map(([icon,text])=>(
                      <div key={text} className="d-flex gap-2 align-items-start mb-2"><span>{icon}</span><span style={{ fontFamily:'var(--font-ui)',fontSize:'.63rem',color:'var(--text-muted-custom)' }}>{text}</span></div>
                    ))}
                  </div>
                  <div className="mt-3 text-center"><a href="tel:+254700000000" style={{ color:'var(--gold)',fontFamily:'var(--font-ui)',fontSize:'.72rem',fontWeight:600 }}>📞 +254 700 000 000</a></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
