import { useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { projects } from '../data/projects'
import GallerySlider from '../components/GallerySlider'
import SEO from '../components/SEO'

const EASE = [0.23, 1, 0.32, 1]

export default function ProjectDetail() {
  const { id } = useParams()
  const project = projects.find((p) => p.id === id)
  if (!project) return <Navigate to="/projects" replace />

  const hasFloorPlans  = project.floorPlans && Object.keys(project.floorPlans).length > 0
  const [show3d, setShow3d] = useState(false)

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()

  const onSubmit = async (data) => {
    try {
      const res = await fetch('/api/enquiry', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ ...data, projectId: project.id }),
      })
      const result = await res.json()
      if (result.success) {
        toast.success(result.message || 'Enquiry sent! Our team will call you within 4 hours.')
        reset()
      } else {
        toast.error(result.message || 'Something went wrong. Please try again.')
      }
    } catch {
      toast.error('Could not reach server. Please call or WhatsApp us directly.')
    }
  }

  const handleBrochure = () => {
    if (project.brochureUrl) {
      const link = document.createElement('a')
      link.href     = project.brochureUrl
      link.download = `${project.name} Brochure.pdf`
      link.click()
    }
    // null brochureUrl renders a different button — no handler needed
  }

  // Only show RERA if a real registration ID exists (not placeholder '—' or in-progress text)
  const hasRera = project.reraId && project.reraId !== '—' && !project.reraId.toLowerCase().includes('progress') && !project.reraId.toLowerCase().includes('registration')

  // Helper — suppress a spec card when the value is a placeholder '—' or missing
  const val = (v) => (v && v !== '—' ? v : null)

  const specs = [
    val(project.totalUnits)  && { icon: <HouseIcon />, label: 'Total Units',   value: project.totalUnits },
    { icon: <GridIcon />,  label: 'Configuration', value: project.configuration },
    val(project.totalArea)   && { icon: <RulerIcon />, label: 'Total Area',    value: project.totalArea },
    { icon: <CalIcon />,   label: 'Possession',    value: project.possessionDate },
    hasRera                  && { icon: <DocIcon />,  label: 'RERA ID',        value: project.reraId, mono: true },
    val(project.priceRange)  && project.priceRange !== 'Pre-launch Pricing — Enquire' && { icon: <CoinIcon />, label: 'Price Range', value: project.priceRange },
    val(project.floors)      && { icon: <BuildIcon />, label: 'Floors',       value: project.floors },
    { icon: <CarIcon />,   label: 'Parking',       value: project.parking },
  ].filter(Boolean)

  const statusBg    = project.status === 'Completed' ? 'bg-green-100 text-green-700'
                    : project.status === 'Upcoming'   ? 'bg-blue-100 text-blue-700'
                    : 'bg-orange-100 text-orange-700'
  const statusLabel = project.status === 'Completed' ? 'Ready to Move'
                    : project.status === 'Upcoming'   ? 'Launching Soon'
                    : 'Under Construction'
  const statusDot   = project.status === 'Completed' ? '✓'
                    : project.status === 'Upcoming'   ? '◈'
                    : '◎'

  return (
    <>
    <main className="pt-20">
      <SEO
        title={`${project.name} — ${project.configuration || ''} Apartments in ${project.area}, ${project.city}`}
        description={project.overview?.substring(0, 155) || project.description}
        keywords={`${project.name}, ${project.configuration || 'apartments'} in ${project.city}, ${project.area} ${project.city}, real estate ${project.city}, RERA registered flats ${project.city}, buy flat ${project.area} ${project.city}, Mamta Estates ${project.city}`}
        canonical={`/projects/${project.id}`}
        image={project.images?.[0]}
      />

      {/* ── Breadcrumb ─────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-2 text-sm text-muted">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <svg className="w-3 h-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <Link to="/projects" className="hover:text-primary transition-colors">Projects</Link>
          <svg className="w-3 h-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-secondary font-medium">{project.name}</span>
        </div>
      </div>

      {/* ── Booking Open banner ────────────────────────────────── */}
      {project.bookingOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="overflow-hidden"
        >
          <div className="bg-gradient-to-r from-primary via-primary/90 to-primary/80 text-white">
            <div className="max-w-7xl mx-auto px-6 py-3 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3 flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-60" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
                </span>
                <p className="font-semibold text-sm md:text-base">
                  {project.status === 'Upcoming'
                    ? 'Pre-Launch Bookings Open — Construction starting in 2 months. Secure your unit at special pre-launch pricing.'
                    : 'Bookings Open — Limited units remaining. Register your interest today.'}
                </p>
              </div>
              <a
                href="#enquiry-form"
                className="flex-shrink-0 bg-white text-primary font-semibold text-xs px-4 py-2 rounded-full hover:bg-white/90 transition-colors"
              >
                Book Now
              </a>
            </div>
          </div>
        </motion.div>
      )}

      {/* ── Gallery ────────────────────────────────────────────── */}
      <section className="bg-secondary py-8">
        <div className="max-w-7xl mx-auto px-6">
          <GallerySlider images={project.images} alt={project.name} />
        </div>
      </section>

      {/* ── Status bar ─────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap gap-4 items-center text-sm">
          <span className={`px-3 py-1 rounded-full font-semibold ${statusBg}`}>
            {statusDot} {statusLabel}
          </span>
          {project.bookingOpen && (
            <span className="px-3 py-1 rounded-full font-semibold bg-primary/10 text-primary flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              Booking Open
            </span>
          )}
          <span className="text-muted">Configuration: <strong className="text-secondary">{project.configuration}</strong></span>
          {project.reraId && project.reraId !== '—' && !project.reraId.includes('Progress') && (
            <span className="text-muted font-mono text-xs">RERA: {project.reraId}</span>
          )}
          <span className="text-muted">Possession: <strong className="text-secondary">{project.possessionDate}</strong></span>
        </div>
      </div>

      {/* ── Content ────────────────────────────────────────────── */}
      <section className="py-12 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* Left column */}
            <div className="lg:col-span-2 flex flex-col gap-10">

              {/* Title */}
              <div>
                <h1 className="font-display font-bold text-3xl md:text-4xl text-secondary mb-2">{project.name}</h1>
                <div className="flex flex-wrap gap-2 text-sm text-muted">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                    {project.area}, {project.city}
                  </span>
                  <span>· {project.type}</span>
                </div>
              </div>

              {/* Overview */}
              <div>
                <h2 className="font-display font-semibold text-xl text-secondary mb-3">Project Overview</h2>
                <p className="text-secondary/70 leading-relaxed">{project.overview}</p>
              </div>

              {/* Key Specs */}
              <div>
                <h2 className="font-display font-semibold text-xl text-secondary mb-4">Key Specifications</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {specs.map((s) => (
                    <div key={s.label} className="bg-white rounded-xl p-4 border border-gray-200 flex flex-col gap-1">
                      <span className="w-8 h-8 text-primary">{s.icon}</span>
                      <span className="text-muted text-xs">{s.label}</span>
                      <span className={`text-secondary font-semibold text-sm break-words ${s.mono ? 'font-mono text-[10px]' : ''}`}>
                        {s.value ?? '—'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price enquiry card — shown when no price is listed */}
              {!val(project.priceRange) && (
                <div className="bg-white rounded-2xl border border-primary/20 p-6 flex flex-col md:flex-row md:items-center gap-5">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <CoinIcon />
                      <span className="font-display font-semibold text-lg text-secondary">Pricing on Request</span>
                    </div>
                    <p className="text-muted text-sm leading-relaxed">
                      Pricing for this project is available on enquiry. Get in touch with our team for a complete cost breakdown, payment plan, and availability.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                    <a
                      href="#enquiry-form"
                      className="inline-flex items-center justify-center gap-2 bg-primary text-white font-semibold text-sm px-5 py-3 rounded-full hover:bg-primary/90 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Fill Enquiry Form
                    </a>
                    <a
                      href={`https://wa.me/91XXXXXXXXXX?text=${encodeURIComponent(`Hi! I'm interested in ${project.name} at ${project.area}, ${project.city}. Please share the pricing details.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-semibold text-sm px-5 py-3 rounded-full hover:bg-[#22c55e] transition-colors"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      Chat on WhatsApp
                    </a>
                  </div>
                </div>
              )}

              {/* Unit Sizes */}
              {project.sizeVariants && (
                <div>
                  <h2 className="font-display font-semibold text-xl text-secondary mb-4">Unit Sizes</h2>
                  <div className="flex flex-wrap gap-3">
                    {project.sizeVariants.map((v) => (
                      <div key={v.label} className="bg-white rounded-xl border border-gray-200 px-5 py-4 flex flex-col gap-1">
                        <span className="text-muted text-xs">{v.label}</span>
                        <span className="text-secondary font-bold text-lg font-mono">
                          {v.carpetArea || v.superBuiltUp}
                        </span>
                        <span className="text-muted text-xs">{v.carpetArea ? 'Carpet Area' : 'Super Built-Up'}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Amenities */}
              <div>
                <h2 className="font-display font-semibold text-xl text-secondary mb-4">Amenities</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {project.amenities.map((a) => (
                    <div key={a} className="flex items-center gap-2 bg-white rounded-xl px-3 py-2.5 border border-gray-200 text-sm text-secondary">
                      <svg className="w-4 h-4 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                      <span className="text-xs">{a}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Nearby */}
              {project.nearby && (
                <div>
                  <h2 className="font-display font-semibold text-xl text-secondary mb-4">Location Highlights</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {project.nearby.map((n) => (
                      <div key={n.label} className="flex items-start gap-2 bg-white rounded-xl px-3 py-3 border border-gray-200">
                        <svg className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                        </svg>
                        <div>
                          <p className="text-secondary text-xs font-medium">{n.label}</p>
                          <p className="text-muted text-xs">{n.distance}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Structural Consultants */}
              {project.structuralConsultants && (
                <div className="bg-secondary/5 rounded-xl border border-gray-200 p-5">
                  <h3 className="font-semibold text-secondary mb-2 text-sm">Structural Consultants</h3>
                  <p className="text-muted text-sm">{project.structuralConsultants}</p>
                </div>
              )}

              {/* Floor Plans — opens each plan in a new tab */}
              {hasFloorPlans && (
                <div>
                  <h2 className="font-display font-semibold text-xl text-secondary mb-4">Floor Plans</h2>
                  <div className="flex flex-col gap-3">
                    {Object.entries(project.floorPlans).map(([label, url]) => (
                      <a
                        key={label}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 bg-white border border-gray-200 hover:border-primary
                                   rounded-xl px-5 py-3.5 transition-all duration-200 group"
                      >
                        {/* Blueprint icon */}
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                          <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round"
                              d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"/>
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-secondary font-semibold text-sm">{label}</p>
                          <p className="text-muted text-xs mt-0.5">Click to view</p>
                        </div>
                        {/* Open icon */}
                        <svg className="w-4 h-4 text-muted group-hover:text-primary transition-colors flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Brochure + 3D Model buttons row */}
              <div className="flex flex-wrap items-center gap-3">

                {/* Brochure download / coming soon */}
                {!project.hideBrochure && (
                  <>
                    {project.brochureUrl ? (
                      <motion.button
                        onClick={handleBrochure}
                        whileTap={{ scale: 0.97 }}
                        className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-full hover:bg-primary-dark transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Download Brochure
                      </motion.button>
                    ) : (
                      <div className="inline-flex items-center gap-3 border border-dashed border-primary/40 bg-primary/5 text-secondary px-6 py-3 rounded-full">
                        <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm">
                          <span className="font-semibold text-secondary">Brochure coming soon</span>
                          <span className="text-muted ml-1.5">— good things take time</span>
                        </span>
                      </div>
                    )}
                  </>
                )}

                {/* 3D / AR button — only for projects that have an AR page */}
                {project.arPageUrl && (
                  <motion.button
                    onClick={() => setShow3d(true)}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 border-2 border-secondary text-secondary font-semibold px-6 py-3 rounded-full hover:bg-secondary hover:text-white transition-colors duration-200"
                  >
                    {/* Cube icon */}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                      <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                      <line x1="12" y1="22.08" x2="12" y2="12"/>
                    </svg>
                    View in 3D / AR
                  </motion.button>
                )}

              </div>
            </div>

            {/* Right column — sticky enquiry form */}
            <div className="lg:col-span-1" id="enquiry-form">
              <div
                className="sticky top-24 rounded-2xl overflow-hidden"
                style={{
                  background: 'rgba(255, 253, 250, 0.85)',
                  backdropFilter: 'blur(28px) saturate(160%) brightness(1.01)',
                  WebkitBackdropFilter: 'blur(28px) saturate(160%) brightness(1.01)',
                  boxShadow: [
                    'inset 0 1.5px 0 rgba(255,255,255,0.90)',
                    'inset 0 -1px 0 rgba(0,0,0,0.04)',
                    '0 0 0 1px rgba(193,68,14,0.08)',
                    '0 12px 48px rgba(0,0,0,0.10)',
                    '0 3px 12px rgba(0,0,0,0.07)',
                  ].join(', '),
                }}
              >

                {project.bookingOpen && (
                  <div className="bg-primary px-6 py-2.5 flex items-center gap-2">
                    <span className="relative flex h-2 w-2 flex-shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-60" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                    </span>
                    <p className="text-white text-xs font-semibold tracking-wide uppercase">
                      {project.status === 'Upcoming' ? 'Pre-Launch — Book Now' : 'Booking Open'}
                    </p>
                  </div>
                )}

                <div className="p-6">
                  <h3 className="font-display font-bold text-xl text-secondary mb-1">Enquire About This Project</h3>
                  <p className="text-muted text-sm mb-5">Our team will get back to you within 24 hours.</p>

                  <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    {/* Honeypot anti-spam trap */}
                    <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, overflow: 'hidden' }}>
                      <input {...register('_hp')} tabIndex={-1} autoComplete="off" />
                    </div>
                    <div>
                      <input
                        {...register('name', { required: 'Name is required' })}
                        placeholder="Your Name *"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>

                    <div>
                      <div className="flex">
                        <span className="border border-r-0 border-gray-300 rounded-l-lg px-3 flex items-center text-muted text-sm bg-gray-50">+91</span>
                        <input
                          {...register('phone', {
                            required: 'Phone is required',
                            pattern: { value: /^[6-9]\d{9}$/, message: 'Enter valid 10-digit number' },
                          })}
                          placeholder="Phone Number *"
                          maxLength={10}
                          className="w-full border border-gray-300 rounded-r-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                        />
                      </div>
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                    </div>

                    <div>
                      <input
                        {...register('email', {
                          pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter valid email' },
                        })}
                        placeholder="Email Address"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>

                    <div>
                      <textarea
                        {...register('message')}
                        placeholder="Your Message"
                        rows={3}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileTap={{ scale: 0.97 }}
                      className="bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-full transition-all duration-200 disabled:opacity-60"
                    >
                      {isSubmitting ? 'Sending…' : 'Send Enquiry'}
                    </motion.button>
                  </form>

                  <div className="mt-5 pt-4 border-t border-gray-100 text-center">
                    <p className="text-muted text-xs mb-2">Or call / WhatsApp us directly</p>
                    <a href="mailto:info@mamataestates.in" className="text-primary font-semibold text-sm hover:underline">
                      info@mamataestates.in
                    </a>
                    <div className="mt-3">
                      <Link
                        to={`/contact?project=${project.id}`}
                        className="text-xs text-muted hover:text-primary transition-colors underline underline-offset-2"
                      >
                        Use the full contact form instead
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>

      {/* ── 3D / AR Viewer Modal ──────────────────────────────────────── */}
      <AnimatePresence>
        {show3d && project.arPageUrl && (
          <motion.div
            key="ar-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[1000] flex flex-col bg-black"
          >
            {/* Top bar */}
            <div
              className="flex items-center justify-between px-4 py-3 flex-shrink-0"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.10)', background: 'rgba(10,9,8,0.95)' }}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                    <line x1="12" y1="22.08" x2="12" y2="12"/>
                  </svg>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm leading-tight">{project.name} — 3D / AR View</p>
                  <p className="text-white/40 text-xs">Drag to rotate · Pinch to zoom · AR on mobile</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {/* Open in new tab */}
                <a
                  href={project.arPageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Open in new tab"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                {/* Close */}
                <motion.button
                  onClick={() => setShow3d(false)}
                  whileTap={{ scale: 0.93 }}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Close viewer"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>
            </div>

            {/* Iframe — the full apartment-ar experience.
                sandbox: scripts + same-origin (needed for WebXR/A-Frame) +
                popups (needed for AR launch on iOS). Top-navigation is
                intentionally omitted so the frame cannot redirect the parent. */}
            <iframe
              src={project.arPageUrl}
              title={`${project.name} — 3D AR View`}
              className="flex-1 w-full border-0"
              allow="camera; xr-spatial-tracking; accelerometer; gyroscope"
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
              allowFullScreen
              referrerPolicy="strict-origin"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>  // fragment end
  )
}

/* ── Inline SVG icon components ───────────────────────────────────── */
const IC = 'w-5 h-5'
function HouseIcon() { return <svg className={IC} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.7}><path strokeLinecap="round" strokeLinejoin="round" d="M3 9.75L12 3l9 6.75V21a.75.75 0 01-.75.75H15.75v-6h-7.5v6H3.75A.75.75 0 013 21V9.75z"/></svg> }
function GridIcon()  { return <svg className={IC} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.7}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg> }
function RulerIcon() { return <svg className={IC} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.7}><path strokeLinecap="round" strokeLinejoin="round" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 000-1.41l-2.34-2.34a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg> }
function CalIcon()   { return <svg className={IC} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.7}><rect x="3" y="4" width="18" height="18" rx="2"/><path strokeLinecap="round" d="M16 2v4M8 2v4M3 10h18"/></svg> }
function DocIcon()   { return <svg className={IC} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.7}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6M5 3h14a2 2 0 012 2v16l-3-2-2 2-2-2-2 2-2-2-3 2V5a2 2 0 012-2z"/></svg> }
function CoinIcon()  { return <svg className={IC} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.7}><circle cx="12" cy="12" r="9"/><path strokeLinecap="round" d="M12 7v1m0 8v1M9.5 9.5C9.5 8.4 10.6 7.5 12 7.5s2.5.9 2.5 2-.9 1.8-2.5 2c-1.6.2-2.5 1-2.5 2s1.1 2 2.5 2 2.5-.9 2.5-2"/></svg> }
function BuildIcon() { return <svg className={IC} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.7}><path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M9 21V9l3-6 3 6v12M5 21V13H3m18 8V13h-2"/></svg> }
function CarIcon()   { return <svg className={IC} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.7}><path strokeLinecap="round" strokeLinejoin="round" d="M5 17H3v-5l2-5h14l2 5v5h-2m-9 0h4M7 17a2 2 0 100-4 2 2 0 000 4zm10 0a2 2 0 100-4 2 2 0 000 4z"/></svg> }
