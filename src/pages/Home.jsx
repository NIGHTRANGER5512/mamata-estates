import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { projects, testimonials } from '../data/projects'
import SEO from '../components/SEO'

const EASE  = [0.23, 1, 0.32, 1]
const EASE2 = [0.32, 0.72, 0, 1]

/* ── FAQ data — each Q&A is indexed by AI engines ──────────────── */
const FAQS = [
  {
    q: 'What services does Mamta Estates offer in Patna?',
    a: 'Mamta Estates provides end-to-end real estate advisory services in Patna — including residential property sales, rental assistance, investment guidance, and RERA-verified project listings. Our team on Boring Road offers personalised support for buyers, sellers, and investors across all prime Patna localities.',
  },
  {
    q: 'What is the price of a 3 BHK flat in Patna?',
    a: 'Pricing for 3 BHK flats in Patna varies by location. Premium addresses like New AG Colony, Boring Road, and Patliputra Colony typically range from ₹65 Lakh to ₹1.5 Crore depending on size, floor, and amenities. Contact Mamta Estates via the enquiry form or email info@mamataestates.in for a property-specific cost breakdown.',
  },
  {
    q: 'Which is the best area to buy a flat in Patna?',
    a: 'Boring Road, New AG Colony, Patliputra Colony, and Rajendra Nagar are among the most sought-after residential addresses in Patna — well connected to Patliputra Railway Station, Jay Prakash Narayan Airport, and major schools and hospitals. Mamta Estates has verified listings across all these prime corridors.',
  },
  {
    q: 'What amenities should I look for in a Patna apartment?',
    a: 'For quality residential living in Patna, look for 24/7 power backup, dedicated covered parking, CCTV surveillance, fire safety systems, a high-speed elevator, and an earthquake-resistant RCC structure. Mamta Estates verifies amenity details for every listing to ensure buyers have complete, accurate information.',
  },
  {
    q: 'How do I schedule a property site visit through Mamta Estates?',
    a: 'Simply submit an enquiry through our website, email us at info@mamataestates.in, or visit our office on Boring Road, Patna (Mon–Sat, 9 AM–6 PM). Our team will arrange a convenient site visit and walk you through pricing, documentation, and legal compliance — with no obligation.',
  },
  {
    q: 'How experienced is Mamta Estates as a real estate advisor in Patna?',
    a: 'Mamta Estates has been guiding families and investors in Patna since 2003 — over two decades of trusted service in the Bihar real estate market. Our team brings deep local knowledge of Patna\'s residential corridors, pricing trends, and project quality standards.',
  },
  {
    q: 'Does Mamta Estates list RERA-registered properties?',
    a: 'Yes. Mamta Estates prioritises RERA-registered project listings to protect buyer interests. We strongly encourage clients to verify all project details on the Bihar RERA official portal at rera.bihar.gov.in before making any purchase decision.',
  },
  {
    q: 'Are the properties listed by Mamta Estates earthquake resistant?',
    a: 'Patna lies in a high seismic risk zone, and Mamta Estates specifically recommends and lists properties built with earthquake-resistant RCC framed structures. We advise buyers to review structural certification and consultant credentials for every project before booking.',
  },
]

/* ── FAQ accordion component ────────────────────────────────────── */
function FAQList() {
  const [open, setOpen] = useState(null)
  return (
    <div className="flex flex-col divide-y divide-gray-200/70">
      {FAQS.map((item, i) => (
        <div key={i}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-start justify-between gap-4 py-5 text-left group"
            aria-expanded={open === i}
          >
            <span className="font-semibold text-secondary text-base leading-snug group-hover:text-primary transition-colors duration-200">
              {item.q}
            </span>
            <motion.span
              animate={{ rotate: open === i ? 45 : 0 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="flex-shrink-0 w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center mt-0.5 text-muted group-hover:border-primary group-hover:text-primary transition-colors duration-200"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 5v14M5 12h14"/>
              </svg>
            </motion.span>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                key="answer"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="overflow-hidden"
              >
                <p className="text-muted text-[15px] leading-relaxed pb-5 pr-10">
                  {item.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}

// PageLoader stays visible for 2400 ms — hero animations must wait until after it exits
const L = 2.4

/* ── Framer variants ────────────────────────────────────────────── */
const fadeUp = {
  hidden:  { opacity: 0, y: 32, filter: 'blur(6px)' },
  visible: (i = 0) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { delay: i * 0.09, duration: 0.75, ease: EASE },
  }),
}
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.09 } } }

/* ── Word-by-word mask reveal ───────────────────────────────────── */
function MaskReveal({ text, className, baseDelay = 0, tag: Tag = 'h1' }) {
  const words = text.split(' ')
  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <span key={i} className="word-mask mr-[0.22em]">
          <motion.span
            className="inline-block"
            initial={{ y: '105%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{ delay: baseDelay + i * 0.11, duration: 0.75, ease: EASE }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

/* ── Motto line — per-word curtain reveal ───────────────────────── */
function MottoLine({ text, delay, color, italic = true }) {
  const words = text.split(' ')
  return (
    <div className="flex flex-wrap" style={{ gap: '0 0.25em' }}>
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden leading-snug block">
          <motion.span
            className={`inline-block font-display font-semibold leading-snug${italic ? ' italic' : ''}`}
            style={{
              fontSize: 'clamp(1.05rem, 2.6vw, 1.5rem)',
              letterSpacing: '-0.01em',
              color,
            }}
            initial={{ y: '110%', opacity: 0, filter: 'blur(4px)' }}
            animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
            transition={{ delay: delay + i * 0.07, duration: 0.6, ease: EASE }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </div>
  )
}

/* ── Infinite marquee ───────────────────────────────────────────── */
const TICKER = [
  'Est. 2003', 'Boring Road, Patna', '20+ Years', 'Premium Properties',
  'Patna, Bihar', 'Verified Listings', 'RERA Compliant', 'Vastu Compliant',
  'Expert Guidance', 'Transparent Pricing',
]
function Marquee({ dark = false }) {
  const items = [...TICKER, ...TICKER]
  return (
    <div className={`marquee-outer py-4 ${dark ? 'bg-secondary' : 'bg-primary'}`}>
      <div className="marquee-track">
        {items.map((item, i) => (
          <span key={i}
            className={`flex items-center gap-5 text-[11px] font-semibold tracking-[0.22em] uppercase px-6
              ${dark ? 'text-white/60' : 'text-white/90'}`}
          >
            {item}
            <span className={`w-1 h-1 rounded-full flex-shrink-0 ${dark ? 'bg-white/20' : 'bg-white/40'}`} />
          </span>
        ))}
      </div>
    </div>
  )
}

/* ── SVG icons ──────────────────────────────────────────────────── */
const IconHouse     = () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
const IconColumns   = () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="4" rx="1"/><rect x="2" y="18" width="20" height="4" rx="1"/><line x1="7" y1="6" x2="7" y2="18"/><line x1="12" y1="6" x2="12" y2="18"/><line x1="17" y1="6" x2="17" y2="18"/></svg>
const IconFileCheck = () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><polyline points="9 15 11 17 15 13"/></svg>
const IconKey       = () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="7.5" cy="15.5" r="5.5"/><path d="M21 2L11.62 11.38"/><path d="M21 2h-4v4"/><line x1="11.62" y1="11.38" x2="14" y2="14"/></svg>
const IconClock     = () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
const IconShield    = () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
const IconBuild     = () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="17" rx="1"/><path d="M9 21V9m6 12V9M3 9h18"/></svg>
const IconTag       = () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7" strokeWidth="2"/></svg>
const IconCompass   = () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
const IconUsers     = () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>

/* ── Animated counter ───────────────────────────────────────────── */
function useCounter(end, duration = 1800) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = end / (duration / 16)
    const timer = setInterval(() => {
      start = Math.min(start + step, end)
      setCount(Math.floor(start))
      if (start >= end) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [inView, end, duration])
  return [ref, count]
}

/* ── Project card — curtain wipe + tilt hover ───────────────────── */
function ProjectCard({ project, index }) {
  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.35, ease: EASE }}
      className="group cursor-pointer"
    >
      {/* Double-Bezel */}
      <div className="p-1.5 rounded-[1.75rem] bg-black/[0.04] ring-1 ring-black/[0.07]">
        <div className="rounded-[calc(1.75rem-0.375rem)] bg-white overflow-hidden flex flex-col">
          {/* Curtain-wipe image */}
          <div className="relative overflow-hidden h-56">
            <img
              src={project.image} alt={project.name} loading="lazy"
              className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-[800ms]"
              style={{ transitionTimingFunction: 'cubic-bezier(0.23,1,0.32,1)' }}
            />
            <motion.div
              initial={{ scaleY: 1 }}
              whileInView={{ scaleY: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.85, ease: EASE2 }}
              className="absolute inset-0 bg-primary origin-top z-10"
            />
            <span className={`absolute top-3 right-3 z-20 text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm ${
              project.status === 'Completed' ? 'bg-green-600/90 text-white' : 'bg-orange-500/90 text-white'
            }`}>
              {project.status}
            </span>
          </div>

          <div className="p-5 flex flex-col gap-2.5 flex-1">
            <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-primary/80">{project.type}</p>
            <h3 className="font-display font-semibold text-2xl text-secondary leading-tight">{project.name}</h3>
            <div className="flex items-center gap-1.5 text-muted text-sm">
              <svg className="w-3.5 h-3.5 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              {project.area}, {project.city}
            </div>
            <p className="text-muted text-sm leading-relaxed line-clamp-2">{project.description}</p>
            <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
              <p className="text-primary font-bold text-base font-display">{project.priceRange}</p>
              <Link to={`/projects/${project.id}`}
                className="btn-press inline-flex items-center gap-1.5 text-primary text-sm font-semibold
                           group-hover:gap-2.5 transition-all duration-300"
                style={{ transitionTimingFunction: 'cubic-bezier(0.23,1,0.32,1)' }}
              >
                View Project
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ── Testimonial card ───────────────────────────────────────────── */
function TestimonialCard({ t }) {
  return (
    <div className="flex-shrink-0 w-[22rem] p-1.5 rounded-[1.5rem] bg-black/[0.04] ring-1 ring-black/[0.07]">
      <div className="rounded-[calc(1.5rem-0.375rem)] bg-white p-6 flex flex-col gap-4 h-full">
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg key={i} className="w-3.5 h-3.5 text-accent" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
            </svg>
          ))}
        </div>
        <p className="text-secondary/85 text-sm leading-relaxed italic flex-1">"{t.quote}"</p>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-display font-bold text-xs flex-shrink-0">
            {t.initials}
          </div>
          <div>
            <p className="text-secondary font-semibold text-sm">{t.name}</p>
            <p className="text-muted text-xs">{t.city} · {t.project}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Section heading with animated underline ────────────────────── */
function SectionHeading({ eyebrow, title, subtitle, light = false, center = false }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  return (
    <motion.div
      ref={ref}
      initial="hidden" whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={stagger}
      className={center ? 'flex flex-col items-center text-center' : 'flex flex-col'}
    >
      {eyebrow && (
        <motion.p variants={fadeUp}
          className={`text-[10px] font-semibold tracking-[0.25em] uppercase mb-4
            ${light ? 'text-primary' : 'text-primary'}`}
        >
          {eyebrow}
        </motion.p>
      )}
      <motion.div variants={fadeUp} className="relative inline-block">
        <h2 className={`font-display font-bold leading-[1.08]
          ${light ? 'text-white' : 'text-secondary'}
          text-4xl md:text-5xl lg:text-6xl`}
        >
          {title}
        </h2>
        {/* Animated underline */}
        <motion.span
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ delay: 0.4, duration: 0.7, ease: EASE }}
          className="absolute -bottom-1 left-0 h-[3px] w-16 bg-primary rounded-full origin-left"
        />
      </motion.div>
      {subtitle && (
        <motion.p variants={fadeUp}
          className={`mt-5 text-lg max-w-2xl leading-relaxed
            ${light ? 'text-white/60' : 'text-muted'}
            ${center ? 'mx-auto' : ''}`}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   HOME PAGE
═══════════════════════════════════════════════════════════════════ */
export default function Home() {
  const carouselRef = useRef(null)
  const [isPaused, setIsPaused] = useState(false)

  /* Parallax */
  const { scrollY } = useScroll()
  const heroImgY     = useTransform(scrollY, [0, 800],  [0, -170])
  const heroContentY = useTransform(scrollY, [0, 500],  [0, 70])
  const heroOpacity  = useTransform(scrollY, [0, 400],  [1, 0])

  const svcRef = useRef(null)
  const { scrollYProgress: svcProg } = useScroll({ target: svcRef, offset: ['start end', 'end start'] })
  const svcImgY = useTransform(svcProg, [0, 1], [-50, 50])

  const whyRef = useRef(null)
  const { scrollYProgress: whyProg } = useScroll({ target: whyRef, offset: ['start end', 'end start'] })
  const whyImgY = useTransform(whyProg, [0, 1], [-50, 50])

  /* Carousel auto-scroll */
  useEffect(() => {
    const el = carouselRef.current
    if (!el) return
    const scroll = () => {
      if (isPaused) return
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 10)
        el.scrollTo({ left: 0, behavior: 'smooth' })
      else
        el.scrollBy({ left: 352, behavior: 'smooth' })
    }
    const id = setInterval(scroll, 3600)
    return () => clearInterval(id)
  }, [isPaused])

  const [r37, count37] = useCounter(20)
  const [r32, count32] = useCounter(32)
  const [r16, count16] = useCounter(16)

  const services = [
    { icon: <IconHouse />,     title: 'Residential Sales',        desc: 'Verified listings across Patna\'s prime localities — flats, plots, and independent houses.' },
    { icon: <IconColumns />,   title: 'Property Investment',      desc: 'Expert guidance on high-yield residential and commercial investment opportunities in Bihar.' },
    { icon: <IconFileCheck />, title: 'RERA-Verified Listings',   desc: 'Every project we recommend is RERA-registered — full transparency, zero hidden risks.' },
    { icon: <IconKey />,       title: 'End-to-End Assistance',    desc: 'From shortlisting to documentation and registration — we guide you at every step.' },
  ]

  const benefits = [
    { icon: <IconClock />,   title: 'Prompt Response',         desc: 'Our team responds to every enquiry within hours — because your time matters.' },
    { icon: <IconShield />,  title: 'RERA-Verified Only',      desc: 'We list only legally compliant, RERA-registered projects to protect buyer interests.' },
    { icon: <IconBuild />,   title: 'Structural Guidance',     desc: 'We advise on earthquake-resistant, RCC-framed construction standards for Patna.' },
    { icon: <IconTag />,     title: 'Transparent Pricing',     desc: 'No hidden charges. Complete cost breakdowns and payment plans shared upfront.' },
    { icon: <IconCompass />, title: 'Local Expertise',         desc: 'Two decades on Boring Road means unmatched knowledge of Patna\'s property market.' },
    { icon: <IconUsers />,   title: 'Family-First Approach',   desc: 'We treat every client like family — honest advice, no pressure, lasting relationships.' },
  ]

  return (
    <main>
      <SEO
        title="Mamta Estates | Real Estate Advisory in Patna, Bihar"
        description="Mamta Estates — trusted real estate advisory in Boring Road, Patna, Bihar since 2003. Premium residential properties in Patna. Expert guidance, verified listings, transparent pricing."
        keywords="real estate Patna, property consultant Patna, buy flat Patna, apartments in Patna, 3 BHK flats Patna, 2 BHK flats Patna, residential projects Patna, property in Boring Road Patna, Mamta Estates, real estate agent Patna Bihar"
        canonical="/"
        image="/logo.png"
      />

      {/* ╔══════════════════════════════════════════════════════════╗
          ║  HERO                                                    ║
          ╚══════════════════════════════════════════════════════════╝ */}
      <section className="relative min-h-[100dvh] overflow-hidden flex items-center">

        {/* ── Parallax background ── */}
        <motion.div style={{ y: heroImgY }} className="absolute inset-0 scale-[1.22] origin-center">
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1800&q=85"
            alt="" className="w-full h-full object-cover"
          />
        </motion.div>

        {/* ── Gradient overlays ── */}
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/92 via-secondary/72 to-secondary/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-secondary/35" />

        {/* ── Dot grid ── */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.045]"
          style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)', backgroundSize: '36px 36px' }} />

        {/* ── Ambient glow blobs ── */}
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(13,98,69,0.22) 0%, transparent 68%)' }}
        />
        <motion.div
          animate={{ x: [0, -25, 0], y: [0, 35, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
          className="absolute bottom-1/3 right-1/3 w-[380px] h-[380px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(192,149,8,0.14) 0%, transparent 68%)' }}
        />

        {/* ── Main content ── */}
        <motion.div
          style={{ y: heroContentY, opacity: heroOpacity }}
          className="relative z-10 max-w-7xl mx-auto px-5 lg:px-16 w-full pt-28 pb-20 md:pt-36 md:pb-28"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 lg:gap-20 items-center">

            {/* LEFT: text */}
            <div className="flex flex-col items-start gap-5 max-w-[660px]">

              {/* Live eyebrow badge */}
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: L + 0.05, duration: 0.6, ease: EASE }}
                className="flex items-center gap-2.5 border border-white/20 px-4 py-1.5 rounded-full backdrop-blur-sm"
              >
                <span className="relative flex h-2 w-2 flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-70" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                </span>
                <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-white/70">
                  Est. 2003 · Boring Road, Patna · 20+ Years
                </span>
              </motion.div>

              {/* Heading */}
              <MaskReveal
                text="Building Homes. Delivering Trust."
                baseDelay={L + 0.15}
                className="font-display font-bold text-[clamp(2.4rem,7vw,5.5rem)] text-white leading-[1.03] tracking-tight"
              />

              {/* Animated rule */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: L + 0.52, duration: 0.75, ease: EASE }}
                className="h-[2px] w-24 rounded-full origin-left"
                style={{ background: 'linear-gradient(90deg, #0D6245 0%, #C09508 100%)' }}
              />

              {/* Motto */}
              <div className="flex items-stretch gap-4">
                <motion.span
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: L + 0.58, duration: 0.5, ease: EASE }}
                  className="w-[3px] rounded-full bg-primary flex-shrink-0 self-stretch origin-top"
                />
                <div className="flex flex-col gap-0.5">
                  <MottoLine text="Your Home, Our Promise." delay={L + 0.66} color="rgba(255,255,255,0.92)" />
                  <MottoLine text="Trusted Advisors Since 2003." delay={L + 0.83} color="#D9B020" />
                </div>
              </div>

              {/* Subhead */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: L + 0.74, duration: 0.7, ease: EASE }}
                className="text-white/80 text-lg md:text-xl leading-relaxed max-w-lg"
              >
                Premium residences in Patna &amp; Ranchi — RERA verified, structurally certified, delivered on time.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: L + 0.9, duration: 0.65, ease: EASE }}
                className="flex flex-col sm:flex-row gap-4 mt-1"
              >
                <motion.div className="relative" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.22, ease: EASE }}>
                  <motion.span
                    className="absolute inset-0 rounded-full bg-primary"
                    animate={{ scale: [1, 1.22, 1], opacity: [0.45, 0, 0.45] }}
                    transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: L + 1.2 }}
                  />
                  <Link to="/projects"
                    className="relative inline-flex items-center gap-2.5 bg-primary hover:bg-primary-dark
                               text-white font-semibold px-7 py-3.5 rounded-full shadow-xl
                               transition-colors duration-300"
                  >
                    Explore Projects
                    <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7M17 7H7M17 7v10"/>
                      </svg>
                    </span>
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.2 }}>
                  <Link to="/contact"
                    className="inline-flex items-center gap-2 border border-white/35
                               text-white hover:bg-white/10 font-semibold px-7 py-3.5 rounded-full
                               transition-all duration-300 backdrop-blur-sm"
                  >
                    Enquire Now
                  </Link>
                </motion.div>
              </motion.div>
            </div>

            {/* RIGHT: floating stat cards — desktop only */}
            <div className="hidden lg:flex flex-col gap-4 items-end flex-shrink-0">

              {/* Stat cards */}
              {[
                { delay: L + 0.9,  value: '20+',  label: 'Years Active',    sub: 'Est. 2003' },
                { delay: L + 1.05, value: '500+', label: 'Families Served', sub: 'Across Bihar' },
                { delay: L + 1.2,  value: '7',    label: 'Projects',        sub: 'RERA Verified' },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 48, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  transition={{ delay: s.delay, duration: 0.7, ease: EASE }}
                  className="liquid-glass rounded-2xl px-6 py-4 w-44 flex flex-col gap-0.5"
                >
                  <span className="font-display font-bold text-3xl text-white leading-none">
                    {s.value}
                  </span>
                  <span className="text-white/85 text-sm font-semibold">{s.label}</span>
                  <span className="text-white/65 text-[11px] tracking-wider uppercase">{s.sub}</span>
                </motion.div>
              ))}

              {/* Booking-open property card */}
              <motion.div
                initial={{ opacity: 0, x: 48, filter: 'blur(8px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                transition={{ delay: L + 1.38, duration: 0.75, ease: EASE }}
                className="liquid-glass rounded-2xl overflow-hidden w-52"
              >
                <div className="relative h-28 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=75"
                    alt="Premium Enclave"
                    className="w-full h-full object-cover scale-110"
                  />
                  <div className="absolute inset-0 bg-secondary/30" />
                  <span className="absolute top-2 left-2 bg-primary text-white text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full">
                    Booking Open
                  </span>
                </div>
                <div className="px-4 py-3">
                  <p className="text-white/90 font-semibold text-sm leading-snug">Premium Enclave</p>
                  <p className="text-white/70 text-[11px] mt-0.5">New AG Colony, Patna</p>
                  <Link to="/projects/hari-enclave-new-ag-colony"
                    className="mt-2.5 inline-flex items-center gap-1.5 text-primary text-[11px] font-bold tracking-wide hover:gap-2.5 transition-all duration-300"
                  >
                    View Details
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                    </svg>
                  </Link>
                </div>
              </motion.div>
            </div>

          </div>
        </motion.div>

        {/* ── Mouse scroll indicator ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: L + 1.4, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        >
          <div className="w-6 h-9 rounded-full border border-white/25 flex items-start justify-center pt-1.5">
            <motion.div
              animate={{ y: [0, 14, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1 h-2 rounded-full bg-white/50"
            />
          </div>
          <motion.span
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-white/35 text-[9px] font-semibold tracking-[0.3em] uppercase"
          >
            Scroll
          </motion.span>
        </motion.div>

      </section>

      {/* ── Marquee ticker ─────────────────────────────────────────── */}
      <Marquee />

      {/* ╔══════════════════════════════════════════════════════════╗
          ║  EDITORIAL NUMBERS STRIP                                 ║
          ╚══════════════════════════════════════════════════════════╝ */}
      <section className="bg-surface py-12 md:py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-gray-200">

            {/* Stat 1 */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE }}
              className="flex flex-col gap-2 px-8 py-8 md:py-0"
            >
              <span ref={r37}
                className="font-display font-bold text-[clamp(4rem,10vw,7rem)] text-secondary leading-none tracking-tight"
              >
                {count37}<span className="text-primary">+</span>
              </span>
              <p className="text-muted text-sm font-medium tracking-wide uppercase">Years of Experience</p>
              <div className="w-10 h-0.5 bg-primary rounded-full mt-1" />
            </motion.div>

            {/* Stat 2 */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
              className="flex flex-col gap-2 px-8 py-8 md:py-0"
            >
              <span ref={r32}
                className="font-display font-bold text-[clamp(4rem,10vw,7rem)] text-secondary leading-none tracking-tight"
              >
                {count32}<span className="text-primary">+</span>
              </span>
              <p className="text-muted text-sm font-medium tracking-wide uppercase">Families Housed</p>
              <div className="w-10 h-0.5 bg-primary rounded-full mt-1" />
            </motion.div>

            {/* Stat 3 */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
              className="flex flex-col gap-2 px-8 py-8 md:py-0"
            >
              <span ref={r16}
                className="font-display font-bold text-[clamp(4rem,10vw,7rem)] text-secondary leading-none tracking-tight"
              >
                {count16}
              </span>
              <p className="text-muted text-sm font-medium tracking-wide uppercase">Units Delivered</p>
              <div className="w-10 h-0.5 bg-primary rounded-full mt-1" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ╔══════════════════════════════════════════════════════════╗
          ║  PROJECTS                                                ║
          ╚══════════════════════════════════════════════════════════╝ */}
      <section className="py-16 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
            <SectionHeading
              eyebrow="01 — Portfolio"
              title={<>Our<br />Projects</>}
              subtitle="RERA-registered residential developments across Patna's most sought-after neighbourhoods."
            />
            <Link to="/projects"
              className="btn-press self-start md:self-end inline-flex items-center gap-2 border border-secondary/20
                         text-secondary text-sm font-semibold px-5 py-2.5 rounded-full hover:border-primary
                         hover:text-primary transition-colors duration-300 flex-shrink-0"
            >
              View all projects
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </Link>
          </div>
          <motion.div
            initial="hidden" whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
          </motion.div>
        </div>
      </section>

      {/* ╔══════════════════════════════════════════════════════════╗
          ║  SERVICES — parallax image                               ║
          ╚══════════════════════════════════════════════════════════╝ */}
      <section ref={svcRef} className="py-16 md:py-28 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Parallax bezel image */}
            <motion.div
              initial={{ opacity: 0, x: -40, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: EASE }}
              className="relative order-2 lg:order-1"
            >
              <div className="p-2 rounded-[2rem] bg-black/[0.04] ring-1 ring-black/[0.07] overflow-hidden">
                <div className="rounded-[calc(2rem-0.5rem)] overflow-hidden h-[500px]">
                  <motion.img
                    style={{ y: svcImgY, scale: 1.18 }}
                    src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80"
                    alt="Construction" loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6, ease: EASE }}
                className="absolute -bottom-6 -right-4 bg-primary text-white rounded-2xl p-5 shadow-2xl hidden md:block"
              >
                <p className="font-display font-bold text-4xl leading-none">20<span className="text-white/70 text-2xl">+</span></p>
                <p className="text-xs text-white/70 mt-1 tracking-wider uppercase">Years</p>
              </motion.div>
            </motion.div>

            {/* Service list */}
            <motion.div
              initial="hidden" whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="flex flex-col gap-3 order-1 lg:order-2"
            >
              <SectionHeading eyebrow="02 — What We Do" title={<>End-to-End<br />Expertise</>} />
              <motion.p variants={fadeUp} className="text-muted text-lg mt-2 mb-2 leading-relaxed">
                Managed by highly qualified engineers, architects, and administrators — from foundation to handover.
              </motion.p>
              <div className="flex flex-col divide-y divide-gray-200/60">
                {services.map((s, i) => (
                  <motion.div key={s.title} variants={fadeUp} custom={i}
                    className="flex items-start gap-4 py-5 group/item"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5
                                    group-hover/item:bg-primary group-hover/item:text-white transition-colors duration-300">
                      {s.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary text-base">{s.title}</h4>
                      <p className="text-muted text-sm mt-0.5 leading-relaxed">{s.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Second marquee (inverted) ─────────────────────────────── */}
      <Marquee dark />

      {/* ╔══════════════════════════════════════════════════════════╗
          ║  WHY US — dark section with parallax image               ║
          ╚══════════════════════════════════════════════════════════╝ */}
      <section ref={whyRef} className="py-16 md:py-28 bg-secondary text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeading
                eyebrow="03 — Why Choose Us"
                title={<>Guided by Values.<br />Backed by 20 Years.</>}
                light
              />
              <motion.div
                initial="hidden" whileInView="visible"
                viewport={{ once: true }}
                variants={stagger}
                className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10"
              >
                {benefits.map((b, i) => (
                  <motion.div key={b.title} variants={fadeUp} custom={i}
                    whileHover={{ y: -4, scale: 1.02 }}
                    transition={{ duration: 0.28, ease: EASE }}
                    className="flex flex-col gap-2.5 p-4 rounded-2xl bg-white/[0.04] border border-white/[0.07]
                               hover:bg-white/[0.09] hover:border-primary/40 hover:shadow-[0_0_24px_rgba(13,98,69,0.18)]
                               transition-all duration-300 cursor-default"
                  >
                    <div className="w-9 h-9 rounded-xl bg-white/10 text-white/80 flex items-center justify-center
                                    group-hover:bg-primary/30 transition-colors duration-300">
                      {b.icon}
                    </div>
                    <h4 className="font-semibold text-white text-base leading-snug">{b.title}</h4>
                    <p className="text-white/70 text-sm leading-relaxed">{b.desc}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Parallax image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: EASE }}
              className="relative hidden lg:block"
            >
              <div className="absolute inset-0 border border-accent/25 rounded-[2rem] translate-x-5 translate-y-5" />
              <div className="p-2 rounded-[2rem] bg-white/[0.05] ring-1 ring-white/10 overflow-hidden relative z-10">
                <div className="rounded-[calc(2rem-0.5rem)] overflow-hidden h-[520px]">
                  <motion.img
                    style={{ y: whyImgY, scale: 1.18 }}
                    src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"
                    alt="Construction site" loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ╔══════════════════════════════════════════════════════════╗
          ║  TESTIMONIALS                                            ║
          ╚══════════════════════════════════════════════════════════╝ */}
      <section className="py-16 md:py-28 bg-surface overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
            <SectionHeading
              eyebrow="04 — Residents"
              title="What Our Families Say"
            />
          </div>
          <div
            ref={carouselRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="flex gap-5 overflow-x-auto pb-4 scroll-smooth snap-x"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {[...testimonials, ...testimonials].map((t, i) => (
              <div key={i} className="snap-start">
                <TestimonialCard t={t} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ╔══════════════════════════════════════════════════════════╗
          ║  FAQ — GEO / AI engine optimisation                      ║
          ╚══════════════════════════════════════════════════════════╝ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            initial="hidden" whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="flex flex-col gap-3 mb-12"
          >
            <SectionHeading eyebrow="05 — FAQ" title="Common Questions" />
          </motion.div>
          <FAQList />
        </div>
      </section>

      {/* ╔══════════════════════════════════════════════════════════╗
          ║  CTA BANNER                                              ║
          ╚══════════════════════════════════════════════════════════╝ */}
      <section className="relative overflow-hidden bg-primary py-24">
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle at 15% 60%, rgba(255,255,255,0.45) 0%, transparent 55%), radial-gradient(circle at 85% 20%, rgba(255,255,255,0.3) 0%, transparent 50%)" }}
        />
        {/* Large background number */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 font-display font-bold text-[14rem] text-white/[0.04] leading-none select-none pointer-events-none hidden lg:block">
          3BHK
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial="hidden" whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="flex flex-col items-center gap-5"
          >
            <motion.span variants={fadeUp} className="text-white/60 text-[10px] font-semibold tracking-[0.25em] uppercase">
              Find Your Perfect Home
            </motion.span>
            <motion.h2 variants={fadeUp}
              className="font-display font-bold text-[clamp(2rem,5vw,3.25rem)] text-white leading-[1.1]"
            >
              Homes in Patna's<br />
              <span className="text-white/70 font-normal italic text-[0.85em]">Finest Locations — Expert Guidance</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/65 text-base">
              Verified listings · Transparent pricing · No hidden charges
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 mt-2">
              <Link to="/projects"
                className="btn-press inline-flex items-center gap-2.5 bg-white text-primary
                           hover:bg-surface font-semibold px-7 py-3.5 rounded-full
                           transition-colors duration-300 shadow-lg"
              >
                Browse All Properties
                <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                  </svg>
                </span>
              </Link>
              <Link to="/contact"
                className="btn-press inline-flex items-center gap-2 border border-white/40
                           text-white hover:bg-white/10 font-semibold px-7 py-3.5 rounded-full
                           transition-colors duration-300"
              >
                Request Callback
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </main>
  )
}
