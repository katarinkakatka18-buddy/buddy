import { Link } from 'react-router-dom'

function Stars({ rating }) {
  return (
    <span className="inline-flex items-center gap-1 text-amber-500">
      <span aria-hidden>★</span>
      <span className="text-stone-700 font-medium">{rating.toFixed(1)}</span>
    </span>
  )
}

export default function ProviderCard({ provider }) {
  const initials = provider.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)

  return (
    <Link
      to={`/poskytovatel/${provider.id}`}
      className="group flex flex-col rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 text-brand-700 font-bold">
            {initials}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-semibold text-stone-900">{provider.name}</h3>
              {provider.verified && (
                <span title="Overený poskytovateľ" className="text-brand-600">✓</span>
              )}
            </div>
            <p className="text-sm text-stone-500">{provider.subcategory}</p>
          </div>
        </div>
        {provider.tier === 'premium' && (
          <span className="rounded-full bg-coral-50 px-2 py-1 text-xs font-semibold text-coral-600">
            Premium
          </span>
        )}
      </div>

      <p className="mt-3 text-sm text-stone-600 line-clamp-2">{provider.bio}</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {provider.tags.slice(0, 2).map((tag) => (
          <span key={tag} className="rounded-full bg-stone-100 px-2.5 py-1 text-xs text-stone-600">
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-stone-100 pt-3 text-sm">
        <Stars rating={provider.rating} />
        <span className="text-stone-400">({provider.reviews} hodnotení)</span>
      </div>
      <div className="mt-2 flex items-center justify-between text-sm">
        <span className="text-stone-500">📍 {provider.location}</span>
        <span className="font-semibold text-brand-700">
          od {provider.priceFrom} € {provider.priceUnit}
        </span>
      </div>
    </Link>
  )
}
