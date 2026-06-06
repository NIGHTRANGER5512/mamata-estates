import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const EASE = [0.23, 1, 0.32, 1]

// Direction-aware slide variants
const slideVariants = {
  enter: (dir) => ({
    x: dir > 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 1.04,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (dir) => ({
    x: dir > 0 ? '-60%' : '60%',
    opacity: 0,
    scale: 0.97,
  }),
}

function ChevronLeft() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  )
}

function ChevronRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M9 18l6-6-6-6" />
    </svg>
  )
}

export default function GallerySlider({ images = [], alt = 'Project' }) {
  const [[index, direction], setPage] = useState([0, 0])

  const paginate = useCallback((dir) => {
    setPage(([cur]) => {
      const next = (cur + dir + images.length) % images.length
      return [next, dir]
    })
  }, [images.length])

  const goTo = useCallback((i) => {
    setPage(([cur]) => [i, i > cur ? 1 : -1])
  }, [])

  if (!images.length) return null

  return (
    <div className="flex flex-col gap-3">

      {/* ── Main viewer ─────────────────────────────────────────── */}
      <div className="relative rounded-2xl overflow-hidden h-72 md:h-[480px] bg-gray-100 group select-none">

        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.img
            key={index}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.55, ease: EASE }}
            src={images[index]}
            alt={`${alt} — ${index + 1}`}
            className="absolute inset-0 w-full h-full object-cover"
            drag={images.length > 1 ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) paginate(1)
              else if (info.offset.x > 60) paginate(-1)
            }}
          />
        </AnimatePresence>

        {/* Gradient overlays for visual depth */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/10 via-transparent to-transparent" />

        {/* ── Prev / Next arrows ─────────────────────────────── */}
        {images.length > 1 && (
          <>
            <motion.button
              onClick={() => paginate(-1)}
              whileTap={{ scale: 0.92 }}
              className="
                absolute left-3 top-1/2 -translate-y-1/2 z-10
                w-10 h-10 rounded-full flex items-center justify-center
                bg-white/90 backdrop-blur-sm text-secondary shadow-lg
                opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0
                transition-all duration-300 ease-out
                hover:bg-white hover:shadow-xl
              "
              aria-label="Previous image"
            >
              <ChevronLeft />
            </motion.button>

            <motion.button
              onClick={() => paginate(1)}
              whileTap={{ scale: 0.92 }}
              className="
                absolute right-3 top-1/2 -translate-y-1/2 z-10
                w-10 h-10 rounded-full flex items-center justify-center
                bg-white/90 backdrop-blur-sm text-secondary shadow-lg
                opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0
                transition-all duration-300 ease-out
                hover:bg-white hover:shadow-xl
              "
              aria-label="Next image"
            >
              <ChevronRight />
            </motion.button>
          </>
        )}

        {/* ── Pill dot indicators ─────────────────────────────── */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to image ${i + 1}`}
                className="rounded-full transition-all duration-300"
                style={{
                  width:           i === index ? 24 : 7,
                  height:          7,
                  backgroundColor: i === index ? '#fff' : 'rgba(255,255,255,0.45)',
                }}
              />
            ))}
          </div>
        )}

        {/* ── Counter badge ────────────────────────────────────── */}
        {images.length > 1 && (
          <div className="absolute top-4 right-4 z-10 bg-black/50 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full font-medium tracking-wide">
            {index + 1} / {images.length}
          </div>
        )}
      </div>

      {/* ── Thumbnail strip ─────────────────────────────────────── */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-0.5" style={{ scrollbarWidth: 'none' }}>
          {images.map((img, i) => (
            <motion.button
              key={i}
              onClick={() => goTo(i)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className={`
                flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden
                transition-all duration-300
                ${i === index
                  ? 'ring-2 ring-primary ring-offset-1 opacity-100'
                  : 'ring-1 ring-gray-200 opacity-50 hover:opacity-80'
                }
              `}
              aria-label={`View image ${i + 1}`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" draggable={false} />
            </motion.button>
          ))}
        </div>
      )}
    </div>
  )
}
