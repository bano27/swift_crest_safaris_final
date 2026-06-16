// ── Swift Crest Safaris – API Service ─────────────────────────
const BASE_URL = import.meta.env.VITE_API_URL || '/api'

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'Request failed' }))
    throw new Error(err.message || `HTTP ${res.status}`)
  }
  return res.json()
}

export const api = {
  // Bookings
  createBooking: (data: object) => request('/bookings', { method: 'POST', body: JSON.stringify(data) }),
  getBookings:   ()             => request('/bookings'),
  getBooking:    (ref: string)  => request(`/bookings/${ref}`),
  updateBooking: (id: string, data: object) => request(`/bookings/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteBooking: (id: string)   => request(`/bookings/${id}`, { method: 'DELETE' }),

  // Contact
  sendContact: (data: object) => request('/contact', { method: 'POST', body: JSON.stringify(data) }),

  // Admin
  getStats:     () => request('/admin/stats'),
  getCustomers: () => request('/admin/customers'),

  // M-Pesa
  mpesaSTK: (data: object) => request('/payments/mpesa/stk', { method: 'POST', body: JSON.stringify(data) }),
}

export function generateRef(): string {
  return 'SCS-' + Date.now().toString(36).toUpperCase()
}
