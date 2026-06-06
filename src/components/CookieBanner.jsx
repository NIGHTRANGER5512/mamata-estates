import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const STORAGE_KEY = 'ta_cookie_consent'

const CookieIcon = () => (
  <svg
    className="w-6 h-6 flex-shrink-0 text-primary"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M21.93 10.46A10 10 0 0 1 12 22 10 10 0 0 1 2 12a10 10 0 0 1 9.54-9.98 1 1 0 0 1 1 1.18 2 2 0 0 0 2.01 2.41 1 1 0 0 1 .93 1.35 2 2 0 0 0 2.52 2.52 1 1 0 0 1 1.35.93 2 2 0 0 0 2.41 2.01 1 1 0 0 1 1.17 1.04zM9 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2-3a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm5 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm3-2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
  </svg>
)

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return

    const timer = setTimeout(() => {
      setVisible(true)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  function handleAccept() {
    localStorage.setItem(STORAGE_KEY, 'accepted')
    setVisible(false)
  }

  function handleDecline() {
    localStorage.setItem(STORAGE_KEY, 'declined')
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="cookie-banner"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/[0.09]"
          style={{
            background: 'rgba(13, 11, 10, 0.80)',
            backdropFilter: 'blur(40px) saturate(160%)',
            WebkitBackdropFilter: 'blur(40px) saturate(160%)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 -4px 32px rgba(0,0,0,0.30)',
          }}
        >
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
              {/* Icon + text */}
              <div className="flex items-start md:items-center gap-3 flex-1 min-w-0">
                <CookieIcon />
                <div className="min-w-0">
                  <p className="text-white font-semibold text-sm leading-tight">
                    We use cookies
                  </p>
                  <p className="text-white/55 text-xs mt-0.5 leading-relaxed">
                    We use only essential functional cookies to keep the website working correctly — no tracking or advertising cookies.{' '}
                    <Link
                      to="/privacy-policy"
                      className="text-primary hover:text-primary/80 underline underline-offset-2 transition-colors"
                      onClick={() => setVisible(false)}
                    >
                      Learn more in our Privacy Policy.
                    </Link>
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-3 flex-shrink-0">
                <button
                  onClick={handleDecline}
                  className="text-white/60 hover:text-white text-sm transition-colors px-2 py-1.5"
                >
                  Decline
                </button>
                <button
                  onClick={handleAccept}
                  className="bg-primary hover:bg-primary/90 text-white text-sm font-semibold px-5 py-2 rounded-full transition-colors duration-200 whitespace-nowrap"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
