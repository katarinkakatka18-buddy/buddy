import { Link, useParams } from 'react-router-dom'
import { LOCATIONS } from '../data/locations.js'
import { useProviders } from '../hooks/useProviders.js'
import { slugify } from '../utils/slug.js'
import ProviderCard from '../components/ProviderCard.jsx'

export default function CityHub() {
  const { citySlug } = useParams()
  const location = LOCATIONS.find((l) => slugify(l) === citySlug)
  const { providers: allProviders } = useProviders()

  if (!location) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <p className="text-stone-600">Túto lokalitu sa nepodarilo nájsť.</p>
        <Link to="/katalog" className="mt-4 inline-block text-brand-700 font-semibold hover:underline">
          ← Späť do katalógu
        </Link>
      </div>
    )
  }

  const providers = allProviders.filter((p) => p.location === location).sort(
    (a, b) => (b.tier === 'premium') - (a.tier === 'premium') || b.rating - a.rating
  )

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Link to="/katalog" className="text-sm font-semibold text-brand-700 hover:underline">
        ← Všetky lokality
      </Link>
      <h1 className="mt-3 text-2xl font-bold text-stone-900">Overení odborníci – {location}</h1>
      <p className="mt-2 text-stone-600">
        {providers.length > 0
          ? `${providers.length} poskytovateľov aktuálne ponúka služby v lokalite ${location}.`
          : `Zatiaľ tu nemáme registrovaného poskytovateľa – buď prvý.`}
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {providers.map((p) => (
          <ProviderCard key={p.id} provider={p} />
        ))}
      </div>

      {providers.length === 0 && (
        <div className="mt-6 rounded-2xl border border-dashed border-stone-300 p-8 text-center">
          <p className="text-stone-600">Poskytuješ služby v {location}?</p>
          <Link
            to="/registracia"
            className="mt-3 inline-block rounded-full bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
          >
            Zaregistruj sa zadarmo
          </Link>
        </div>
      )}
    </div>
  )
}
