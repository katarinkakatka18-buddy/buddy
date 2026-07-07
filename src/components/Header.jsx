import { Link, NavLink } from 'react-router-dom'
import Logo from './Logo.jsx'

const navLink = ({ isActive }) =>
  `px-3 py-2 rounded-full text-sm font-medium transition-colors ${
    isActive ? 'bg-brand-50 text-brand-700' : 'text-stone-600 hover:text-brand-700 hover:bg-stone-100'
  }`

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-stone-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-1 sm:flex">
          <NavLink to="/katalog" className={navLink}>Nájsť službu</NavLink>
          <NavLink to="/pridat-poziadavku" className={navLink}>Pridať požiadavku</NavLink>
          <NavLink to="/cennik" className={navLink}>Pre poskytovateľov</NavLink>
          <NavLink to="/o-nas" className={navLink}>O nás</NavLink>
        </nav>
        <Link
          to="/registracia"
          className="rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-700 transition-colors"
        >
          Registrovať službu
        </Link>
      </div>
    </header>
  )
}
