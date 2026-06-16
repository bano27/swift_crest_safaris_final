import { Routes, Route } from 'react-router-dom'
import { ToastProvider } from './context/ToastContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Events from './pages/Events'
import Bookings from './pages/Bookings'
import About from './pages/About'
import Contact from './pages/Contact'
import Admin from './pages/Admin'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <ToastProvider>
      <Navbar />
      <Routes>
        <Route path="/"         element={<Home />} />
        <Route path="/events"   element={<Events />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/about"    element={<About />} />
        <Route path="/contact"  element={<Contact />} />
        <Route path="/admin/*"  element={<Admin />} />
        <Route path="*"         element={<NotFound />} />
      </Routes>
      <Footer />
    </ToastProvider>
  )
}
