import { useState } from 'react'
import { CATEGORIES, CATEGORY_MAP } from '../data/categories.js'
import { LOCATIONS } from '../data/locations.js'
import Mascot from '../components/Mascot.jsx'
import { SITE } from '../data/site.js'
import { supabase, SUPABASE_ENABLED } from '../lib/supabase.js'
import { invalidateProvidersCache } from '../hooks/useProviders.js'

const initialForm = {
  name: '',
  category: '',
  location: '',
  description: '',
  phone: '',
  email: '',
}

export default function AddListing() {
  const [form, setForm] = useState(initialForm)
  const [photo, setPhoto] = useState(null)
  const [plan, setPlan] = useState('free')
  const [submitted, setSubmitted] = useState(false)
  const [saveError, setSaveError] = useState('')
  const [saving, setSaving] = useState(false)

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }))
  }

  function handlePhoto(e) {
    const file = e.target.files && e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setPhoto(reader.result)
    reader.readAsDataURL(file)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaveError('')

    if (!SUPABASE_ENABLED) {
      // Databáza ešte nie je pripojená – zobrazíme len ukážkovú rekapituláciu.
      setSubmitted(true)
      return
    }

    setSaving(true)
    const { error } = await supabase.from('providers').insert({
      name: form.name,
      category: form.category,
      subcategory: form.description.slice(0, 60),
      location: form.location,
      tier: plan,
      rating: 0,
      reviews: 0,
      price_from: 0,
      price_unit: '',
      verified: false,
      bio: form.description,
      tags: [],
      phone: form.phone,
      email: form.email,
    })
    setSaving(false)

    if (error) {
      setSaveError('Registráciu sa nepodarilo uložiť. Skús to prosím znova o chvíľu.')
      return
    }

    invalidateProvidersCache()
    setSubmitted(true)
  }

  if (submitted) {
    const category = CATEGORY_MAP[form.category]
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <Mascot size={72} className="mx-auto" />
        <h1 className="mt-4 text-2xl font-bold text-stone-900">Registrácia prijatá!</h1>
        <p className="mt-2 text-stone-600">
          {SUPABASE_ENABLED
            ? 'Tvoj profil je uložený a onedlho sa objaví v katalógu. E-mailové potvrdenie zatiaľ neposielame automaticky.'
            : 'Databáza ešte nie je pripojená, takže toto je len ukážková rekapitulácia – nič sa reálne neuložilo.'}
        </p>

        <div className="mt-6 rounded-2xl border border-stone-200 bg-white p-5 text-left shadow-sm">
          <div className="flex items-center gap-3">
            {photo ? (
              <img src={photo} alt="Profilová fotka" className="h-14 w-14 rounded-full object-cover" />
            ) : (
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-700">
                {(form.name || '?').slice(0, 2).toUpperCase()}
              </div>
            )}
            <div>
              <div className="font-semibold text-stone-900">{form.name || '—'}</div>
              <div className="text-sm text-stone-500">{category ? category.name : '—'} · {form.location || '—'}</div>
            </div>
          </div>
          <dl className="mt-4 space-y-1.5 text-sm">
            <div className="flex justify-between"><dt className="text-stone-500">Telefón</dt><dd>{form.phone || '—'}</dd></div>
            <div className="flex justify-between"><dt className="text-stone-500">E-mail</dt><dd>{form.email || '—'}</dd></div>
            <div className="flex justify-between"><dt className="text-stone-500">Balík</dt><dd>{plan === 'premium' ? `Premium (${SITE.premiumPrice})` : `Free (${SITE.freePriceLabel})`}</dd></div>
          </dl>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-bold text-stone-900">Zaregistruj svoju službu</h1>
      <p className="mt-2 text-stone-600">
        Registrácia je zadarmo, bez platobných údajov a bez záväzkov. Vyplň profil a klienti z Bratislavy
        a okolia ťa nájdu v katalógu.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <div>
          <label className="text-sm font-medium text-stone-700">Profilová fotka</label>
          <div className="mt-2 flex items-center gap-4">
            {photo ? (
              <img src={photo} alt="Náhľad profilovej fotky" className="h-16 w-16 rounded-full object-cover" />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-stone-100 text-2xl text-stone-400">
                📷
              </div>
            )}
            <label className="cursor-pointer rounded-full border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 hover:border-brand-400 hover:text-brand-700">
              {photo ? 'Zmeniť fotku' : 'Nahrať fotku'}
              <input type="file" accept="image/*" onChange={handlePhoto} className="hidden" />
            </label>
          </div>
          <p className="mt-1 text-xs text-stone-400">Nepovinné. Fotka sa zatiaľ zobrazí len v tejto ukážke.</p>
        </div>

        <div>
          <label className="text-sm font-medium text-stone-700">Meno / názov služby</label>
          <input
            required
            value={form.name}
            onChange={update('name')}
            className="mt-1 w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            placeholder="Napr. Jana Kováčová"
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
                <option key={c.id} value={c.id}>{c.name}</option>
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
          <label className="text-sm font-medium text-stone-700">Popis služby</label>
          <textarea
            required
            rows={4}
            value={form.description}
            onChange={update('description')}
            className="mt-1 w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            placeholder="Čo ponúkaš, koľko rokov praxe máš, čo ťa odlišuje…"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-stone-700">Telefón</label>
            <input
              required
              type="tel"
              value={form.phone}
              onChange={update('phone')}
              className="mt-1 w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm outline-none focus:border-brand-500"
              placeholder="+421 9XX XXX XXX"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-stone-700">E-mail</label>
            <input
              required
              type="email"
              value={form.email}
              onChange={update('email')}
              className="mt-1 w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm outline-none focus:border-brand-500"
              placeholder="tvoj@email.sk"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-stone-700">Balík</label>
          <div className="mt-2 grid gap-3 sm:grid-cols-2">
            {[
              { id: 'free', title: 'Free', price: SITE.freePriceLabel, desc: 'Základný profil v katalógu' },
              { id: 'premium', title: 'Premium', price: SITE.premiumPrice, desc: 'Vyššia viditeľnosť + viac služieb v profile' },
            ].map((opt) => (
              <button
                type="button"
                key={opt.id}
                onClick={() => setPlan(opt.id)}
                className={`rounded-xl border p-4 text-left transition-colors ${
                  plan === opt.id ? 'border-brand-500 bg-brand-50' : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <div className="font-semibold text-stone-900">{opt.title}</div>
                <div className="text-sm text-brand-700 font-medium">{opt.price}</div>
                <div className="mt-1 text-xs text-stone-500">{opt.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {saveError && (
          <p className="rounded-xl bg-red-50 px-4 py-2.5 text-sm text-red-700">{saveError}</p>
        )}

        <button
          disabled={saving}
          className="w-full rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-700 disabled:opacity-60"
        >
          {saving ? 'Ukladám…' : 'Zaregistrovať sa'}
        </button>
      </form>
    </div>
  )
}
