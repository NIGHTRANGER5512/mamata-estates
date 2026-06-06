import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

const EASE_DRAWER = [0.32, 0.72, 0, 1]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  // Only go transparent on the home page (which has a full-bleed dark hero)
  const isHome = location.pathname === '/'
  const isTransparent = isHome && !scrolled

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    // Re-evaluate immediately on route change
    setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [location.pathname])

  useEffect(() => { setMenuOpen(false) }, [location])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 pt-5 pointer-events-none">
        <motion.div
          animate={isTransparent ? 'top' : 'scrolled'}
          variants={{
            top: {
              backgroundColor: 'rgba(28, 28, 28, 0.00)',
              boxShadow: [
                'inset 0 0px 0 rgba(255,255,255,0.00)',
                'inset 0 0px 0 rgba(0,0,0,0.00)',
                '0 0 0 0px rgba(255,255,255,0.00)',
                '0 0px 0px rgba(0,0,0,0.00)',
                '0 0px 0px rgba(0,0,0,0.00)',
              ].join(', '),
            },
            scrolled: {
              backgroundColor: 'rgba(247, 243, 238, 0.72)',
              boxShadow: [
                'inset 0 1.5px 0 rgba(255,255,255,0.82)',  // top specular highlight
                'inset 0 -1px 0 rgba(0,0,0,0.05)',          // bottom grounding edge
                '0 0 0 1px rgba(255,255,255,0.46)',          // glass border
                '0 8px 40px rgba(0,0,0,0.10)',              // elevation shadow
                '0 2px 10px rgba(0,0,0,0.07)',              // close shadow
              ].join(', '),
            },
          }}
          transition={{ duration: 0.45, ease: EASE_DRAWER }}
          className="pointer-events-auto w-full max-w-5xl rounded-full overflow-hidden relative isolation-isolate"
          style={{
            backdropFilter: isTransparent ? 'blur(0px) saturate(100%)' : 'blur(32px) saturate(175%) brightness(1.02)',
            WebkitBackdropFilter: isTransparent ? 'blur(0px) saturate(100%)' : 'blur(32px) saturate(175%) brightness(1.02)',
          }}
        >
          {/* Liquid glass diagonal gloss sheen — fades in with the glass */}
          <motion.div
            aria-hidden
            animate={{ opacity: isTransparent ? 0 : 1 }}
            transition={{ duration: 0.45, ease: EASE_DRAWER }}
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: 'linear-gradient(148deg, rgba(255,255,255,0.24) 0%, rgba(255,255,255,0.06) 38%, rgba(255,255,255,0.00) 58%, rgba(255,255,255,0.04) 100%)',
              zIndex: 0,
            }}
          />

          {/* Navbar content — sits above gloss layer */}
          <div className="relative flex items-center justify-between px-5 py-3" style={{ zIndex: 1 }}>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
              <div className={`rounded-xl transition-all duration-300 ${isTransparent ? 'bg-white/15 backdrop-blur-sm p-1' : ''}`}>
                <img
                  src="/logo.png"
                  alt="Mamta Estates"
                  className="h-9 w-auto object-contain"
                />
              </div>
              <div className="leading-tight">
                <span className={`font-display font-bold text-base block transition-colors duration-300
                  ${isTransparent ? 'text-white' : 'text-secondary'}`}>
                  Mamta Estates
                </span>
                <span className={`text-[10px] tracking-[0.15em] uppercase block transition-colors duration-300
                  ${isTransparent ? 'text-white/60' : 'text-muted'}`}>
                  Boring Road, Patna
                </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-7">
              {links.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `text-sm font-medium tracking-wide relative pb-0.5 transition-colors duration-200
                    ${isTransparent
                      ? isActive ? 'text-primary' : 'text-white/90 hover:text-white'
                      : isActive ? 'text-primary' : 'text-secondary hover:text-primary'
                    }
                    ${isActive ? 'after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-primary after:rounded-full' : ''}`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </nav>

            {/* CTA + hamburger */}
            <div className="flex items-center gap-3">
              <Link
                to="/contact"
                className={`btn-press hidden md:inline-flex items-center gap-2 text-sm font-semibold
                           px-4 py-2 rounded-full transition-colors duration-200
                           ${isTransparent
                             ? 'bg-white/15 border border-white/30 text-white hover:bg-white/25'
                             : 'bg-primary text-white hover:bg-primary-dark'}`}
              >
                Get a Quote
                <span className="w-5 h-5 rounded-full bg-black/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </span>
              </Link>

              {/* Morphing hamburger */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className={`md:hidden relative w-9 h-9 flex flex-col items-center justify-center gap-[5px]
                           rounded-full btn-press transition-colors duration-200
                           ${!isTransparent || menuOpen ? 'hover:bg-black/[0.06]' : 'hover:bg-white/10'}`}
                aria-label="Toggle menu"
              >
                <motion.span
                  animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3, ease: EASE_DRAWER }}
                  className={`block w-[18px] h-px rounded-full transition-colors duration-300
                             ${!isTransparent || menuOpen ? 'bg-secondary' : 'bg-white'}`}
                />
                <motion.span
                  animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.18 }}
                  className={`block w-[14px] h-px rounded-full self-start ml-[9px] transition-colors duration-300
                             ${!isTransparent || menuOpen ? 'bg-secondary' : 'bg-white'}`}
                />
                <motion.span
                  animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3, ease: EASE_DRAWER }}
                  className={`block w-[18px] h-px rounded-full transition-colors duration-300
                             ${!isTransparent || menuOpen ? 'bg-secondary' : 'bg-white'}`}
                />
              </button>
            </div>

          </div>{/* /content */}
        </motion.div>
      </header>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE_DRAWER }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center liquid-glass-dark"
            style={{ backdropFilter: 'blur(48px) saturate(150%)', WebkitBackdropFilter: 'blur(48px) saturate(150%)', background: 'rgba(16, 14, 12, 0.88)' }}
          >
            <nav className="flex flex-col items-center gap-10">
              {links.map(({ to, label }, i) => (
                <motion.div
                  key={to}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: i * 0.07 + 0.08, duration: 0.45, ease: EASE_DRAWER }}
                >
                  <NavLink
                    to={to}
                    end={to === '/'}
                    className={({ isActive }) =>
                      `font-display text-[2.5rem] font-semibold leading-none transition-colors
                      ${isActive ? 'text-primary' : 'text-white hover:text-primary'}`
                    }
                  >
                    {label}
                  </NavLink>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: links.length * 0.07 + 0.12, duration: 0.45, ease: EASE_DRAWER }}
                className="mt-2"
              >
                <Link
                  to="/contact"
                  className="btn-press inline-flex items-center gap-2 bg-primary text-white
                             font-semibold px-8 py-3.5 rounded-full"
                >
                  Get a Quote
                  <span className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </span>
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function BuildingIcon({ transparent }) {
  return (
    <svg
      className={`w-8 h-8 flex-shrink-0 transition-colors duration-300 ${transparent ? 'text-white' : 'text-primary'}`}
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M1 22V9l7-4v2l6-4v19H1zm2-2h2v-2H3v2zm0-4h2v-2H3v2zm0-4h2v-2H3v2zm4 8h2v-2H7v2zm0-4h2v-2H7v2zm0-4h2v-2H7v2zm0-4h2V8L7 9.5V10zm4 12h2v-2h-2v2zm0-4h2v-2h-2v2zm0-4h2v-2h-2v2zm0-4h2V6l-2 1.33V10zm4 12h2v-2h-2v2zm0-4h2v-2h-2v2zm0-4h2v-2h-2v2zm0-4h2V6l-2 1.33V10z" />
    </svg>
  )
}
