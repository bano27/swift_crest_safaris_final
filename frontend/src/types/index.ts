// ── Swift Crest Safaris – Global TypeScript Types ─────────────

export type Season = 'low' | 'shoulder' | 'high';

export interface CampPrice {
  adultSharing: number;
  adultSolo: number;
  childSharing: number;
  childSolo: number;
  mealPlan: 'Full Board' | 'All Inclusive' | 'Half Board' | 'Bed & Breakfast';
}

export interface Camp {
  id: string;
  name: string;
  category: 'budget' | 'mid-range' | 'luxury';
  description: string;
  amenities: string[];
  imageUrl: string;
  rating: number;
  low: CampPrice;
  shoulder: CampPrice;
  high: CampPrice;
}

export interface Destination {
  id: string;
  name: string;
  region: string;
  heroImage: string;
  description: string;
  highlights: string[];
  bestTime: string;
  duration: string;
  parkFee: { adultUSD: number; childUSD: number };
  camps: Camp[];
}

export interface Package {
  id: string;
  name: string;
  destinationId: string;
  destinationName: string;
  campId: string;
  campName: string;
  category: string;
  duration: string;
  priceFromKES: number;
  priceFromUSD: number;
}

export interface BookingForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nationality: string;
  adults: number;
  children: number;
  packageKey: string;
  arrival: string;
  departure: string;
  keywords: string[];
  notes: string;
  paymentMethod: 'mpesa' | 'card' | '';
}

export interface CardDetails {
  name: string;
  number: string;
  expiry: string;
  cvv: string;
}

export interface BookingPayload {
  ref: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nationality: string;
  adults: number;
  children: number;
  destination: string;
  camp: string;
  packageKey: string;
  arrival: string;
  departure: string;
  nights: number;
  season: string;
  adultRateKES: number;
  childRateKES: number;
  totalKES: number;
  totalUSD: number;
  paymentMethod: string;
  keywords: string[];
  notes: string;
  timestamp: string;
}

export interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  timestamp: string;
}

export interface SeasonInfo {
  label: string;
  color: string;
  desc: string;
}

export interface WildlifeEvent {
  id: string;
  title: string;
  image: string;
  date: string;
  location: string;
  badge: string;
  description: string;
  priceFrom: string;
  months: string[];
  packageKey?: string;
}

export interface Testimonial {
  name: string;
  country: string;
  avatar: string;
  rating: number;
  text: string;
  package: string;
}

export interface ToastState {
  message: string;
  type: 'success' | 'error' | 'info';
}
