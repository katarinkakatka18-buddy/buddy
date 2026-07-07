import { Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Catalog from './pages/Catalog.jsx'
import ProviderProfile from './pages/ProviderProfile.jsx'
import AddListing from './pages/AddListing.jsx'
import Pricing from './pages/Pricing.jsx'
import About from './pages/About.jsx'
import PostJob from './pages/PostJob.jsx'
import CityHub from './pages/CityHub.jsx'

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/katalog" element={<Catalog />} />
          <Route path="/poskytovatel/:id" element={<ProviderProfile />} />
          <Route path="/registracia" element={<AddListing />} />
          <Route path="/cennik" element={<Pricing />} />
          <Route path="/o-nas" element={<About />} />
          <Route path="/pridat-poziadavku" element={<PostJob />} />
          <Route path="/mesto/:citySlug" element={<CityHub />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
