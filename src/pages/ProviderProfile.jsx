import { Link, useParams } from 'react-router-dom'
import { useProviders } from '../hooks/useProviders.js'
import { CATEGORY_MAP } from '../data/categories.js'
import { SITE } from '../data/site.js'

export default function ProviderProfile() {
  const { id } = useParams()
  const { providers } = useProviders()
  const provider = providers.find((p) => p.id === id)

  if (!provider) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <p className="text-stone-600">Poskytovateľa sa nepodarilo nájsť.</p>
        <Link to="/katalog" className="mt-4 inline-block text-brand-700 font-semibold hover:underline">
          ← Späť do katalógu
        </Link>
      </div>
    )
  }

  const category = CATEGORY_MAP[provider.category]
  const initials = provider.name.split(' ').map((n) => n[0]).join('').slice(0, 2)

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Link to="/katalog" className="text-sm font-semibold text-brand-700 hover:underline">
        ← Späť do katalógu
      </Link>

      <div className="mt-4 rounded-2xl border border-stone-200 bg-white p-6 sm:p-8 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-100 text-xl font-bold text-brand-700">
              {initials}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-stone-900">{provider.name}</h1>
                {provider.verified && <span className="text-brand-600" title="Overený poskytovateľ">✓</span>}
              </div>
              <p className="text-stone-500">{category.icon} {provider.subcategory} · {category.name}</p>
              <p className="text-sm text-stone-500">📍 {provider.location}</p>
            </div>
          </div>
          {provider.tier === 'premium' && (
            <span className="rounded-full bg-coral-50 px-3 py-1 text-xs font-semibold text-coral-600">Premium</span>
          )}
        </div>

        <div className="mt-6 flex items-center gap-6 border-y border-stone-100 py-4 text-sm">
          <span className="inline-flex items-center gap-1 text-amber-500 font-medium">
            ★ <span className="text-stone-800">{provider.rating.toFixed(1)}</span>
          </span>
          <span className="text-stone-500">{provider.reviews} hodnotení</span>
          <span className="font-semibold text-brand-700">od {provider.priceFrom} € {provider.priceUnit}</span>
        </div>

        <h2 className="mt-6 font-semibold text-stone-900">O poskytovateľovi</h2>
        <p className="mt-2 text-stone-600">{provider.bio}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {provider.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-stone-100 px-3 py-1 text-xs text-stone-600">{tag}</span>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href={`mailto:${SITE.contactEmail}?subject=Zaujem o sluzbu - ${encodeURIComponent(provider.name)}`}
            className="flex-1 rounded-full bg-brand-600 px-6 py-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-brand-700"
          >
            Kontaktovať poskytovateľa
          </a>
          <span className="flex-1 rounded-full border border-stone-200 px-6 py-3 text-center text-sm text-stone-500">
            Presnú cenu si dohodnete priamo s poskytovateľom
          </span>
        </div>
      </div>
    </div>
  )
}
