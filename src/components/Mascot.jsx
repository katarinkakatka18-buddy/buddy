export default function Mascot({ size = 40, className = '' }) {
  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="Buddy – maskot"
    >
      <ellipse cx="60" cy="68" rx="38" ry="34" fill="#4a8f66" />
      <circle cx="46" cy="60" r="6" fill="#0a1b16" />
      <circle cx="76" cy="60" r="6" fill="#0a1b16" />
      <path d="M44 78 Q60 90 78 78" stroke="#0a1b16" strokeWidth="4" fill="none" strokeLinecap="round" />
      <circle cx="98" cy="48" r="10" fill="#a9682a" />
      <path d="M92 44 L104 40" stroke="#5c3702" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}
