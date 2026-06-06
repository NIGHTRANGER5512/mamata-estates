import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import SEO from '../components/SEO'

// --ease-out-premium: cubic-bezier(0.23, 1, 0.32, 1)
const EASE = [0.23, 1, 0.32, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: 'blur(4px)' },
  visible: (i = 0) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { delay: i * 0.1, duration: 0.7, ease: EASE },
  }),
}
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }

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

function StatItem({ end, suffix, label }) {
  const [ref, count] = useCounter(end)
  return (
    <div ref={ref} className="flex flex-col items-center gap-1 px-6">
      <span className="font-mono-detail font-bold text-4xl md:text-5xl text-accent">{count}{suffix}</span>
      <span className="text-muted text-sm font-medium text-center">{label}</span>
    </div>
  )
}

const timeline = [
  { year: '1987', title: 'Tribhuvan Brand Founded', desc: 'The Tribhuvan brand was established in Patna with a singular focus: delivering quality construction and civil engineering in Bihar.' },
  { year: '2007', title: 'Tribhuvan Awas Pvt. Ltd. Incorporated', desc: 'Formally incorporated as a Private Limited Company under CIN U70100BR2007PTC013168, registered with the RoC Patna.' },
  { year: '2018', title: 'RERA Registration — Shivam Residency', desc: 'Tribhuvan Shivam Residency registered under Bihar RERA (ID: BRERAP00125-1/347/R-124/2018), setting the standard for transparent development.' },
  { year: '2021', title: 'On-Time Possession — Shivam Residency', desc: 'Possession of all 16 units at Shivam Residency commenced January 2021, as committed — reinforcing the brand\'s on-time delivery promise.' },
  { year: '2023', title: 'Launch of Tribhuvan Hari Enclave', desc: 'Launched in February 2023 in New AG Colony, Patna. RERA registered under ID: BRERAP00125-2/15/R-1539/2023.' },
]

const team = [
  {
    name: 'Anil Kumar Ranjan',
    designation: 'Managing Director',
    bio: 'A seasoned professional with deep roots in Bihar\'s construction and real estate sector. Anil Kumar Ranjan leads the strategic vision of Tribhuvan Awas, ensuring every project reflects the brand\'s founding philosophy of structural excellence, legal compliance, and customer-first delivery.',
    initials: 'AK',
  },
  {
    name: 'Shobha Kumari',
    designation: 'Director',
    bio: 'Director of Tribhuvan Awas Pvt. Ltd., Shobha Kumari oversees operational governance and administration, ensuring the company maintains its compliance posture and upholds its commitment to transparent, timely project execution.',
    initials: 'SK',
  },
]

// SVG icons for certifications
const IconShield = () => (
  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
)
const IconBeam = () => (
  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="4" rx="1" />
    <rect x="2" y="18" width="20" height="4" rx="1" />
    <line x1="7" y1="6" x2="7" y2="18" />
    <line x1="12" y1="6" x2="12" y2="18" />
    <line x1="17" y1="6" x2="17" y2="18" />
  </svg>
)
const IconWrench = () => (
  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
)
const IconGlobe = () => (
  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
)

const certifications = [
  { name: 'Bihar RERA', subtitle: 'Registered Developer', icon: <IconShield /> },
  { name: 'CASCON', subtitle: 'Structural Consultant', icon: <IconBeam /> },
  { name: 'PH Engineers', subtitle: 'Public Health Engineering', icon: <IconWrench /> },
  { name: 'ARCC', subtitle: 'Geological Consultant', icon: <IconGlobe /> },
]

export default function About() {
  return (
    <main className="pt-20">
      <SEO
        title="About Us | Real Estate Developer in Patna Since 2004"
        description="Tribhuvan Awas Pvt. Ltd. — 20+ years of trusted residential construction in Patna, Bihar and Ranchi, Jharkhand. RERA-registered developer, transparent dealings, on-time delivery."
        keywords="Tribhuvan Awas about, real estate company Patna, property developer Bihar, trusted builder Patna, RERA registered developer Patna, construction company Bihar since 2004"
        canonical="/about"
      />
      {/* Hero */}
      <section
        className="relative h-56 md:h-72 flex items-end bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80')" }}
      >
        <div className="absolute inset-0 bg-secondary/65" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-10 w-full">
          <nav className="text-white/50 text-sm mb-2 flex items-center gap-2">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">About</span>
          </nav>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-white">About Tribhuvan Awas</h1>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -32, filter: 'blur(4px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"
                alt="Our Story"
                loading="lazy"
                className="rounded-2xl w-full h-[440px] object-cover shadow-xl"
              />
              <div className="absolute -bottom-5 -right-5 bg-primary text-white rounded-xl p-4 shadow-xl hidden md:block">
                <p className="font-display font-bold text-3xl">1987</p>
                <p className="text-sm text-white/80">Founded in Patna</p>
              </div>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="flex flex-col gap-5"
            >
              <motion.span variants={fadeUp} className="text-primary text-sm font-semibold tracking-widest uppercase">Our Story</motion.span>
              <motion.h2 variants={fadeUp} className="font-display font-bold text-4xl md:text-5xl text-secondary leading-tight">
                20+ Years of Engineering Bihar's Future
              </motion.h2>
              <motion.p variants={fadeUp} className="text-secondary/70 leading-relaxed">
                The Tribhuvan brand has been synonymous with quality construction in Bihar for over three and a half decades. Formally incorporated as Tribhuvan Awas Pvt. Ltd. in 2007 (CIN: U70100BR2007PTC013168), the company is registered with the Registrar of Companies, Patna, and remains in active, compliant operation.
              </motion.p>
              <motion.p variants={fadeUp} className="text-secondary/70 leading-relaxed">
                We are managed by a highly professional consortium of dedicated engineers, architectural designers, and administrative executives. Our core philosophy is anchored in four non-negotiable principles: technical excellence, timely project delivery, clear property titles, and a genuine concern for the environment and the communities we build in.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-col gap-3 mt-2">
                {[
                  'Earthquake-resistant RCC framed construction on every project',
                  'Specialist consultants: CASCON (Structural), PH Engineers (Public Health), ARCC (Geological)',
                  'Full Bihar RERA registration and compliance',
                  'Registered address: 111, 1st Floor, Ashoka Place, Exhibition Road, Patna',
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                    <span className="text-secondary/80 text-sm">{point}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-surface border-y border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-14 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x divide-gray-200">
          <StatItem end={20} suffix="+" label="Years of Experience" />
          <StatItem end={2} suffix="" label="RERA-Registered Projects" />
          <StatItem end={32} suffix="+" label="Families Housed" />
          <StatItem end={2007} suffix="" label="Year Incorporated" />
        </div>
      </section>

      {/* Leadership */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-14"
          >
            <h2 className="font-display font-bold text-4xl md:text-5xl text-secondary">Our Leadership</h2>
            <div className="section-divider mt-3" />
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto"
          >
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                variants={fadeUp}
                custom={i}
                className="bg-surface rounded-2xl p-8 flex flex-col items-center text-center gap-4 border border-gray-200"
              >
                <div className="w-20 h-20 rounded-full bg-primary/10 text-primary flex items-center justify-center font-display font-bold text-2xl">
                  {member.initials}
                </div>
                <div>
                  <h3 className="font-display font-semibold text-xl text-secondary">{member.name}</h3>
                  <p className="text-primary text-sm font-medium mt-0.5 font-mono-detail">{member.designation}</p>
                </div>
                <p className="text-muted text-sm leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Corporate Details */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mt-12 bg-secondary/5 rounded-2xl border border-gray-200 p-8 max-w-3xl mx-auto"
          >
            <h3 className="font-display font-semibold text-xl text-secondary mb-5 text-center">Corporate Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              {[
                { label: 'Company Name', value: 'Tribhuvan Awas Pvt. Ltd.' },
                { label: 'CIN', value: 'U70100BR2007PTC013168', mono: true },
                { label: 'Incorporation Date', value: 'September 7, 2007' },
                { label: 'Company Status', value: 'Active' },
                { label: 'Registered With', value: 'RoC Patna, Bihar' },
                { label: 'Registered Address', value: '111, 1st Floor, Ashoka Place, Exhibition Road, Patna – 800001' },
              ].map((item) => (
                <div key={item.label} className="flex flex-col gap-0.5">
                  <span className="text-muted text-xs uppercase tracking-wider">{item.label}</span>
                  <span className={`text-secondary font-medium ${item.mono ? 'font-mono-detail text-xs' : ''}`}>{item.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-secondary text-white">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-14"
          >
            <h2 className="font-display font-bold text-4xl md:text-5xl">Our Journey</h2>
            <div className="section-divider mt-3" />
          </motion.div>
          <div className="relative">
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-white/20 -translate-x-1/2" />
            <div className="flex flex-col gap-8">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -32 : 32, filter: 'blur(4px)' }}
                  whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
                  className={`relative flex items-start gap-6 md:gap-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className={`hidden md:flex md:w-1/2 ${i % 2 === 0 ? 'justify-end pr-12' : 'justify-start pl-12'}`}>
                    <div className="max-w-xs">
                      <span className="font-mono-detail text-accent font-bold text-2xl">{item.year}</span>
                      <h4 className="font-display font-semibold text-lg mt-1">{item.title}</h4>
                      <p className="text-white/60 text-sm mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-2 border-white mt-1 flex-shrink-0" />
                  <div className="md:hidden pl-16">
                    <span className="font-mono-detail text-accent font-bold text-xl">{item.year}</span>
                    <h4 className="font-display font-semibold text-base mt-1">{item.title}</h4>
                    <p className="text-white/60 text-sm mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Structural Philosophy + Consultants */}
      <section className="py-20 bg-surface">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-12"
          >
            <h2 className="font-display font-bold text-3xl md:text-4xl text-secondary">Structural Philosophy & Consultants</h2>
            <div className="section-divider mt-3" />
            <p className="mt-5 text-muted max-w-2xl mx-auto text-base leading-relaxed">
              Patna lies in a high seismic risk zone. Every Tribhuvan Awas structure is engineered with earthquake-resistant RCC framing as a non-negotiable standard — not an optional upgrade. We work with certified specialist consultants on every project.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {certifications.map((cert, i) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: EASE }}
                className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col items-center text-center gap-2 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  {cert.icon}
                </div>
                <p className="font-display font-bold text-secondary">{cert.name}</p>
                <p className="text-muted text-xs">{cert.subtitle}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
