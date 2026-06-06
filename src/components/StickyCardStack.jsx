import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

/**
 * StickyCardStack — inspired by Skiper UI skiper17
 * GSAP ScrollTrigger: cards slide up while the previous card shrinks + rotates.
 *
 * Props:
 *   cards: Array<{ id, image, alt? }>
 *   className?: string
 */
export default function StickyCardStack({ cards, className = '' }) {
  const container  = useRef(null)
  const imageRefs  = useRef([])

  useGSAP(
    () => {
      const imageElements = imageRefs.current
      const totalCards    = imageElements.length

      if (!imageElements[0]) return

      // Initial positions
      gsap.set(imageElements[0], { y: '0%', scale: 1, rotation: 0 })
      for (let i = 1; i < totalCards; i++) {
        if (imageElements[i]) gsap.set(imageElements[i], { y: '100%', scale: 1, rotation: 0 })
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.sticky-cards-inner',
          start: 'top top',
          end: `+=${window.innerHeight * (totalCards - 1)}`,
          pin: true,
          scrub: 0.5,
          pinSpacing: true,
        },
      })

      for (let i = 0; i < totalCards - 1; i++) {
        const cur  = imageElements[i]
        const next = imageElements[i + 1]
        if (!cur || !next) continue

        tl.to(cur,  { scale: 0.7, rotation: 5, duration: 1, ease: 'none' }, i)
        tl.to(next, { y: '0%',                 duration: 1, ease: 'none' }, i)
      }

      const ro = new ResizeObserver(() => ScrollTrigger.refresh())
      if (container.current) ro.observe(container.current)

      return () => {
        ro.disconnect()
        tl.kill()
        ScrollTrigger.getAll().forEach(t => t.kill())
      }
    },
    { scope: container, dependencies: [cards.length] },
  )

  return (
    <div ref={container} className={`relative h-full w-full ${className}`}>
      <div className="sticky-cards-inner relative flex h-full w-full items-center justify-center overflow-hidden rounded-[2rem]">
        {/* Stack wrapper — fixed aspect ratio */}
        <div className="relative w-full h-full overflow-hidden rounded-[2rem]">
          {cards.map((card, i) => (
            <img
              key={card.id}
              src={card.image}
              alt={card.alt || ''}
              loading={i === 0 ? 'eager' : 'lazy'}
              className="absolute inset-0 h-full w-full object-cover rounded-[2rem]"
              ref={el => { imageRefs.current[i] = el }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
