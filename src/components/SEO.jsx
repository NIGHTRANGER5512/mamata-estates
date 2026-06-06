import { useEffect } from 'react'

const SITE_NAME = 'Mamta Estates'
const SITE_URL  = 'https://mamataestates.in'

const DEFAULT_TITLE = 'Mamta Estates | Real Estate Advisory in Patna, Bihar'
const DEFAULT_DESC  =
  'RERA-verified real estate advisory and property consultancy on Boring Road, Patna. Expert guidance for buying residential and commercial properties in Bihar since 2003.'
const DEFAULT_KEYWORDS =
  'real estate Patna, property advisory Patna, apartments in Patna, flats in Patna, 3 BHK flats Patna, 2 BHK flats Patna, RERA verified properties Patna, property consultant Patna Bihar, buy flat Patna, Mamta Estates, Boring Road Patna'
const DEFAULT_IMAGE = `${SITE_URL}/logo.png`

function setMeta(attr, key, value) {
  let el = document.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', value)
}

function setCanonical(url) {
  let el = document.querySelector('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', url)
}

/**
 * SEO component — updates <title>, meta tags, and canonical URL on mount.
 *
 * Usage:
 *   <SEO
 *     title="Hari Enclave — 3 BHK Apartments in Patna"
 *     description="Premium 3 BHK apartments in New AG Colony..."
 *     keywords="3 BHK Patna, New AG Colony apartments..."
 *     canonical="/projects/hari-enclave-new-ag-colony"
 *   />
 */
export default function SEO({ title, description, keywords, image, canonical, noIndex = false }) {
  const fullTitle  = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE
  const desc       = description || DEFAULT_DESC
  const kw         = keywords    || DEFAULT_KEYWORDS
  const img        = image       || DEFAULT_IMAGE
  const canonUrl   = canonical   ? `${SITE_URL}${canonical}` : `${SITE_URL}${window.location.pathname}`

  useEffect(() => {
    document.title = fullTitle

    // Standard
    setMeta('name', 'description', desc)
    setMeta('name', 'keywords',    kw)
    setMeta('name', 'robots',      noIndex ? 'noindex,nofollow' : 'index,follow,max-image-preview:large,max-snippet:-1')

    // Canonical
    setCanonical(canonUrl)

    // Open Graph
    setMeta('property', 'og:title',       fullTitle)
    setMeta('property', 'og:description', desc)
    setMeta('property', 'og:image',       img)
    setMeta('property', 'og:url',         canonUrl)
    setMeta('property', 'og:type',        'website')
    setMeta('property', 'og:site_name',   SITE_NAME)

    // Twitter Card
    setMeta('name', 'twitter:card',        'summary_large_image')
    setMeta('name', 'twitter:title',       fullTitle)
    setMeta('name', 'twitter:description', desc)
    setMeta('name', 'twitter:image',       img)
  }, [fullTitle, desc, kw, img, canonUrl, noIndex])

  return null
}
