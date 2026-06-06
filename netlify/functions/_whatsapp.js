'use strict'

const https   = require('https')
const { clamp } = require('./_utils')

function isConfigured() {
  return !!(process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_WHATSAPP_FROM)
}

function normalisePhone(phone) {
  const digits = String(phone).replace(/\D/g, '')
  return digits.startsWith('91') ? `+${digits}` : `+91${digits}`
}

function twilioPost(formBody) {
  const sid  = process.env.TWILIO_ACCOUNT_SID
  const auth = Buffer.from(`${sid}:${process.env.TWILIO_AUTH_TOKEN}`).toString('base64')
  return new Promise((resolve) => {
    const req = https.request({
      hostname: 'api.twilio.com',
      path:     `/2010-04-01/Accounts/${sid}/Messages.json`,
      method:   'POST',
      headers:  {
        'Authorization': `Basic ${auth}`,
        'Content-Type':  'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(formBody),
      },
    }, (res) => {
      let data = ''
      res.on('data', c => data += c)
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          console.log('[whatsapp] sent — status:', JSON.parse(data).status)
        } else {
          console.warn('[whatsapp] twilio error', res.statusCode, data)
        }
        resolve()
      })
    })
    req.on('error', (e) => { console.error('[whatsapp]', e.message); resolve() })
    req.write(formBody)
    req.end()
  })
}

function encode(obj) {
  return Object.entries(obj).map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join('&')
}

async function sendOwnerWhatsAppAlert({ name, phone, email, message, type, projectId }) {
  if (!isConfigured() || !process.env.TWILIO_OWNER_WHATSAPP) return

  const safeName      = clamp(name,      80)
  const safePhone     = clamp(phone,     15)
  const safeEmail     = email     ? clamp(email,     100) : null
  const safeProjectId = projectId ? clamp(projectId, 80)  : null

  const tag     = type === 'enquiry' ? `Project Enquiry — ${safeProjectId || 'General'}` : 'Contact Form'
  const preview = message && message.length > 200 ? message.slice(0, 200) + '…' : clamp(message, 200)
  const time    = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' })

  const text = [
    `*Mamta Estates — New ${tag}*`,
    `─────────────────────`,
    `*Name:*    ${safeName}`,
    `*Phone:*   +91-${safePhone}`,
    safeEmail ? `*Email:*   ${safeEmail}` : null,
    preview   ? `*Message:* ${preview}`   : null,
    `─────────────────────`,
    `${time} IST`,
    ``,
    `Reply: wa.me/91${safePhone}`,
  ].filter(Boolean).join('\n')

  await twilioPost(encode({ From: process.env.TWILIO_WHATSAPP_FROM, To: process.env.TWILIO_OWNER_WHATSAPP, Body: text }))
}

async function sendCustomerWhatsAppReply({ name, phone }) {
  if (!isConfigured()) return
  const e164 = normalisePhone(phone)

  const text = [
    `Hi ${name}!`,
    ``,
    `Thank you for reaching out to *Mamta Estates*.`,
    ``,
    `We've received your enquiry and our team will contact you within *24 hours*.`,
    ``,
    `━━━━━━━━━━━━━━━━━━━━`,
    `*Call us:*      +91 [Contact Number]`,
    `*Office:*       Boring Road, Patna`,
    `*Website:*      mamataestates.in`,
    `━━━━━━━━━━━━━━━━━━━━`,
    ``,
    `_Your Home, Our Promise._`,
    `— *Team Mamta Estates*`,
  ].join('\n')

  await twilioPost(encode({ From: process.env.TWILIO_WHATSAPP_FROM, To: `whatsapp:${e164}`, Body: text }))
}

module.exports = { sendOwnerWhatsAppAlert, sendCustomerWhatsAppReply }
