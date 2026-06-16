import type { Season, Camp, CampPrice } from '../types'
import { SEASON_LABELS, KES_PER_USD } from '../data/destinations'

// ── Season Pill ───────────────────────────────────────────────
export function SeasonPill({ season }: { season: Season }) {
  const s = SEASON_LABELS[season]
  return (
    <span className="season-pill" style={{ background: `${s.color}15`, border: `1px solid ${s.color}44`, color: s.color }}>
      <span className="season-dot" style={{ background: s.color }}></span>
      {s.label}
    </span>
  )
}

// ── Season Alert ──────────────────────────────────────────────
export function SeasonAlert({ season, arrival }: { season: Season; arrival: string }) {
  if (!arrival) return null
  const s = SEASON_LABELS[season]
  return (
    <div style={{ background: `${s.color}10`, border: `1px solid ${s.color}40`, borderRadius: '4px', padding: '0.8rem 1rem', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
      <span className="season-dot mt-1" style={{ background: s.color, flexShrink: 0 }}></span>
      <div>
        <div style={{ fontFamily: 'var(--font-ui)', fontSize: '0.65rem', fontWeight: 700, color: s.color, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Your booking is in {s.label}
        </div>
        <div style={{ fontFamily: 'var(--font-ui)', fontSize: '0.62rem', color: 'var(--text-muted-custom)' }}>
          {s.desc}
          {season === 'high' && ' — Book early, availability fills fast!'}
          {season === 'low' && ' — Best savings of the year. Excellent conditions!'}
        </div>
      </div>
    </div>
  )
}

// ── Category Badge ────────────────────────────────────────────
export function CatBadge({ cat }: { cat: Camp['category'] }) {
  const map: Record<string, string> = { budget: 'badge-budget', 'mid-range': 'badge-mid', luxury: 'badge-luxury' }
  const labels: Record<string, string> = { budget: 'Budget', 'mid-range': 'Mid-Range', luxury: 'Luxury' }
  return <span className={`scs-badge ${map[cat]}`} style={{ position: 'static', display: 'inline-block' }}>{labels[cat]}</span>
}

// ── Star Rating ───────────────────────────────────────────────
export function StarRating({ rating }: { rating: number }) {
  return (
    <span className="star-rating">
      {'★'.repeat(Math.floor(rating))}{'☆'.repeat(5 - Math.floor(rating))}
      <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.65rem', color: 'var(--text-muted-custom)', marginLeft: '4px' }}>{rating.toFixed(1)}</span>
    </span>
  )
}

// ── Price Grid ────────────────────────────────────────────────
export function PriceGrid({ prices, parkFee }: { prices: CampPrice; parkFee: { adultUSD: number; childUSD: number } }) {
  return (
    <div className="price-grid">
      {[
        { l: '👤 Adult (13+) Sharing', v: prices.adultSharing },
        { l: '👤 Adult (13+) Solo',    v: prices.adultSolo },
        { l: '🧒 Child (<12) Sharing', v: prices.childSharing },
        { l: '🧒 Child (<12) Solo',    v: prices.childSolo },
      ].map((r, i) => (
        <div key={i} className="price-cell">
          <div className="price-lbl">{r.l}</div>
          <div className="price-val">KES {r.v.toLocaleString()}</div>
          <div className="price-usd">≈ USD ${Math.round(r.v / KES_PER_USD)}</div>
        </div>
      ))}
      {parkFee.adultUSD > 0 && (
        <div className="park-fee-note">
          + Park fees (not included): Adult USD ${parkFee.adultUSD}/day · Child USD ${parkFee.childUSD}/day
        </div>
      )}
    </div>
  )
}
