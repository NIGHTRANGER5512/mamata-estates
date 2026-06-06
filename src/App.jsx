import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { motion, useScroll, useSpring } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import WhatsAppButton from './components/WhatsAppButton'
import PageLoader from './components/PageLoader'
import CookieBanner from './components/CookieBanner'
import Home from './pages/Home'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import About from './pages/About'
import Contact from './pages/Contact'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Terms from './pages/Terms'
import NotFound from './pages/NotFound'

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 160, damping: 30, restDelta: 0.001 })
  return (
    <motion.div
      style={{ scaleX, transformOrigin: 'left' }}
      className="fixed top-0 left-0 right-0 h-[2.5px] z-[9999] pointer-events-none"
      aria-hidden
    >
      <div className="w-full h-full" style={{ background: 'linear-gradient(90deg, #0D6245 0%, #C09508 60%, #D9B020 100%)' }} />
    </motion.div>
  )
}

function AppInner() {
  const location = useLocation()
  return (
    <>
      <ScrollProgress />
      <ScrollToTop />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: { fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '14px' },
          success: { iconTheme: { primary: '#0D6245', secondary: '#fff' } },
        }}
      />
      <Navbar />
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <WhatsAppButton />
      <CookieBanner />
    </>
  )
}

export default function App() {
  return (
    <>
      <PageLoader />
      <Router>
        <AppInner />
      </Router>
    </>
  )
}
