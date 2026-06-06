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
  { year: '2003', title: 'Mamta Estates Founded', desc: 'Mamta Estates was established on Boring Road, Patna with a singular focus: honest, family-first real estate advisory for buyers and investors in Bihar.' },
  { year: '2008', title: 'Expansion Across Patna', desc: 'Grew our portfolio to cover Patna\'s key residential corridors — Boring Road, New AG Colony, Patliputra Colony, Rajendra Nagar, and beyond.' },
  { year: '2016', title: 'RERA Era: Championing Compliance', desc: 'As Bihar RERA came into force, Mamta Estates became one of Patna\'s first advisories to exclusively list and recommend RERA-registered projects — protecting buyer investments.' },
  { year: '2020', title: 'Digital Advisory Launch', desc: 'Launched our digital platform to serve Patna\'s home-seekers online, bringing verified listings and expert guidance to every screen.' },
  { year: '2023', title: '20 Years of Trusted Service', desc: 'Completed two decades of guiding families and investors in Patna\'s property market — with a reputation built on transparency, accuracy, and genuine care.' },
]

const team = [
  {
    name: 'Senior Property Advisor',
    designation: 'Head of Residential Sales',
    bio: 'Our senior advisory team brings over 15 years of direct experience in Patna\'s residential property market. Deep knowledge of Boring Road, New AG Colony, and Patliputra corridors — guiding families to the right home at the right price.',
    initials: 'ME',
  },
  {
    name: 'Investment Consultant',
    designation: 'Head of Property Investment',
    bio: 'Specialising in residential and commercial property investments across Bihar. Our investment team provides data-driven guidance on high-yield opportunities, rental yields, and long-term capital appreciation in Patna\'s growing market.',
    initials: 'ME',
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
  { name: 'Bihar RERA', subtitle: 'Verified Listings Only', icon: <IconShield /> },
  { name: 'Residential', subtitle: 'Sales & Rentals', icon: <IconBeam /> },
  { name: 'Commercial', subtitle: 'Office & Retail Space', icon: <IconWrench /> },
  { name: 'Investment', subtitle: 'Property Advisory', icon: <IconGlobe /> },
]

export default function About() {
  return (
    <main className="pt-20">
      <SEO
        title="About Mamta Estates | Real Estate Advisory in Patna Since 2003"
        description="Mamta Estates — 20+ years of trusted real estate advisory in Boring Road, Patna, Bihar. Expert guidance, verified listings, and transparent service for families and investors."
        keywords="Mamta Estates about, real estate advisor Patna, property consultant Boring Road Patna, trusted real estate Patna, property advisory Bihar since 2003"
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
          <h1 className="font-display font-bold text-4xl md:text-5xl text-white">About Mamta Estates</h1>
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
                <p className="font-display font-bold text-3xl">2003</p>
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
                20+ Years Guiding Patna's Families Home
              </motion.h2>
              <motion.p variants={fadeUp} className="text-secondary/70 leading-relaxed">
                Founded in 2003 on Boring Road, Patna, Mamta Estates has spent over two decades as one of Bihar's most trusted real estate advisories. We help families, professionals, and investors find the right property — with complete transparency, honest guidance, and no-pressure service.
              </motion.p>
              <motion.p variants={fadeUp} className="text-secondary/70 leading-relaxed">
                Our team combines deep local knowledge of Patna's residential corridors with a genuine commitment to client welfare. We believe every family deserves a home that's right for them — and we work tirelessly to make that happen, from the first enquiry to the final handover.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-col gap-3 mt-2">
                {[
                  'Verified, RERA-registered listings across all major Patna localities',
                  'Expert guidance on residential sales, rentals, and investment',
                  'Transparent pricing — complete breakdowns, no hidden charges',
                  'Office address: Boring Road, Patna, Bihar – 800001',
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
          <StatItem end={500} suffix="+" label="Families Served" />
          <StatItem end={50} suffix="+" label="Properties Listed" />
          <StatItem end={2003} suffix="" label="Year Founded" />
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

          {/* Company Details */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mt-12 bg-secondary/5 rounded-2xl border border-gray-200 p-8 max-w-3xl mx-auto"
          >
            <h3 className="font-display font-semibold text-xl text-secondary mb-5 text-center">Company Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              {[
                { label: 'Company Name', value: 'Mamta Estates' },
                { label: 'Founded', value: '2003' },
                { label: 'Company Status', value: 'Active' },
                { label: 'Specialisation', value: 'Residential & Commercial Real Estate' },
                { label: 'Area Served', value: 'Patna, Bihar' },
                { label: 'Office Address', value: 'Boring Road, Patna, Bihar – 800001' },
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
            <h2 className="font-display font-bold text-3xl md:text-4xl text-secondary">Our Services at a Glance</h2>
            <div className="section-divider mt-3" />
            <p className="mt-5 text-muted max-w-2xl mx-auto text-base leading-relaxed">
              From finding the perfect home to RERA compliance and investment decisions, Mamta Estates provides comprehensive, honest guidance at every stage of your property journey in Patna.
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
