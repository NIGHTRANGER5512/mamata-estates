'use strict'

/* ── Allowed origins ─────────────────────────────────────────────────── */
const ALLOWED_ORIGINS = [
  'https://mamataestates.in',
  'https://www.mamataestates.in',
  'https://mamata-estates.netlify.app',
  'http://localhost:5173',
  'http://localhost:4173',
]

/* ── CORS headers ────────────────────────────────────────────────────── */
function corsHeaders(event) {
  const origin = (event.headers && event.headers.origin) || ''
  const allow  = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0]
  return {
    'Access-Control-Allow-Origin':  allow,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
    'X-Content-Type-Options': 'nosniff',
  }
}

/* ── Rate limiter — module-level, per Lambda instance ───────────────── */
/*
 * Not a distributed solution (each cold-start has its own counter), but
 * effective against naive spam bursts hitting the same function instance.
 * Window: 60 s / max 5 submissions per IP.
 */
const _rateMap = new Map()
const WINDOW_MS = 60_000
const MAX_REQS  = 5

function isRateLimited(event) {
  const ip =
    (event.headers && (
      event.headers['x-nf-client-connection-ip'] ||
      event.headers['x-forwarded-for']           ||
      event.headers['client-ip']
    )) || 'unknown'

  const now   = Date.now()
  const entry = _rateMap.get(ip)

  if (!entry || now > entry.resetAt) {
    _rateMap.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return false
  }
  if (entry.count >= MAX_REQS) return true
  entry.count++
  return false
}

/* ── Input sanitizers ────────────────────────────────────────────────── */

/** Strip CRLF from any string — prevents SMTP header injection. */
function sanitizeHeaderField(str) {
  if (!str) return null
  return String(str).replace(/[\r\n\t]/g, ' ').trim()
}

/** Clamp a string to a maximum byte length and strip leading/trailing space. */
function clamp(str, max) {
  if (!str) return ''
  return String(str).trim().substring(0, max)
}

/** Very light HTML entity encoding — prevents XSS in email templates. */
function escapeHtml(str) {
  if (!str) return ''
  return String(str)
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;')
    .replace(/'/g,  '&#x27;')
    .replace(/\//g, '&#x2F;')
}

/** Validate that a date string is YYYY-MM-DD or a short human-readable form. */
function isSafeDate(str) {
  if (!str) return true          // optional field — null/empty is fine
  // Allow YYYY-MM-DD or up to 30 printable chars (handles "15 Jan 2026" etc.)
  return /^[\w\s\-\/,.]{1,30}$/.test(str)
}

/** Known project IDs — update when projects are added/removed. */
const VALID_PROJECT_IDS = new Set([
  'onkareshwar-apartment-ranchi',
  'trivambakeswar-apartment-ranchi',
  'rameshwaram-patel-nagar-patna',
  'rameshwaram-kati-factory-road-patna',
  'shivam-residency-new-mahavir-colony',
  'hari-enclave-new-ag-colony',
  'kailasam-legacy',
])

/** Valid subject options for the contact form. */
const VALID_SUBJECTS = new Set(['hari', 'shivam', 'general', 'other', 'kailasam'])

module.exports = {
  corsHeaders,
  isRateLimited,
  sanitizeHeaderField,
  clamp,
  escapeHtml,
  isSafeDate,
  VALID_PROJECT_IDS,
  VALID_SUBJECTS,
}
