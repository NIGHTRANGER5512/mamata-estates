import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { projects } from '../data/projects'
import SEO from '../components/SEO'

const STATUSES = ['All', 'Ongoing', 'Completed', 'Upcoming']
const EASE = [0.23, 1, 0.32, 1]
const EASE_DRAWER = [0.32, 0.72, 0, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: 'blur(4px)' },
  visible: (i = 0) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { delay: i * 0.1, duration: 0.7, ease: EASE },
  }),
}

function ProjectCard({ project }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, scale: 0.97, filter: 'blur(4px)' }}
      transition={{ duration: 0.45, ease: EASE }}
      className="group"
    >
      {/* Double-Bezel outer shell */}
      <div className="p-1.5 rounded-[1.75rem] bg-black/[0.04] ring-1 ring-black/[0.07]">
        {/* Inner core */}
        <div className="rounded-[calc(1.75rem-0.375rem)] bg-white overflow-hidden flex flex-col">
          {/* Image with curtain-wipe reveal */}
          <div className="relative overflow-hidden h-56">
            <img
              src={project.image}
              alt={project.name}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700"
              style={{ transitionTimingFunction: 'cubic-bezier(0.23,1,0.32,1)' }}
            />
            {/* Brand-color curtain that retracts upward on scroll-reveal */}
            <motion.div
              initial={{ scaleY: 1 }}
              whileInView={{ scaleY: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: EASE_DRAWER }}
              className="absolute inset-0 bg-primary origin-top z-10"
            />
            {/* Status badges — above curtain */}
            <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end z-20">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/90 text-secondary backdrop-blur-sm">
                {project.type}
              </span>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                project.status === 'Completed' ? 'bg-green-600/90 text-white'
                : project.status === 'Upcoming' ? 'bg-blue-600/90 text-white'
                : 'bg-orange-500/90 text-white'
              }`}>
                {project.status}
              </span>
              {/* Booking Open badge */}
              {project.bookingOpen && (
                <span className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-primary text-white">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-70" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white" />
                  </span>
                  Booking Open
                </span>
              )}
            </div>
          </div>

          {/* Card body */}
          <div className="p-6 flex flex-col gap-3 flex-1">
            <h3 className="font-display font-semibold text-2xl text-secondary leading-snug">
              {project.name}
            </h3>
            <div className="flex items-center gap-1.5 text-muted text-sm">
              <svg className="w-3.5 h-3.5 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              {project.area}, {project.city} · {project.configuration}
            </div>
            <p className="text-muted text-sm leading-relaxed">{project.description}</p>

            {/* Size variant pills */}
            {project.sizeVariants && (
              <div className="flex gap-2 flex-wrap mt-1">
                {project.sizeVariants.map((v) => (
                  <span key={v.label}
                    className="bg-surface text-secondary text-xs px-2.5 py-1 rounded-full
                               border border-gray-200 font-mono-detail">
                    {v.carpetArea || v.superBuiltUp}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
              <div>
                {project.reraId && project.reraId !== '—' && (
                  <p className="text-muted text-xs font-mono-detail truncate max-w-[160px]">{project.reraId}</p>
                )}
                <p className="text-primary font-semibold text-sm mt-0.5">{project.priceRange ?? 'Enquire for Pricing'}</p>
              </div>
              <Link
                to={`/projects/${project.id}`}
                className="btn-press inline-flex items-center gap-2 bg-primary text-white
                           text-sm font-semibold px-4 py-2 rounded-full hover:bg-primary-dark
                           transition-colors duration-300"
              >
                View Details
                <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                  <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const [status, setStatus] = useState('All')

  const filtered = useMemo(
    () => projects.filter((p) => status === 'All' || p.status === status),
    [status]
  )

  return (
    <main className="pt-20">
      <SEO
        title="Residential Projects in Patna & Ranchi | Apartments & Flats"
        description="Explore all residential projects by Mamta Estates — premium apartments and flats in Patna and Ranchi. Ongoing, completed, and upcoming RERA-registered housing projects in Bihar."
        keywords="residential projects Patna, apartments Patna, flats Patna, 3 BHK Patna, housing projects Bihar, RERA projects Patna, new flats Patna, real estate projects Bihar, buy apartment Patna"
        canonical="/projects"
      />
      {/* ── Page Hero with parallax-ready overlay ─────────────────── */}
      <section
        className="relative h-64 md:h-80 flex items-end overflow-hidden"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80')", backgroundSize: 'cover', backgroundPosition: 'center 30%' }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-secondary/50 to-secondary/20" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-10 w-full">
          <motion.nav
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="text-white/50 text-sm mb-2 flex items-center gap-2"
          >
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-white">Projects</span>
          </motion.nav>
          <motion.h1
            initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.65, delay: 0.1, ease: EASE }}
            className="font-display font-bold text-4xl md:text-5xl text-white"
          >
            Our Projects
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.22, ease: EASE }}
            className="text-white/65 mt-2"
          >
            7 projects across Patna &amp; Ranchi — completed, ongoing &amp; upcoming
          </motion.p>
        </div>
      </section>

      {/* ── Filter bar ────────────────────────────────────────────── */}
      <section className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-[72px] z-30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-3 flex-wrap">
          <span className="text-muted text-sm mr-2">Filter:</span>
          {STATUSES.map((s) => (
            <motion.button
              key={s}
              onClick={() => setStatus(s)}
              whileTap={{ scale: 0.96 }}
              className={`px-5 py-1.5 rounded-full text-sm font-medium border transition-all duration-300 ${
                status === s
                  ? 'bg-primary border-primary text-white shadow-sm'
                  : 'border-gray-300 text-secondary hover:border-primary hover:text-primary'
              }`}
            >
              {s}
            </motion.button>
          ))}
          <span className="ml-auto text-muted text-sm font-mono-detail">
            {filtered.length} project{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>
      </section>

      {/* ── Grid ──────────────────────────────────────────────────── */}
      <section className="py-16 bg-surface">
        <div className="max-w-5xl mx-auto px-6">
          {filtered.length === 0 ? (
            <div className="text-center py-24 text-muted">
              <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-5">
                <svg className="w-7 h-7 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8" strokeWidth="1.5" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-4.35-4.35" />
                </svg>
              </div>
              <p className="text-lg font-medium text-secondary">No projects match this filter.</p>
              <button
                onClick={() => setStatus('All')}
                className="btn-press mt-4 text-primary font-semibold hover:underline"
              >
                Show all projects
              </button>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filtered.map((p) => <ProjectCard key={p.id} project={p} />)}
              </motion.div>
            </AnimatePresence>
          )}

          {/* RERA disclaimer */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mt-12 bg-white rounded-2xl border border-gray-200 p-5 text-xs text-muted leading-relaxed"
          >
            <strong className="text-secondary">Regulatory Disclosure:</strong> Both projects are duly registered
            with the Bihar Real Estate Regulatory Authority (Bihar RERA).
            Shivam Residency: <span className="font-mono-detail">BRERAP00125-1/347/R-124/2018</span>.
            Hari Enclave: <span className="font-mono-detail">BRERAP00125-2/15/R-1539/2023</span>.
            All information provided is subject to terms and conditions. Prices, specifications, and availability
            are subject to change without prior notice.
          </motion.div>
        </div>
      </section>
    </main>
  )
}
