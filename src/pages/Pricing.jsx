import { Link } from 'react-router-dom'
import { SITE } from '../data/site.js'

const rows = [
  ['Profil v katalógu', true, true],
  ['Kontaktné údaje viditeľné pre klientov', true, true],
  ['Počet ponúkaných služieb', '1', 'Neobmedzené'],
  ['Zvýraznenie vo výsledkoch vyhľadávania', false, true],
  ['Odznak "Premium"', false, true],
  ['Prioritná podpora', false, true],
]

export default function Pricing() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-stone-900">Cenník pre poskytovateľov</h1>
        <p className="mt-2 text-stone-600">Začni zadarmo, bez platobných údajov a bez záväzkov.</p>
      </div>

      <div className="mt-10 overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-stone-100">
              <th className="p-4 text-left font-medium text-stone-500">Funkcia</th>
              <th className="p-4 text-center font-semibold text-stone-900">Free<br /><span className="text-brand-700">{SITE.freePriceLabel}</span></th>
              <th className="p-4 text-center font-semibold text-stone-900">Premium<br /><span className="text-brand-700">{SITE.premiumPrice}</span></th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([label, free, premium]) => (
              <tr key={label} className="border-b border-stone-50 last:border-0">
                <td className="p-4 text-stone-700">{label}</td>
                <td className="p-4 text-center">
                  {typeof free === 'boolean' ? (free ? '✅' : '—') : free}
                </td>
                <td className="p-4 text-center">
                  {typeof premium === 'boolean' ? (premium ? '✅' : '—') : premium}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 text-center">
        <Link to="/registracia" className="inline-block rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-700">
          Zaregistrovať sa
        </Link>
      </div>
    </div>
  )
}
