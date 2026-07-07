import Mascot from './Mascot.jsx'

export default function Logo({ className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2 font-extrabold text-xl tracking-tight ${className}`}>
      <Mascot size={32} />
      <span className="text-stone-900">Buddy</span>
    </span>
  )
}
