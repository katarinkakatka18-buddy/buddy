import { Link } from 'react-router-dom'
import { CATEGORIES } from '../data/categories.js'
import { LOCATIONS } from '../data/locations.js'
import { slugify } from '../utils/slug.js'
import Logo from './Logo.jsx'
import { SITE } from '../data/site.js'

const FOOTER_CITIES = LOCATIONS.slice(0, 10)

export default function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-3 text-sm text-stone-500 max-w-xs">
            Overení odborníci, ktorí prídu za vami – v Bratislave a Bratislavskom kraji.
          </p>
          <p className="mt-3 text-sm text-stone-500">{SITE.contactEmail}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-stone-900">Kategórie</h3>
          <ul className="mt-3 space-y-2 text-sm text-stone-500">
            {CATEGORIES.map((c) => (
              <li key={c.id}>
                <Link to={`/katalog?kategoria=${c.id}`} className="hover:text-brand-700">{c.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-stone-900">Lokality</h3>
          <ul className="mt-3 space-y-2 text-sm text-stone-500">
            {FOOTER_CITIES.map((city) => (
              <li key={city}>
                <Link to={`/mesto/${slugify(city)}`} className="hover:text-brand-700">{city}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-stone-900">Buddy</h3>
          <ul className="mt-3 space-y-2 text-sm text-stone-500">
            <li><Link to="/pridat-poziadavku" className="hover:text-brand-700">Pridať požiadavku</Link></li>
            <li><Link to="/katalog" className="hover:text-brand-700">Nájsť odborníka</Link></li>
            <li><Link to="/registracia" className="hover:text-brand-700">Zaregistrovať sa zadarmo</Link></li>
            <li><Link to="/cennik" className="hover:text-brand-700">Cenník a Premium</Link></li>
            <li><Link to="/o-nas" className="hover:text-brand-700">O nás</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-stone-100 py-4 text-center text-xs text-stone-400">
        © {new Date().getFullYear()} Buddy. Bratislava a Bratislavský kraj.
      </div>
    </footer>
  )
}
