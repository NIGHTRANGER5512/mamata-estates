import { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import SEO from '../components/SEO'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
}

// Maps a project id prefix → contact form subject value
const PROJECT_TO_SUBJECT = {
  'hari':   'premium-enclave',
  'shivam': 'emerald-enclave',
  'kailasam': 'upcoming',
}

export default function Contact() {
  const [searchParams] = useSearchParams()
  const { register, handleSubmit, reset, setValue, formState: { errors, isSubmitting } } = useForm()

  // Pre-fill subject when arriving from a project "Enquire" link (?project=hari-enclave-…)
  useEffect(() => {
    const proj = searchParams.get('project')
    if (!proj) return
    const match = Object.keys(PROJECT_TO_SUBJECT).find(k => proj.includes(k))
    if (match) setValue('subject', PROJECT_TO_SUBJECT[match])
  }, [searchParams, setValue])

  const onSubmit = async (data) => {
    try {
      const res = await fetch('/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(data),
      })
      const result = await res.json()
      if (result.success) {
        toast.success(result.message || "Message sent! We'll respond within 24 hours.")
        reset()
      } else {
        toast.error(result.message || 'Something went wrong. Please try again.')
      }
    } catch {
      toast.error('Could not reach server. Check your connection or WhatsApp us directly.')
    }
  }

  const contactCards = [
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
        </svg>
      ),
      title: 'Call Us',
      detail: '+91 [Contact Number]',
      sub: 'Mon–Sat · 9:00 AM – 6:00 PM',
      href: 'tel:+91XXXXXXXXXX',
    },
    {
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 32 32" fill="currentColor">
          <path d="M16.003 2.667C8.636 2.667 2.667 8.636 2.667 16c0 2.353.638 4.56 1.751 6.464L2.667 29.333l7.077-1.73A13.27 13.27 0 0 0 16.003 29.333c7.364 0 13.33-5.969 13.33-13.333 0-7.364-5.966-13.333-13.33-13.333Zm0 24.267a11.01 11.01 0 0 1-5.594-1.528l-.4-.238-4.198 1.027 1.055-4.092-.262-.42A10.957 10.957 0 0 1 5.003 16c0-6.074 4.926-11 11-11s11 4.926 11 11-4.926 11-11 11Zm6.04-8.213c-.33-.165-1.955-.962-2.258-1.073-.304-.11-.524-.165-.745.165-.22.33-.855 1.073-1.048 1.293-.193.22-.386.248-.716.083-.33-.165-1.393-.513-2.652-1.636-.98-.874-1.641-1.953-1.834-2.283-.193-.33-.021-.508.145-.673.15-.148.33-.386.496-.58.165-.193.22-.33.33-.55.11-.22.055-.413-.028-.58-.083-.165-.745-1.793-1.02-2.455-.269-.645-.542-.557-.745-.568l-.635-.01c-.22 0-.578.083-.88.413-.303.33-1.155 1.128-1.155 2.752s1.183 3.192 1.348 3.412c.165.22 2.329 3.558 5.643 4.99.789.34 1.404.543 1.883.695.79.25 1.51.215 2.079.13.635-.094 1.955-.8 2.232-1.572.276-.772.276-1.434.193-1.572-.083-.138-.303-.22-.634-.386Z"/>
        </svg>
      ),
      title: 'WhatsApp',
      detail: '+91 [WhatsApp Number]',
      sub: 'Chat with us instantly',
      href: 'https://wa.me/91XXXXXXXXXX?text=' + encodeURIComponent('Hello! I am interested in properties listed by Mamta Estates. Could you please help me?'),
      external: true,
      whatsapp: true,
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
      ),
      title: 'Email Us',
      detail: 'info@mamataestates.in',
      sub: 'We reply within 24 hours',
      href: 'mailto:info@mamataestates.in',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
        </svg>
      ),
      title: 'Visit Us',
      detail: 'Boring Road, Patna',
      sub: 'Boring Road, Patna, Bihar – 800001',
      href: 'https://maps.google.com/?q=Boring+Road+Patna+Bihar',
    },
  ]

  return (
    <main className="pt-20">
      <SEO
        title="Contact Mamta Estates | Property Enquiry in Patna, Bihar"
        description="Contact Mamta Estates for property enquiries, site visit bookings, or pricing information. Email or visit our team on Boring Road, Patna, Bihar."
        keywords="contact real estate Patna, property enquiry Patna, book site visit Patna, real estate office Boring Road Patna, Mamta Estates contact"
        canonical="/contact"
      />
      {/* Hero */}
      <section
        className="relative h-56 md:h-64 flex items-end bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80')" }}
      >
        <div className="absolute inset-0 bg-secondary/65" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-10 w-full">
          <nav className="text-white/50 text-sm mb-2 flex items-center gap-2">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Contact</span>
          </nav>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-white">Get In Touch</h1>
        </div>
      </section>

      {/* Quick contact cards */}
      <section className="bg-primary py-10">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {contactCards.map((card, i) => (
            <motion.a
              key={card.title}
              href={card.href}
              target={card.external ? '_blank' : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center gap-4 bg-white/10 hover:bg-white/20 rounded-xl p-5 text-white transition-colors"
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0
                ${card.whatsapp ? 'bg-[#25D366]' : 'bg-white/20'}`}>
                {card.icon}
              </div>
              <div>
                <p className="font-semibold text-base">{card.title}</p>
                <p className="text-white/90 text-sm">{card.detail}</p>
                <p className="text-white/60 text-xs">{card.sub}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Form + Office */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Form */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
              className="lg:col-span-3 bg-white rounded-2xl p-8 shadow-sm border border-gray-200"
            >
              <motion.h2 variants={fadeUp} className="font-display font-bold text-3xl text-secondary mb-2">
                Send Us a Message
              </motion.h2>
              <motion.p variants={fadeUp} className="text-muted text-sm mb-6">
                Interested in a project or have a general inquiry? Our team responds within 24 hours.
              </motion.p>
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                {/* Honeypot — visually hidden, never filled by real users.
                    Bots that auto-fill all inputs will populate this, letting
                    the server silently discard the submission. */}
                <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, overflow: 'hidden' }}>
                  <input {...register('_hp')} tabIndex={-1} autoComplete="off" />
                </div>
                <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-secondary text-sm font-medium mb-1.5">Full Name *</label>
                    <input
                      {...register('name', { required: 'Name is required' })}
                      placeholder="Rajesh Kumar"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-secondary text-sm font-medium mb-1.5">Phone Number *</label>
                    <div className="flex">
                      <span className="border border-r-0 border-gray-300 rounded-l-lg px-3 flex items-center text-muted text-sm bg-gray-50">+91</span>
                      <input
                        {...register('phone', {
                          required: 'Phone is required',
                          pattern: { value: /^[6-9]\d{9}$/, message: 'Enter valid 10-digit number' },
                        })}
                        placeholder="9876543210"
                        maxLength={10}
                        className="w-full border border-gray-300 rounded-r-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                  </div>
                </motion.div>

                <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-secondary text-sm font-medium mb-1.5">Email Address</label>
                    <input
                      {...register('email', {
                        pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter valid email' },
                      })}
                      placeholder="you@email.com"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>
                  <div>
                    <label className="block text-secondary text-sm font-medium mb-1.5">Subject *</label>
                    <select
                      {...register('subject', { required: 'Please select a subject' })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-secondary focus:outline-none focus:border-primary transition-colors"
                    >
                      <option value="">Select subject...</option>
                      <option value="premium-enclave">Premium Enclave – New AG Colony</option>
                      <option value="emerald-enclave">Emerald Enclave – New Mahavir Colony</option>
                      <option value="upcoming">Upcoming Signature Project</option>
                      <option value="general">General Inquiry</option>
                      <option value="other">Other / Business</option>
                    </select>
                    {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
                  </div>
                </motion.div>

                <motion.div variants={fadeUp}>
                  <label className="block text-secondary text-sm font-medium mb-1.5">Your Message</label>
                  <textarea
                    {...register('message', { minLength: { value: 5, message: 'Message too short' } })}
                    placeholder="Tell us what you're looking for..."
                    rows={5}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                </motion.div>

                <motion.div variants={fadeUp}>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3.5 rounded-full transition-all duration-200 disabled:opacity-60 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending...
                      </>
                    ) : 'Send Message'}
                  </button>
                </motion.div>
              </form>
            </motion.div>

            {/* Office info */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm"
              >
                <h3 className="font-display font-semibold text-xl text-secondary mb-4">Registered Office</h3>
                <div className="flex flex-col gap-4 text-sm">
                  {[
                    { icon: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z', text: 'Boring Road, Patna, Bihar – 800001', href: null },
                    { icon: 'M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z', text: '+91 [Contact Number]', href: 'tel:+91XXXXXXXXXX' },
                    { icon: 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z', text: 'info@mamataestates.in', href: 'mailto:info@mamataestates.in' },
                    { icon: 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z', text: 'Mon–Sat: 9:00 AM – 6:00 PM', href: null },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3">
                      <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d={item.icon} />
                      </svg>
                      {item.href ? (
                        <a href={item.href} className="text-secondary/80 hover:text-primary transition-colors">{item.text}</a>
                      ) : (
                        <span className="text-secondary/80">{item.text}</span>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Google Maps embed */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm"
              >
                <iframe
                  title="Mamta Estates Office Location"
                  src="https://maps.google.com/maps?q=Boring+Road,+Patna,+Bihar+800001&output=embed&z=15"
                  width="100%"
                  height="200"
                  style={{ border: 0, display: 'block' }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="strict-origin"
                />
                <a
                  href="https://maps.google.com/?q=Boring+Road+Patna+Bihar+800001"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 bg-white hover:bg-gray-50
                             text-primary text-xs font-semibold transition-colors border-t border-gray-100"
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  Open in Google Maps
                </a>
              </motion.div>

              {/* CIN Box */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="bg-secondary/5 rounded-2xl p-5 border border-gray-200"
              >
                <p className="text-xs text-muted uppercase tracking-widest mb-2">Company Identity</p>
                <p className="font-mono-detail text-secondary text-xs">Mamta Estates</p>
                <p className="font-mono-detail text-secondary text-xs mt-1">Boring Road, Patna, Bihar – 800001</p>
                <p className="font-mono-detail text-secondary text-xs mt-1">info@mamataestates.in</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
