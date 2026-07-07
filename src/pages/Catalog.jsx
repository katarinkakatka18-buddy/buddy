import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CATEGORIES } from '../data/categories.js'
import { LOCATIONS } from '../data/locations.js'
import { useProviders } from '../hooks/useProviders.js'
import ProviderCard from '../components/ProviderCard.jsx'

export default function Catalog() {
  const [params, setParams] = useSearchParams()
  const [query, setQuery] = useState(params.get('q') || '')
  const [category, setCategory] = useState(params.get('kategoria') || '')
  const [location, setLocation] = useState('')
  const { providers } = useProviders()

  const filtered = useMemo(() => {
    return providers.filter((p) => {
      const matchesQuery =
        !query ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.subcategory.toLowerCase().includes(query.toLowerCase()) ||
        p.bio.toLowerCase().includes(query.toLowerCase())
      const matchesCategory = !category || p.category === category
      const matchesLocation = !location || p.location === location
      return matchesQuery && matchesCategory && matchesLocation
    }).sort((a, b) => (b.tier === 'premium') - (a.tier === 'premium') || b.rating - a.rating)
  }, [query, category, location, providers])

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-bold text-stone-900">Nájdi odborníka v Bratislave a okolí</h1>

      <div className="mt-6 grid gap-3 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm sm:grid-cols-4">
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setParams((p) => {
              if (e.target.value) p.set('q', e.target.value)
              else p.delete('q')
              return p
            })
          }}
          placeholder="Hľadať službu alebo meno…"
          className="sm:col-span-2 rounded-xl border border-stone-300 px-4 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-xl border border-stone-300 px-4 py-2.5 text-sm outline-none focus:border-brand-500"
        >
          <option value="">Všetky kategórie</option>
          {CATEGORIES.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="rounded-xl border border-stone-300 px-4 py-2.5 text-sm outline-none focus:border-brand-500"
        >
          <option value="">Celý Bratislavský kraj</option>
          {LOCATIONS.map((l) => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>
      </div>

      <p className="mt-4 text-sm text-stone-500">{filtered.length} poskytovateľov zodpovedá filtru</p>

      <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <ProviderCard key={p.id} provider={p} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-10 rounded-2xl border border-dashed border-stone-300 p-10 text-center text-stone-500">
          Pre tento filter sme nenašli žiadneho poskytovateľa. Skús zmeniť kategóriu alebo lokalitu.
        </div>
      )}
    </div>
  )
}
