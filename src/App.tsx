import { Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import Library from './pages/Library'
import Dataset from './pages/Dataset'
import About from './pages/About'
import Training from './pages/Training'
import Contact from './pages/Contact'
import Contribute from './pages/Contribute'
import Releases from './pages/Releases'
import News from './pages/News'
import Events from './pages/Events'
import Privacy from './pages/Privacy'

const MapPage = lazy(() => import('./pages/MapPage'))

export default function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/library" element={<Library />} />
        <Route path="/dataset/:slug" element={<Dataset />} />
        <Route
          path="/map"
          element={
            <Suspense fallback={<div className="page section"><div className="container muted">Loading map…</div></div>}>
              <MapPage />
            </Suspense>
          }
        />
        <Route path="/training" element={<Training />} />
        <Route path="/about" element={<About />} />
        <Route path="/contribute" element={<Contribute />} />
        <Route path="/releases" element={<Releases />} />
        <Route path="/news" element={<News />} />
        <Route path="/events" element={<Events />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </>
  )
}
