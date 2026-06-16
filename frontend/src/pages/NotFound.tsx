import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', textAlign:'center', padding:'2rem', background:'var(--dark)' }}>
      <div style={{ fontSize:'5rem', marginBottom:'1rem' }}>🦁</div>
      <h1 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(3rem,8vw,6rem)', fontWeight:900, color:'var(--gold)', lineHeight:1 }}>404</h1>
      <h2 style={{ fontFamily:'var(--font-display)', fontSize:'1.5rem', color:'var(--ivory)', margin:'1rem 0 .5rem' }}>Lost in the Savanna</h2>
      <p style={{ color:'var(--text-muted-custom)', maxWidth:400, margin:'0 auto 2rem', fontStyle:'italic' }}>
        Even our best guides can't find this page. Let's get you back on the trail.
      </p>
      <div className="d-flex gap-3 justify-content-center flex-wrap">
        <Link to="/" className="btn-primary-scs">🏠 Back to Home</Link>
        <Link to="/bookings" className="btn-secondary-scs">🗓 Book a Safari</Link>
      </div>
    </div>
  )
}
