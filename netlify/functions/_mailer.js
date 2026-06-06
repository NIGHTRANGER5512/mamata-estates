'use strict'

const nodemailer = require('nodemailer')
const { escapeHtml } = require('./_utils')

/* ── Config ──────────────────────────────────────────────────────────── */
const BRAND      = '#126B50'
const BRAND_DARK = '#0D5340'
const SENDER     = process.env.SMTP_USER   // must be set in Netlify env vars
const NOTIFY_TO  = process.env.NOTIFY_EMAIL // must be set in Netlify env vars
const LOGO_URL   = 'https://mamataestates.in/logo.png'
const SITE_URL   = 'https://mamataestates.in'

function createTransporter() {
  return nodemailer.createTransport({
    host:   process.env.SMTP_HOST || 'smtp.gmail.com',
    port:   parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth:   { user: SENDER, pass: process.env.SMTP_PASS },
  })
}

function isMailConfigured() {
  return !!(process.env.SMTP_USER && process.env.SMTP_PASS && process.env.NOTIFY_EMAIL)
}

/**
 * Strip CRLF from an email address to prevent SMTP header injection.
 * Also enforces RFC 5321 max length (254 chars).
 */
function sanitizeEmailAddr(addr) {
  if (!addr || typeof addr !== 'string') return null
  const cleaned = addr.replace(/[\r\n\t]/g, '').trim()
  return cleaned.length > 0 && cleaned.length <= 254 ? cleaned : null
}

/* ── Base wrapper ────────────────────────────────────────────────────── */
function wrap(inner) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Mamta Estates</title>
</head>
<body style="margin:0;padding:32px 16px;background:#F2EDE8;font-family:'Helvetica Neue',Arial,sans-serif">
  <div style="max-width:580px;margin:0 auto">
    ${inner}
    <p style="text-align:center;color:#BBB;font-size:10px;margin-top:20px;line-height:1.6">
      © ${new Date().getFullYear()} Mamta Estates &nbsp;·&nbsp; Boring Road, Patna<br>
      Boring Road, Patna, Bihar – 800001
    </p>
  </div>
</body>
</html>`
}

/* ── INTERNAL NOTIFICATION  (sent to the business owner) ─────────────── */
async function sendNotificationEmail({ name, phone, email, subject, message, type, projectId }) {
  if (!isMailConfigured()) {
    console.warn('[mailer] SMTP not configured — skipping notification email')
    return
  }

  const isEnquiry  = type === 'enquiry'
  const subjectLine = isEnquiry
    ? `🏠 New Enquiry — ${projectId || 'General'} | Mamta Estates`
    : `📬 New Contact Form | Mamta Estates`

  // Escape all user-supplied values before inserting into HTML (XSS prevention)
  const safeName      = escapeHtml(name)
  const safePhone     = escapeHtml(phone)
  const safeEmail     = email     ? escapeHtml(sanitizeEmailAddr(email) || email) : null
  const safeSubject   = subject   ? escapeHtml(subject)   : null
  const safeProjectId = projectId ? escapeHtml(projectId) : null
  const safeMessage   = message   ? escapeHtml(message).replace(/\n/g, '<br>') : null

  const rows = [
    { icon: '👤', label: 'Name',    value: safeName },
    { icon: '📞', label: 'Phone',   value: `<a href="tel:+91${safePhone}" style="color:${BRAND};text-decoration:none;font-weight:700">+91-${safePhone}</a>` },
    safeEmail     ? { icon: '✉️',  label: 'Email',   value: `<a href="mailto:${safeEmail}" style="color:${BRAND};text-decoration:none">${safeEmail}</a>` } : null,
    safeSubject   ? { icon: '📌', label: 'Subject',  value: safeSubject }                            : null,
    safeProjectId ? { icon: '🏗️', label: 'Project',  value: `<strong>${safeProjectId}</strong>` }   : null,
    safeMessage   ? { icon: '💬', label: 'Message',  value: safeMessage }                            : null,
  ].filter(Boolean)

  const tableRows = rows.map(({ icon, label, value }) => `
    <tr>
      <td style="padding:11px 16px;background:#FAF7F3;border-bottom:1px solid #EDE8E2;white-space:nowrap;vertical-align:top;width:110px">
        <span style="font-size:13px">${icon}</span>&nbsp;
        <span style="font-size:11px;font-weight:700;color:#999;text-transform:uppercase;letter-spacing:0.6px">${label}</span>
      </td>
      <td style="padding:11px 16px;background:#fff;border-bottom:1px solid #EDE8E2;color:#1C1C1C;font-size:14px;line-height:1.65;vertical-align:top">${value}</td>
    </tr>`).join('')

  const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' })

  const html = wrap(`
    <!-- Header -->
    <div style="background:linear-gradient(135deg,${BRAND} 0%,${BRAND_DARK} 100%);border-radius:12px 12px 0 0;padding:24px 28px;display:flex;align-items:center;gap:16px">
      <div style="background:#fff;border-radius:10px;padding:8px 12px;display:inline-block">
        <img src="${LOGO_URL}" alt="Mamta Estates" height="36" style="display:block;height:36px;width:auto">
      </div>
      <div>
        <p style="margin:0;color:rgba(255,255,255,0.75);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px">
          ${isEnquiry ? 'Project Enquiry' : 'Contact Form'}
        </p>
        <h1 style="margin:4px 0 0;color:#fff;font-size:20px;font-weight:700;letter-spacing:-0.3px">New Lead Received</h1>
      </div>
    </div>

    <!-- Table -->
    <table style="width:100%;border-collapse:collapse;border-radius:0 0 12px 12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08)">
      ${tableRows}
      <tr>
        <td colspan="2" style="padding:14px 16px;background:#FFF8F5;border-top:2px solid ${BRAND}20">
          <span style="font-size:12px;color:#888">⏰ Submitted at <strong style="color:#555">${timestamp} IST</strong></span>
          &nbsp;·&nbsp;
          <span style="font-size:12px;color:#888">Reply within the hour for best conversion</span>
        </td>
      </tr>
    </table>

    <!-- CTA -->
    <div style="margin-top:20px;text-align:center">
      <a href="tel:+91${phone}" style="display:inline-block;background:${BRAND};color:#fff;font-size:14px;font-weight:700;padding:12px 28px;border-radius:100px;text-decoration:none;margin-right:10px">
        📞 Call Back
      </a>
      <a href="https://wa.me/91${phone}" style="display:inline-block;background:#1DA851;color:#fff;font-size:14px;font-weight:700;padding:12px 28px;border-radius:100px;text-decoration:none">
        💬 WhatsApp
      </a>
    </div>
  `)

  await createTransporter().sendMail({
    from:    `"Mamta Estates Website" <${SENDER}>`,
    to:      NOTIFY_TO,
    subject: subjectLine,
    html,
  })
  console.log('[mailer] Notification email sent')
}

/* ── CONFIRMATION EMAIL  (sent to the visitor) ───────────────────────── */
async function sendConfirmationEmail({ name, email }) {
  const safeRecipient = sanitizeEmailAddr(email)
  if (!safeRecipient || !isMailConfigured()) return

  const safeName = escapeHtml(name)

  const html = wrap(`
    <!-- Header -->
    <div style="background:linear-gradient(135deg,${BRAND} 0%,${BRAND_DARK} 100%);border-radius:12px 12px 0 0;padding:32px 28px;text-align:center">
      <div style="background:#fff;border-radius:10px;padding:8px 14px;display:inline-block;margin-bottom:16px">
        <img src="${LOGO_URL}" alt="Mamta Estates" height="40" style="display:block;height:40px;width:auto">
      </div>
      <h1 style="margin:0 0 6px;color:#fff;font-size:22px;font-weight:700">Thank you, ${safeName}! 🙏</h1>
      <p style="margin:0;color:rgba(255,255,255,0.80);font-size:14px">Building Homes. Delivering Trust.</p>
    </div>

    <!-- Body -->
    <div style="background:#fff;border-radius:0 0 12px 12px;padding:28px;box-shadow:0 4px 20px rgba(0,0,0,0.08)">
      <p style="margin:0 0 20px;color:#444;font-size:15px;line-height:1.75">
        We've received your enquiry and our team will get back to you within
        <strong style="color:${BRAND}">24 hours</strong>.
        We look forward to helping you find your dream home in Patna.
      </p>

      <!-- Contact options -->
      <div style="background:#FAF7F3;border-radius:10px;padding:20px;margin-bottom:20px">
        <p style="margin:0 0 14px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:#AAA">Reach Us Directly</p>
        <table style="width:100%;border-collapse:collapse">
          <tr>
            <td style="padding:8px 12px 8px 0;width:50%;vertical-align:top">
              <a href="mailto:info@mamataestates.in" style="display:flex;align-items:center;gap:10px;text-decoration:none">
                <div style="width:36px;height:36px;background:${BRAND}15;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0">📞</div>
                <div>
                  <p style="margin:0;font-size:10px;color:#AAA;font-weight:700;text-transform:uppercase;letter-spacing:0.5px">Contact</p>
                  <p style="margin:2px 0 0;font-size:14px;font-weight:700;color:${BRAND}">+91 [Contact Number]</p>
                </div>
              </a>
            </td>
            <td style="padding:8px 0 8px 12px;vertical-align:top">
              <a href="mailto:info@mamataestates.in" style="display:flex;align-items:center;gap:10px;text-decoration:none">
                <div style="width:36px;height:36px;background:#55555515;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0">✉️</div>
                <div>
                  <p style="margin:0;font-size:10px;color:#AAA;font-weight:700;text-transform:uppercase;letter-spacing:0.5px">Email</p>
                  <p style="margin:2px 0 0;font-size:14px;font-weight:700;color:#555">info@mamataestates.in</p>
                </div>
              </a>
            </td>
          </tr>
          <tr>
            <td colspan="2" style="padding-top:10px;vertical-align:top">
              <div style="display:flex;align-items:center;gap:10px">
                <div style="width:36px;height:36px;background:#55555515;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0">📍</div>
                <div>
                  <p style="margin:0;font-size:10px;color:#AAA;font-weight:700;text-transform:uppercase;letter-spacing:0.5px">Office</p>
                  <p style="margin:2px 0 0;font-size:13px;color:#444">Boring Road, Patna, Bihar – 800001</p>
                </div>
              </div>
            </td>
          </tr>
        </table>
      </div>

      <!-- Visit website CTA -->
      <div style="text-align:center">
        <a href="${SITE_URL}" style="display:inline-block;background:${BRAND};color:#fff;font-size:14px;font-weight:700;padding:13px 32px;border-radius:100px;text-decoration:none">
          View Our Projects →
        </a>
      </div>

      <!-- RERA note -->
      <div style="margin-top:20px;border-left:3px solid ${BRAND};padding:10px 14px;background:#FFF8F5;border-radius:0 8px 8px 0">
        <p style="margin:0;font-size:11px;color:#888;line-height:1.6">
          <strong style="color:#555">Mamta Estates</strong> &nbsp;·&nbsp; RERA Verified &nbsp;·&nbsp; Est. 2003<br>
          Boring Road, Patna, Bihar – 800001 &nbsp;·&nbsp; mamataestates.in
        </p>
      </div>
    </div>

    <p style="margin-top:16px;text-align:center;color:#CCC;font-size:11px">
      This is an automated confirmation — please do not reply to this email.
    </p>
  `)

  await createTransporter().sendMail({
    from:    `"Mamta Estates Pvt. Ltd." <${SENDER}>`,
    to:      safeRecipient,
    subject: '✅ Enquiry received — Mamta Estates',
    html,
  })
  console.log('[mailer] Confirmation email sent') // do not log recipient address (PII)
}

module.exports = { sendNotificationEmail, sendConfirmationEmail }
