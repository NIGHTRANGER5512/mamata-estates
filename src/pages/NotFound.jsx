import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'

const EASE = [0.23, 1, 0.32, 1]

export default function NotFound() {
  return (
    <main className="min-h-[100dvh] flex flex-col items-center justify-center bg-surface px-6 text-center">
      <SEO title="Page Not Found" noIndex />

      {/* Big 404 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="relative select-none mb-2"
      >
        <span
          className="font-display font-bold text-[clamp(6rem,20vw,14rem)] leading-none
                     text-secondary/[0.06] tracking-tighter"
        >
          404
        </span>
        {/* Floating label over the big number */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
            <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
        </div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.55, ease: EASE }}
        className="font-display font-bold text-3xl md:text-4xl text-secondary mb-3"
      >
        Page Not Found
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.22, duration: 0.55, ease: EASE }}
        className="text-muted text-base max-w-md leading-relaxed mb-8"
      >
        The page you're looking for doesn't exist or has been moved. Let's get you back on track.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5, ease: EASE }}
        className="flex flex-col sm:flex-row items-center gap-3"
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white
                     font-semibold px-7 py-3 rounded-full transition-colors duration-200"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Go Home
        </Link>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 border border-secondary/20 hover:border-secondary/40
                     text-secondary font-semibold px-7 py-3 rounded-full transition-colors duration-200"
        >
          View Projects
        </Link>
      </motion.div>
    </main>
  )
}
