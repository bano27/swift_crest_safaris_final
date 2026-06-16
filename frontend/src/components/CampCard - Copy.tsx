import { useNavigate } from 'react-router-dom'
import type { Camp, Season } from '../types'
import { CatBadge, PriceGrid, StarRating } from './SeasonBadge'

interface CampCardProps {
  camp: Camp
  season: Season
  parkFee: { adultUSD: number; childUSD: number }
}

export default function CampCard({ camp, season, parkFee }: CampCardProps) {
  const navigate = useNavigate()
  const prices = camp[season]

  const handleBook = () => {
    navigate(`/bookings?camp=${camp.id}`)
  }

  return (
    <div className="scs-card">
      <div className="scs-card-img-wrap">
        <img src={camp.imageUrl} alt={camp.name} className="scs-card-img" style={{ height: 175 }} loading="lazy" />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,.85) 0%, transparent 60%)' }} />
        <div style={{ position: 'absolute', bottom: 10, left: 10, display: 'flex', gap: 5, flexWrap: 'wrap' }}>
          <CatBadge cat={camp.category} />
          <span className="scs-badge" style={{ background: 'rgba(10,10,10,.85)', color: 'var(--gold)', border: '1px solid var(--border-gold)', position: 'static', display: 'inline-block' }}>
            {prices.mealPlan}
          </span>
        </div>
      </div>
      <div className="p-3 d-flex flex-column gap-2" style={{ flex: 1 }}>
        <div>
          <h5 style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', color: 'var(--ivory)', marginBottom: '4px' }}>{camp.name}</h5>
          <StarRating rating={camp.rating} />
        </div>
        <p style={{ color: 'var(--text-muted-custom)', fontSize: '0.78rem', lineHeight: 1.5, flex: 1, margin: 0 }}>{camp.description}</p>

        <PriceGrid prices={prices} parkFee={parkFee} />

        <div className="d-flex flex-wrap gap-1">
          {camp.amenities.slice(0, 4).map(a => (
            <span key={a} style={{ fontFamily: 'var(--font-ui)', fontSize: '0.54rem', color: 'rgba(245,237,214,.5)', background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.07)', borderRadius: '2px', padding: '2px 6px' }}>{a}</span>
          ))}
        </div>

        <button className="btn-gold-outline w-100 mt-1" onClick={handleBook}>Book This Camp →</button>
      </div>
    </div>
  )
}
