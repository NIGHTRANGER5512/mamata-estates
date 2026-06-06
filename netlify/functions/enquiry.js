'use strict'

const { sendNotificationEmail, sendConfirmationEmail } = require('./_mailer')
const {
  corsHeaders,
  isRateLimited,
  sanitizeHeaderField,
  clamp,
  isSafeDate,
  VALID_PROJECT_IDS,
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
    return { statusCode: 200, headers, body: JSON.stringify({ success: true, message: 'Enquiry submitted!' }) }
  }

  // Extract and clamp all inputs to safe max lengths
  const name      = clamp(body.name,      100)
  const phone     = clamp(body.phone,      10)
  const email     = clamp(body.email,     254) || null
  const message   = clamp(body.message,  2000) || 'Interested in this project'
  const visitDate = clamp(body.visitDate,  30) || null
  const projectId = clamp(body.projectId, 100) || null

  // Server-side validation
  if (!name) {
    return { statusCode: 400, headers, body: JSON.stringify({ success: false, message: 'Name is required' }) }
  }
  if (!phone || !isValidPhone(phone)) {
    return { statusCode: 400, headers, body: JSON.stringify({ success: false, message: 'Enter a valid 10-digit Indian mobile number' }) }
  }

  // Validate projectId against known projects (reject unknown values)
  if (projectId && !VALID_PROJECT_IDS.has(projectId)) {
    return { statusCode: 400, headers, body: JSON.stringify({ success: false, message: 'Invalid project ID' }) }
  }

  // Validate visitDate format (prevents injection via date field)
  if (visitDate && !isSafeDate(visitDate)) {
    return { statusCode: 400, headers, body: JSON.stringify({ success: false, message: 'Invalid visit date format' }) }
  }

  // Sanitize email to prevent SMTP header injection
  const safeEmail = email ? sanitizeHeaderField(email) : null

  const fullMessage = visitDate
    ? `${message}\n\nPreferred site visit date: ${visitDate}`
    : message

  try {
    await Promise.all([
      sendNotificationEmail({ name, phone, email: safeEmail, message: fullMessage, type: 'enquiry', projectId }),
      sendConfirmationEmail({ name, email: safeEmail }),
    ])

    return {
      statusCode: 201,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Enquiry submitted! Our team will call you within 4 working hours.',
      }),
    }
  } catch (err) {
    console.error('[enquiry] Error:', err.code || err.name || 'unknown')
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ success: false, message: 'Something went wrong. Please try again or call us directly.' }),
    }
  }
}
