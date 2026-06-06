import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const EASE = [0.23, 1, 0.32, 1]

/* ── Shimmer skeleton row ──────────────────────────────────────────── */
function SkeletonBar({ width = '100%', height = 12, delay = 0, opacity = 1 }) {
  return (
    <div
      style={{ width, height, opacity, animationDelay: `${delay}s` }}
      className="rounded-full bg-white/10 skeleton-shimmer"
    />
  )
}

export default function PageLoader() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 2400)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="page-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.015 }}
          transition={{ duration: 0.65, ease: EASE }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#1C1C1C] overflow-hidden"
        >
          {/* Subtle radial glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 60% 45% at 50% 50%, rgba(193,68,14,0.12) 0%, transparent 70%)',
            }}
          />

          {/* Center content */}
          <div className="relative flex flex-col items-center gap-6 px-8 max-w-lg w-full text-center">

            {/* Logo — white card so brand colours show on dark background */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.7, ease: EASE }}
              className="bg-white rounded-2xl px-5 py-3 shadow-xl"
            >
              <img
                src="/logo.png"
                alt="Tribhuvan Awas"
                className="h-14 w-auto object-contain"
              />
            </motion.div>

            {/* Divider line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.7, ease: EASE }}
              className="w-8 h-px bg-primary origin-left"
            />

            {/* Motto — line 1 */}
            <div className="flex flex-col items-center gap-1">
              <motion.p
                initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ delay: 0.45, duration: 0.8, ease: EASE }}
                className="font-display font-semibold italic text-white"
                style={{ fontSize: 'clamp(1.6rem, 5vw, 2.5rem)', lineHeight: 1.2, letterSpacing: '-0.01em' }}
              >
                Sapna ho Sakaar Aapka,
              </motion.p>

              {/* Motto — line 2 */}
              <motion.p
                initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ delay: 0.6, duration: 0.8, ease: EASE }}
                className="font-display font-semibold italic text-primary"
                style={{ fontSize: 'clamp(1.6rem, 5vw, 2.5rem)', lineHeight: 1.2, letterSpacing: '-0.01em' }}
              >
                Ek Ghar ho Apna Aapka
              </motion.p>
            </div>

            {/* Tagline translation */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6, ease: EASE }}
              className="text-white/30 text-xs tracking-widest uppercase"
            >
              Your dream, your home — since 2004
            </motion.p>

            {/* Skeleton shimmer bars */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.5, ease: EASE }}
              className="w-full flex flex-col gap-3 mt-4"
            >
              <SkeletonBar width="75%" height={10} delay={0} />
              <SkeletonBar width="100%" height={10} delay={0.08} />
              <SkeletonBar width="58%" height={10} delay={0.16} />
              <div className="flex gap-3 mt-2">
                <SkeletonBar width="45%" height={32} delay={0.24} />
                <SkeletonBar width="45%" height={32} delay={0.32} />
              </div>
            </motion.div>

            {/* Loading dots */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.4 }}
              className="flex items-center gap-1.5"
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ duration: 1.2, delay: i * 0.2, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-1.5 h-1.5 rounded-full bg-primary/60"
                />
              ))}
            </motion.div>
          </div>

          <style>{`
            @keyframes shimmer {
              0%   { background-position: -200% 0; }
              100% { background-position: 200% 0; }
            }
            .skeleton-shimmer {
              background: linear-gradient(90deg,
                rgba(255,255,255,0.06) 25%,
                rgba(255,255,255,0.12) 50%,
                rgba(255,255,255,0.06) 75%
              );
              background-size: 200% 100%;
              animation: shimmer 1.6s infinite linear;
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
