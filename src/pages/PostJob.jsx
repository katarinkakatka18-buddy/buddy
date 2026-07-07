import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CATEGORIES } from '../data/categories.js'
import { LOCATIONS } from '../data/locations.js'
import { useProviders } from '../hooks/useProviders.js'
import ProviderCard from '../components/ProviderCard.jsx'
import Mascot from '../components/Mascot.jsx'

const initialForm = { title: '', description: '', category: '', location: '', showPhone: true }

export default function PostJob() {
  const [form, setForm] = useState(initialForm)
  const [submitted, setSubmitted] = useState(false)
  const { providers: allProviders } = useProviders()

  function update(field) {
    return (e) => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setForm((f) => ({ ...f, [field]: value }))
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    let matches = allProviders.filter(
      (p) => p.category === form.category && p.location === form.location
    )
    if (matches.length === 0) matches = allProviders.filter((p) => p.category === form.category)
    if (matches.length === 0) matches = allProviders.filter((p) => p.tier === 'premium')
    matches = matches.slice(0, 3)

    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <div className="text-center">
          <Mascot size={64} className="mx-auto" />
          <h1 className="mt-3 text-2xl font-bold text-stone-900">Požiadavka odoslaná!</h1>
          <p className="mt-2 text-stone-600">
            Toto je zatiaľ ukážková simulácia bez skutočného prepojenia na poskytovateľov – v ostrej verzii
            by teraz dostali notifikáciu presne tí, ktorí zodpovedajú kategórii a lokalite. Takto by mohli
            vyzerať prvé ponuky:
          </p>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {matches.map((p) => (
            <ProviderCard key={p.id} provider={p} />
          ))}
        </div>

        {matches.length === 0 && (
          <p className="mt-6 text-center text-stone-500">
            Pre túto kombináciu kategórie a lokality zatiaľ nemáme poskytovateľa v ukážkových dátach.
          </p>
        )}

        <div className="mt-8 text-center">
          <Link to="/katalog" className="text-sm font-semibold text-brand-700 hover:underline">
            Alebo si prezri celý katalóg →
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-bold text-stone-900">Pridaj požiadavku</h1>
      <p className="mt-2 text-stone-600">
        Popíš, čo potrebuješ, a overení poskytovatelia z Bratislavy a okolia sa ti ozvú s ponukou.
        Zadanie požiadavky je zadarmo a nezáväzné.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <div>
          <label className="text-sm font-medium text-stone-700">Čo potrebuješ?</label>
          <input
            required
            value={form.title}
            onChange={update('title')}
            className="mt-1 w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            placeholder="Napr. Oprava kvapkajúceho kohútika"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-stone-700">Kategória</label>
            <select
              required
              value={form.category}
              onChange={update('category')}
              className="mt-1 w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm outline-none focus:border-brand-500"
            >
              <option value="">Vyber kategóriu</option>
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-stone-700">Lokalita</label>
            <select
              required
              value={form.location}
              onChange={update('location')}
              className="mt-1 w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm outline-none focus:border-brand-500"
            >
              <option value="">Vyber lokalitu</option>
              {LOCATIONS.map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-stone-700">Podrobnejší popis</label>
          <textarea
            required
            rows={4}
            value={form.description}
            onChange={update('description')}
            className="mt-1 w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            placeholder="Čím viac detailov, tým presnejšiu ponuku dostaneš (rozsah práce, termín, poschodie…)."
          />
        </div>

        <label className="flex items-center gap-2 text-sm text-stone-600">
          <input type="checkbox" checked={form.showPhone} onChange={update('showPhone')} className="h-4 w-4 rounded border-stone-300" />
          Zobraziť moje telefónne číslo poskytovateľom, ktorí odpovedia
        </label>

        <button className="w-full rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-700">
          Odoslať požiadavku
        </button>
      </form>
    </div>
  )
}
