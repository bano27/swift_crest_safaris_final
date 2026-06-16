import { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleDark = () => {
    setDarkMode(!darkMode)
    document.body.classList.toggle('light-mode')
  }

  return (
    <nav className={`scs-navbar navbar navbar-expand-lg ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <NavLink to="/" className="navbar-brand scs-brand p-0">
          <img src={logo} alt="Swift Crest Safaris" />
          <div>
            <div className="scs-brand-name">Swift Crest Safaris</div>
            <div className="scs-brand-tag">Where comfort meets experience</div>
          </div>
        </NavLink>

        <button className="navbar-toggler border-0" type="button"
          data-bs-toggle="collapse" data-bs-target="#scsNav">
          <i className="bi bi-list" style={{ color: 'var(--gold)', fontSize: '1.4rem' }}></i>
        </button>

        <div className="collapse navbar-collapse" id="scsNav">
          <ul className="navbar-nav ms-auto align-items-center gap-1">
            {[
              { to: '/', label: 'Home' },
              { to: '/events', label: 'Events' },
              { to: '/bookings', label: 'Bookings' },
              { to: '/about', label: 'About' },
              { to: '/contact', label: 'Contact' },
            ].map(link => (
              <li key={link.to} className="nav-item">
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) => `nav-link scs-nav-link ${isActive ? 'active' : ''}`}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
            <li className="nav-item ms-2">
              <button
                onClick={toggleDark}
                className="btn btn-sm me-2"
                style={{ background: 'transparent', border: '1px solid var(--border-gold)', color: 'var(--gold)', borderRadius: '50%', width: '34px', height: '34px' }}
                title="Toggle theme"
              >
                <i className={`bi ${darkMode ? 'bi-sun' : 'bi-moon'}`}></i>
              </button>
            </li>
            <li className="nav-item">
              <button className="btn-book-nav" onClick={() => navigate('/bookings')}>Book Now</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
