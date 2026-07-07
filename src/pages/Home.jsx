import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { CATEGORIES } from '../data/categories.js'
import { useProviders } from '../hooks/useProviders.js'
import { LOCATIONS } from '../data/locations.js'
import { slugify } from '../utils/slug.js'
import ProviderCard from '../components/ProviderCard.jsx'
import Mascot from '../components/Mascot.jsx'
import { SITE } from '../data/site.js'

const FEATURED_CITIES = [
  'Bratislava - Staré Mesto',
  'Bratislava - Ružinov',
  'Bratislava - Petržalka',
  'Bratislava - Nové Mesto',
  'Bratislava - Karlova Ves',
  'Bratislava - Dúbravka',
  'Pezinok',
  'Senec',
]

export default function Home() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const { providers } = useProviders()
  const featured = providers.filter((p) => p.tier === 'premium').slice(0, 3)

  function handleSearch(e) {
    e.preventDefault()
    navigate(`/katalog${query ? `?q=${encodeURIComponent(query)}` : ''}`)
  }

  return (
    <div>
      <section className="bg-gradient-to-b from-brand-50 to-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24 text-center">
          <Mascot size={72} className="mx-auto" />
          <span className="mt-4 inline-block rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700">
            Bratislava a Bratislavský kraj
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight text-stone-900">
            Odborník príde <span className="text-brand-600">za vami</span>.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-stone-600">
            {SITE.heroSubtitle}
          </p>

          <form onSubmit={handleSearch} className="mx-auto mt-8 flex max-w-lg gap-2">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Napr. inštalatér, upratovanie, mejkap…"
              className="flex-1 rounded-full border border-stone-300 px-5 py-3 text-sm shadow-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            />
            <button className="rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-700 transition-colors">
              Vyhľadať
            </button>
          </form>

          <div className="mx-auto mt-3 max-w-lg text-sm text-stone-500">
            Nevieš presne koho hľadať?{' '}
            <Link to="/pridat-poziadavku" className="font-semibold text-brand-700 hover:underline">
              Pridaj požiadavku
            </Link>{' '}
            a poskytovatelia sa ozvú sami.
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.slice(0, 6).map((c) => (
              <Link
                key={c.id}
                to={`/katalog?kategoria=${c.id}`}
                className="rounded-full border border-stone-200 bg-white px-3 py-1.5 text-xs font-medium text-stone-600 hover:border-brand-300 hover:text-brand-700"
              >
                {c.icon} {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-stone-900">Kategórie služieb</h2>
          <Link to="/katalog" className="text-sm font-semibold text-brand-700 hover:underline">
            Zobraziť katalóg →
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {CATEGORIES.map((c) => (
            <Link
              key={c.id}
              to={`/katalog?kategoria=${c.id}`}
              className="group flex flex-col items-center gap-2 rounded-2xl border border-stone-200 bg-white p-4 text-center shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="text-2xl">{c.icon}</div>
              <h3 className="text-sm font-semibold text-stone-900">{c.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-stone-50 py-14">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-bold text-stone-900">Ako to funguje</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {[
              ['1', 'Popíš, čo potrebuješ', 'Pridaj požiadavku alebo si rovno prezri katalóg podľa kategórie a lokality.'],
              ['2', 'Porovnaj ponuky', 'Pozri si hodnotenia, ceny a profily overených poskytovateľov.'],
              ['3', 'Dohodni sa', 'Kontaktuj poskytovateľa priamo a dohodni si termín u seba.'],
            ].map(([n, title, desc]) => (
              <div key={n} className="rounded-2xl bg-white p-6 shadow-sm">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
                  {n}
                </div>
                <h3 className="mt-3 font-semibold text-stone-900">{title}</h3>
                <p className="mt-1 text-sm text-stone-500">{desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              to="/pridat-poziadavku"
              className="inline-block rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-700"
            >
              Pridať požiadavku
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-stone-900">Odporúčaní poskytovatelia</h2>
          <Link to="/katalog" className="text-sm font-semibold text-brand-700 hover:underline">
            Zobraziť všetkých →
          </Link>
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <ProviderCard key={p.id} provider={p} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-2xl font-bold text-stone-900">Dostupné v Bratislave a okolí</h2>
        <p className="mt-2 text-stone-600">
          Buddy postupne rastie po celom Bratislavskom kraji – toto sú lokality, kde nás nájdeš už teraz.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {FEATURED_CITIES.map((city) => (
            <Link
              key={city}
              to={`/mesto/${slugify(city)}`}
              className="rounded-full border border-stone-200 bg-white px-3.5 py-1.5 text-sm text-stone-600 hover:border-brand-300 hover:text-brand-700"
            >
              {city}
            </Link>
          ))}
          <Link
            to="/katalog"
            className="rounded-full border border-dashed border-stone-300 px-3.5 py-1.5 text-sm text-stone-500 hover:border-brand-300 hover:text-brand-700"
          >
            + všetkých {LOCATIONS.length} lokalít
          </Link>
        </div>
      </section>

      <section className="bg-brand-700 py-14">
        <div className="mx-auto max-w-4xl px-4 text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold">Poskytuješ služby v Bratislave a okolí?</h2>
          <p className="mt-3 text-brand-50">
            Zaregistruj sa zadarmo a získaj nových klientov. Bez rizika, bez záväzkov.
          </p>
          <Link
            to="/registracia"
            className="mt-6 inline-block rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-700 shadow-sm hover:bg-brand-50"
          >
            Zaregistrovať sa zadarmo
          </Link>
        </div>
      </section>
    </div>
  )
}
