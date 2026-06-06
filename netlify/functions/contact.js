'use strict'

const { sendNotificationEmail, sendConfirmationEmail } = require('./_mailer')
const {
  corsHeaders,
  isRateLimited,
  sanitizeHeaderField,
  clamp,
  VALID_SUBJECTS,
} = require('./_utils')

/* ── Validate Indian mobile number ───────────────────────────────────── */
function isValidPhone(phone) {
  return /^[6-9]\d{9}$/.test(phone)
}

exports.handler = async (event) => {
  const headers = corsHeaders(event)

  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' }
  }

  // Only POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ success: false, message: 'Method not allowed' }) }
  }

  // Rate limiting — 5 submissions per IP per minute
  if (isRateLimited(event)) {
    return {
      statusCode: 429,
      headers: { ...headers, 'Retry-After': '60' },
      body: JSON.stringify({ success: false, message: 'Too many requests. Please wait a moment and try again.' }),
    }
  }

  let body
  try {
    body = JSON.parse(event.body || '{}')
  } catch {
    return { statusCode: 400, headers, body: JSON.stringify({ success: false, message: 'Invalid request' }) }
  }

  // Honeypot — bots fill hidden fields; humans don't see them
  if (body._hp) {
    // Return 200 silently so bots don't know they were blocked
    return { statusCode: 200, headers, body: JSON.stringify({ success: true, message: "Thanks! We'll be in touch." }) }
  }

  // Extract and clamp all inputs to safe max lengths
  const name    = clamp(body.name,    100)
  const phone   = clamp(body.phone,    10)
  const email   = clamp(body.email,   254) || null
  const subject = clamp(body.subject,  50) || null
  const message = clamp(body.message, 2000)

  // Server-side validation
  if (!name) {
    return { statusCode: 400, headers, body: JSON.stringify({ success: false, message: 'Name is required' }) }
  }
  if (!phone || !isValidPhone(phone)) {
    return { statusCode: 400, headers, body: JSON.stringify({ success: false, message: 'Enter a valid 10-digit Indian mobile number' }) }
  }
  if (!message || message.length < 5) {
    return { statusCode: 400, headers, body: JSON.stringify({ success: false, message: 'Message is required (min 5 characters)' }) }
  }

  // Subject allowlist — reject unknown values
  if (subject && !VALID_SUBJECTS.has(subject)) {
    return { statusCode: 400, headers, body: JSON.stringify({ success: false, message: 'Invalid subject' }) }
  }

  // Sanitize email to prevent SMTP header injection
  const safeEmail = email ? sanitizeHeaderField(email) : null

  try {
    await Promise.all([
      sendNotificationEmail({ name, phone, email: safeEmail, subject, message, type: 'contact' }),
      sendConfirmationEmail({ name, email: safeEmail }),
    ])

    return {
      statusCode: 201,
      headers,
      body: JSON.stringify({
        success: true,
        message: "Thanks! We've received your message and will respond within 24 hours.",
      }),
    }
  } catch (err) {
    // Log error code/type only — not the full stack trace (which may contain SMTP/Twilio credentials)
    console.error('[contact] Error:', err.code || err.name || 'unknown')
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ success: false, message: 'Something went wrong. Please try again or call us directly.' }),
    }
  }
}
