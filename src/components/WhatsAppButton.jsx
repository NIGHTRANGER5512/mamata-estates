import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// WhatsApp number for chat redirect — update WA_NUMBER with Mamta Estates' WhatsApp
const WA_NUMBER  = '91XXXXXXXXXX'   // TODO: replace with actual WhatsApp number
const WA_MESSAGE = encodeURIComponent(
  'Hello! I am interested in properties listed by Mamta Estates. Could you please share more details?'
)
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false)
  const [tooltip, setTooltip] = useState(false)

  // Appear after 4 s — well after the page loader and hero animations settle
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 4000)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          className="fixed bottom-6 right-6 z-[900] flex items-center gap-3"
          style={{ pointerEvents: 'auto' }}
        >
          {/* Tooltip */}
          <AnimatePresence>
            {tooltip && (
              <motion.div
                initial={{ opacity: 0, x: 12, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 8, scale: 0.95 }}
                transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                className="text-white text-xs font-semibold px-4 py-2.5 rounded-full
                           whitespace-nowrap select-none"
                style={{
                  background: 'rgba(18, 16, 14, 0.82)',
                  backdropFilter: 'blur(20px) saturate(160%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(160%)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.10), 0 4px 20px rgba(0,0,0,0.35)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                Chat on WhatsApp
                {/* Tail */}
                <span className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-0 h-0
                                  border-t-[6px] border-t-transparent
                                  border-b-[6px] border-b-transparent
                                  border-l-[7px]"
                      style={{ borderLeftColor: 'rgba(18, 16, 14, 0.82)' }} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Button */}
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with us on WhatsApp"
            onMouseEnter={() => setTooltip(true)}
            onMouseLeave={() => setTooltip(false)}
            className="relative w-14 h-14 rounded-full flex items-center justify-center
                       shadow-[0_8px_32px_rgba(37,211,102,0.40)] focus:outline-none
                       focus-visible:ring-2 focus-visible:ring-[#25D366]"
            style={{ backgroundColor: '#25D366' }}
          >
            {/* Pulse ring */}
            <span className="absolute inset-0 rounded-full animate-ping opacity-30"
              style={{ backgroundColor: '#25D366' }} />

            {/* WhatsApp SVG */}
            <svg
              viewBox="0 0 32 32"
              className="w-8 h-8 relative z-10"
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M16.003 2.667C8.636 2.667 2.667 8.636 2.667 16c0 2.353.638 4.56 1.751 6.464L2.667 29.333l7.077-1.73A13.27 13.27 0 0 0 16.003 29.333c7.364 0 13.33-5.969 13.33-13.333 0-7.364-5.966-13.333-13.33-13.333Zm0 24.267a11.01 11.01 0 0 1-5.594-1.528l-.4-.238-4.198 1.027 1.055-4.092-.262-.42A10.957 10.957 0 0 1 5.003 16c0-6.074 4.926-11 11-11s11 4.926 11 11-4.926 11-11 11Zm6.04-8.213c-.33-.165-1.955-.962-2.258-1.073-.304-.11-.524-.165-.745.165-.22.33-.855 1.073-1.048 1.293-.193.22-.386.248-.716.083-.33-.165-1.393-.513-2.652-1.636-.98-.874-1.641-1.953-1.834-2.283-.193-.33-.021-.508.145-.673.15-.148.33-.386.496-.58.165-.193.22-.33.33-.55.11-.22.055-.413-.028-.58-.083-.165-.745-1.793-1.02-2.455-.269-.645-.542-.557-.745-.568l-.635-.01c-.22 0-.578.083-.88.413-.303.33-1.155 1.128-1.155 2.752s1.183 3.192 1.348 3.412c.165.22 2.329 3.558 5.643 4.99.789.34 1.404.543 1.883.695.79.25 1.51.215 2.079.13.635-.094 1.955-.8 2.232-1.572.276-.772.276-1.434.193-1.572-.083-.138-.303-.22-.634-.386Z"/>
            </svg>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
