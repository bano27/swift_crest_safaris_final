import { useState, useEffect } from 'react'
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom'

// ── Mock data for admin dashboard ──────────────────────────────
const MOCK_BOOKINGS = [
  { ref:'SCS-A1B2C3', guest:'John Smith', email:'john@email.com', destination:'Maasai Mara', camp:'Enkorok Mara Camp', arrival:'2025-08-15', departure:'2025-08-22', adults:2, children:1, totalKES:435000, season:'Peak', status:'Confirmed', payment:'M-Pesa' },
  { ref:'SCS-D4E5F6', guest:'Priya Sharma', email:'priya@email.com', destination:'Amboseli NP', camp:'Ol Tukai Lodge', arrival:'2025-07-10', departure:'2025-07-14', adults:2, children:0, totalKES:300000, season:'Peak', status:'Confirmed', payment:'Card' },
  { ref:'SCS-G7H8I9', guest:'Henrik Larsson', email:'henrik@email.com', destination:'Samburu Reserve', camp:'Elephant Bedroom Camp', arrival:'2025-09-01', departure:'2025-09-05', adults:4, children:2, totalKES:780000, season:'Peak', status:'Pending', payment:'M-Pesa' },
  { ref:'SCS-J1K2L3', guest:'Sarah Mitchell', email:'sarah@email.com', destination:'Diani Beach', camp:'Baobab Beach Resort', arrival:'2025-06-20', departure:'2025-06-27', adults:2, children:0, totalKES:364000, season:'Low', status:'Confirmed', payment:'Card' },
  { ref:'SCS-M4N5O6', guest:'Carlos Mendez', email:'carlos@email.com', destination:'Lake Nakuru', camp:'Sarova Lion Hill', arrival:'2025-11-10', departure:'2025-11-13', adults:3, children:1, totalKES:270000, season:'Shoulder', status:'Confirmed', payment:'Card' },
]

const STATS = [
  { label:'Total Bookings', value:'127', icon:'bi-calendar-check', change:'+12% this month' },
  { label:'Total Revenue',  value:'KES 8.4M', icon:'bi-currency-exchange', change:'+18% this month' },
  { label:'Active Guests',  value:'43', icon:'bi-people', change:'Currently on safari' },
  { label:'Destinations',   value:'6', icon:'bi-geo-alt', change:'Across Kenya' },
]

function AdminNav() {
  return (
    <div className="admin-sidebar">
      <div style={{ padding:'1.5rem 1.25rem', borderBottom:'1px solid var(--border-gold)', marginBottom:'1rem' }}>
        <div style={{ fontFamily:'var(--font-display)', fontSize:'1.1rem', color:'var(--gold)', fontWeight:700 }}>SCS Admin</div>
        <div style={{ fontFamily:'var(--font-ui)', fontSize:'.6rem', color:'var(--text-muted-custom)', letterSpacing:'.1em', textTransform:'uppercase' }}>Dashboard</div>
      </div>
      {[
        ['/admin',          'bi-speedometer2', 'Overview'],
        ['/admin/bookings', 'bi-calendar-check','Bookings'],
        ['/admin/packages', 'bi-map',           'Packages'],
        ['/admin/customers','bi-people',         'Customers'],
        ['/admin/events',   'bi-calendar-event', 'Events'],
        ['/',               'bi-house',          'Back to Site'],
      ].map(([to, icon, label]) => (
        <NavLink key={to} to={to} end={to==='/admin'} className={({ isActive }) => `admin-nav-link ${isActive?'active':''}`}>
          <i className={`bi ${icon}`}></i><span>{label}</span>
        </NavLink>
      ))}
    </div>
  )
}

function Overview() {
  return (
    <div>
      <h2 style={{ fontFamily:'var(--font-display)', color:'var(--ivory)', marginBottom:'2rem' }}>Dashboard Overview</h2>
      <div className="row g-4 mb-4">
        {STATS.map(s => (
          <div key={s.label} className="col-md-6 col-xl-3">
            <div className="admin-stat-card">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div className="admin-stat-label">{s.label}</div>
                <i className={`bi ${s.icon}`} style={{ color:'var(--gold)', fontSize:'1.4rem' }}></i>
              </div>
              <div className="admin-stat-num">{s.value}</div>
              <div style={{ fontFamily:'var(--font-ui)', fontSize:'.62rem', color:'#27ae60', marginTop:'.5rem' }}>↑ {s.change}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="row g-4">
        <div className="col-lg-8">
          <h5 style={{ fontFamily:'var(--font-display)', color:'var(--ivory)', marginBottom:'1rem' }}>Recent Bookings</h5>
          <div className="admin-table">
            <table>
              <thead><tr><th>Ref</th><th>Guest</th><th>Destination</th><th>Dates</th><th>Total</th><th>Status</th></tr></thead>
              <tbody>
                {MOCK_BOOKINGS.slice(0,5).map(b=>(
                  <tr key={b.ref}>
                    <td style={{ color:'var(--gold)', fontFamily:'monospace' }}>{b.ref}</td>
                    <td>{b.guest}</td>
                    <td>{b.destination}</td>
                    <td style={{ fontFamily:'var(--font-ui)', fontSize:'.72rem' }}>{b.arrival} → {b.departure}</td>
                    <td style={{ color:'var(--gold)', fontWeight:700 }}>KES {b.totalKES.toLocaleString()}</td>
                    <td><span style={{ fontFamily:'var(--font-ui)', fontSize:'.58rem', fontWeight:700, padding:'3px 8px', borderRadius:2, background: b.status==='Confirmed'?'rgba(39,174,96,.2)':'rgba(243,156,18,.2)', color: b.status==='Confirmed'?'#27ae60':'#f39c12', border: `1px solid ${b.status==='Confirmed'?'rgba(39,174,96,.4)':'rgba(243,156,18,.4)'}` }}>{b.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-lg-4">
          <h5 style={{ fontFamily:'var(--font-display)', color:'var(--ivory)', marginBottom:'1rem' }}>Season Breakdown</h5>
          <div style={{ background:'var(--dark-card)', border:'1px solid var(--border-gold)', borderRadius:4, padding:'1.5rem' }}>
            {[['Peak Season (Jul–Oct,Dec)','62%','#e74c3c'],['Shoulder (Jan–Mar,Nov)','25%','#f39c12'],['Low Season (Apr–Jun)','13%','#27ae60']].map(([l,p,c])=>(
              <div key={l} className="mb-3">
                <div className="d-flex justify-content-between mb-1">
                  <span style={{ fontFamily:'var(--font-ui)', fontSize:'.68rem', color:'var(--ivory)' }}>{l}</span>
                  <span style={{ fontFamily:'var(--font-ui)', fontSize:'.68rem', fontWeight:700, color:c }}>{p}</span>
                </div>
                <div style={{ height:6, background:'var(--dark-mid)', borderRadius:3, overflow:'hidden' }}>
                  <div style={{ height:'100%', width:p, background:c, borderRadius:3 }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function AdminBookings() {
  const [filter, setFilter] = useState('all')
  const filtered = filter==='all' ? MOCK_BOOKINGS : MOCK_BOOKINGS.filter(b=>b.status.toLowerCase()===filter)
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <h2 style={{ fontFamily:'var(--font-display)', color:'var(--ivory)', margin:0 }}>All Bookings</h2>
        <div className="d-flex gap-2">
          {['all','confirmed','pending'].map(f=>(
            <button key={f} onClick={()=>setFilter(f)} style={{ fontFamily:'var(--font-ui)', fontSize:'.62rem', fontWeight:700, letterSpacing:'.08em', textTransform:'capitalize', padding:'6px 14px', borderRadius:2, cursor:'pointer', background: filter===f?'var(--gold)':'transparent', color: filter===f?'var(--black)':'var(--text-muted-custom)', border: filter===f?'1px solid var(--gold)':'1px solid var(--border-gold)' }}>{f}</button>
          ))}
        </div>
      </div>
      <div className="admin-table">
        <table>
          <thead><tr><th>Ref</th><th>Guest</th><th>Email</th><th>Package</th><th>Dates</th><th>Pax</th><th>Total KES</th><th>Payment</th><th>Status</th></tr></thead>
          <tbody>
            {filtered.map(b=>(
              <tr key={b.ref}>
                <td style={{ color:'var(--gold)', fontFamily:'monospace', fontWeight:700 }}>{b.ref}</td>
                <td>{b.guest}</td>
                <td style={{ fontSize:'.78rem' }}>{b.email}</td>
                <td style={{ fontSize:'.78rem' }}>{b.destination} · {b.camp}</td>
                <td style={{ fontFamily:'var(--font-ui)', fontSize:'.7rem' }}>{b.arrival}<br/>{b.departure}</td>
                <td style={{ fontFamily:'var(--font-ui)', fontSize:'.78rem' }}>{b.adults}A · {b.children}C</td>
                <td style={{ color:'var(--gold)', fontWeight:700 }}>KES {b.totalKES.toLocaleString()}</td>
                <td style={{ fontFamily:'var(--font-ui)', fontSize:'.7rem' }}>{b.payment}</td>
                <td><span style={{ fontFamily:'var(--font-ui)', fontSize:'.58rem', fontWeight:700, padding:'3px 8px', borderRadius:2, background: b.status==='Confirmed'?'rgba(39,174,96,.2)':'rgba(243,156,18,.2)', color: b.status==='Confirmed'?'#27ae60':'#f39c12', border:`1px solid ${b.status==='Confirmed'?'rgba(39,174,96,.4)':'rgba(243,156,18,.4)'}` }}>{b.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function AdminCustomers() {
  const customers = MOCK_BOOKINGS.map(b=>({ name:b.guest, email:b.email, bookings:1, totalSpent:b.totalKES }))
  return (
    <div>
      <h2 style={{ fontFamily:'var(--font-display)', color:'var(--ivory)', marginBottom:'2rem' }}>Customers</h2>
      <div className="admin-table">
        <table>
          <thead><tr><th>Name</th><th>Email</th><th>Bookings</th><th>Total Spent</th></tr></thead>
          <tbody>
            {customers.map(c=>(
              <tr key={c.email}>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td style={{ fontFamily:'var(--font-ui)', textAlign:'center' }}>{c.bookings}</td>
                <td style={{ color:'var(--gold)', fontWeight:700 }}>KES {c.totalSpent.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default function Admin() {
  return (
    <div>
      <AdminNav />
      <div className="admin-content">
        <Routes>
          <Route index element={<Overview />} />
          <Route path="bookings"  element={<AdminBookings />} />
          <Route path="customers" element={<AdminCustomers />} />
          <Route path="packages"  element={<div style={{ color:'var(--ivory)' }}><h2 style={{ fontFamily:'var(--font-display)' }}>Package Management</h2><p style={{ color:'var(--text-muted-custom)' }}>Connect to backend API to manage packages.</p></div>} />
          <Route path="events"    element={<div style={{ color:'var(--ivory)' }}><h2 style={{ fontFamily:'var(--font-display)' }}>Event Management</h2><p style={{ color:'var(--text-muted-custom)' }}>Connect to backend API to manage events.</p></div>} />
        </Routes>
      </div>
    </div>
  )
}
