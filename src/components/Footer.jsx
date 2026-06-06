import { Link } from 'react-router-dom'
import { projects } from '../data/projects'

const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Our Projects' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact' },
]

const socials = [
  {
    label: 'WhatsApp',
    href: 'https://wa.me/919234682722',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.003 2.667C8.636 2.667 2.667 8.636 2.667 16c0 2.353.638 4.56 1.751 6.464L2.667 29.333l7.077-1.73A13.27 13.27 0 0 0 16.003 29.333c7.364 0 13.33-5.969 13.33-13.333 0-7.364-5.966-13.333-13.33-13.333Zm0 24.267a11.01 11.01 0 0 1-5.594-1.528l-.4-.238-4.198 1.027 1.055-4.092-.262-.42A10.957 10.957 0 0 1 5.003 16c0-6.074 4.926-11 11-11s11 4.926 11 11-4.926 11-11 11Zm6.04-8.213c-.33-.165-1.955-.962-2.258-1.073-.304-.11-.524-.165-.745.165-.22.33-.855 1.073-1.048 1.293-.193.22-.386.248-.716.083-.33-.165-1.393-.513-2.652-1.636-.98-.874-1.641-1.953-1.834-2.283-.193-.33-.021-.508.145-.673.15-.148.33-.386.496-.58.165-.193.22-.33.33-.55.11-.22.055-.413-.028-.58-.083-.165-.745-1.793-1.02-2.455-.269-.645-.542-.557-.745-.568l-.635-.01c-.22 0-.578.083-.88.413-.303.33-1.155 1.128-1.155 2.752s1.183 3.192 1.348 3.412c.165.22 2.329 3.558 5.643 4.99.789.34 1.404.543 1.883.695.79.25 1.51.215 2.079.13.635-.094 1.955-.8 2.232-1.572.276-.772.276-1.434.193-1.572-.083-.138-.303-.22-.634-.386Z"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: '#',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: '#',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: '#',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer className="bg-secondary text-white">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">

          {/* Col 1 — Brand */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="bg-white rounded-xl px-2 py-1.5 flex-shrink-0">
                <img
                  src="/logo.png"
                  alt="Tribhuvan Awas Pvt. Ltd."
                  className="h-9 w-auto object-contain"
                />
              </div>
              <div>
                <span className="font-display font-bold text-base block">Tribhuvan Awas</span>
                <span className="text-xs text-white/50 tracking-widest">PVT. LTD.</span>
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed">
              Building Homes. Delivering Trust.<br />
              Sapna ho Sakaar Aapka, Ek Ghar ho Apna Aapka.<br />
              Engineering excellence in Bihar &amp; Jharkhand since 2004.
            </p>
            <div className="flex flex-col gap-1.5">
              <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/40 text-accent text-xs font-semibold px-3 py-1.5 rounded-full w-fit">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
                </svg>
                RERA Registered
              </div>
              <p className="text-white/35 text-xs font-mono-detail">CIN: U70100BR2007PTC013168</p>
            </div>
          </div>

          {/* Col 2 — Quick Links */}
          <div>
            <h4 className="font-semibold text-white/90 mb-4 text-sm uppercase tracking-widest">Quick Links</h4>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-white/60 hover:text-primary text-sm transition-colors duration-200">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Projects + RERA */}
          <div>
            <h4 className="font-semibold text-white/90 mb-4 text-sm uppercase tracking-widest">Our Projects</h4>
            <ul className="flex flex-col gap-3">
              {projects.map((p) => (
                <li key={p.id}>
                  <Link to={`/projects/${p.id}`} className="text-white/60 hover:text-primary text-sm transition-colors duration-200 block leading-snug">
                    {p.name}
                  </Link>
                  {p.reraId && p.reraId.startsWith('BRERAP') && (
                    <span className="text-white/30 text-xs font-mono-detail">{p.reraId}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact */}
          <div>
            <h4 className="font-semibold text-white/90 mb-4 text-sm uppercase tracking-widest">Contact Us</h4>
            <ul className="flex flex-col gap-3 text-sm text-white/60">
              <li className="flex gap-2.5">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                <span>111, 1st Floor, Ashoka Place,<br />Exhibition Road, Patna – 800001</span>
              </li>
              <li className="flex gap-2.5">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
                <a href="tel:+919801056929" className="hover:text-white transition-colors">+91-9801056929</a>
              </li>
              <li className="flex gap-2.5">
                {/* WhatsApp */}
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0 flex-shrink-0" viewBox="0 0 32 32" fill="#25D366" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.003 2.667C8.636 2.667 2.667 8.636 2.667 16c0 2.353.638 4.56 1.751 6.464L2.667 29.333l7.077-1.73A13.27 13.27 0 0 0 16.003 29.333c7.364 0 13.33-5.969 13.33-13.333 0-7.364-5.966-13.333-13.33-13.333Zm0 24.267a11.01 11.01 0 0 1-5.594-1.528l-.4-.238-4.198 1.027 1.055-4.092-.262-.42A10.957 10.957 0 0 1 5.003 16c0-6.074 4.926-11 11-11s11 4.926 11 11-4.926 11-11 11Zm6.04-8.213c-.33-.165-1.955-.962-2.258-1.073-.304-.11-.524-.165-.745.165-.22.33-.855 1.073-1.048 1.293-.193.22-.386.248-.716.083-.33-.165-1.393-.513-2.652-1.636-.98-.874-1.641-1.953-1.834-2.283-.193-.33-.021-.508.145-.673.15-.148.33-.386.496-.58.165-.193.22-.33.33-.55.11-.22.055-.413-.028-.58-.083-.165-.745-1.793-1.02-2.455-.269-.645-.542-.557-.745-.568l-.635-.01c-.22 0-.578.083-.88.413-.303.33-1.155 1.128-1.155 2.752s1.183 3.192 1.348 3.412c.165.22 2.329 3.558 5.643 4.99.789.34 1.404.543 1.883.695.79.25 1.51.215 2.079.13.635-.094 1.955-.8 2.232-1.572.276-.772.276-1.434.193-1.572-.083-.138-.303-.22-.634-.386Z"/>
                </svg>
                <a href="https://wa.me/919234682722" target="_blank" rel="noopener noreferrer"
                  className="hover:text-white transition-colors">
                  WhatsApp: +91-9234682722
                </a>
              </li>
              <li className="flex gap-2.5">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                <a href="mailto:anilranjan5512@gmail.com" className="hover:text-white transition-colors break-all">
                  anilranjan5512@gmail.com
                </a>
              </li>
              <li className="flex gap-2.5">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" />
                </svg>
                <span>Mon–Sat: 9:00 AM – 6:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal disclaimer */}
        <p className="text-white/25 text-xs text-center pt-8 pb-4">
          Prices are indicative and subject to change. All images and floor plans are artistic impressions. Please refer to the RERA documents for binding information. Bihar RERA Registered Developer.
        </p>

        {/* Bottom bar */}
        <div className="pt-2 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs">
            © 2026 Tribhuvan Awas Pvt. Ltd. All rights reserved. | CIN: U70100BR2007PTC013168
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="text-white/40 hover:text-white/70 text-xs transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-white/40 hover:text-white/70 text-xs transition-colors">Terms of Use</Link>
          </div>
          <div className="flex items-center gap-3">
            {socials.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center text-white/60 hover:text-white transition-all duration-200"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
