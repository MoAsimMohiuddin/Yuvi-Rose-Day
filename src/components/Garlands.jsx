export default function Garlands() {
  return (
    <>
      <div className="pointer-events-none absolute left-0 right-0 top-0 z-10 flex justify-center">
        <svg
          viewBox="0 0 400 40"
          className="h-10 w-full max-w-2xl opacity-80"
          aria-hidden
        >
          <path
            d="M10 10 Q200 35 390 10"
            stroke="#b76e79"
            strokeWidth="3"
            fill="none"
          />
          {Array.from({ length: 14 }).map((_, i) => (
            <circle key={i} cx={25 + i * 26} cy={18 + (i % 2) * 3} r="5" fill="#e8d5b7" />
          ))}
        </svg>
      </div>
      <div className="pointer-events-none absolute left-0 right-0 bottom-0 z-10 flex justify-center">
        <svg
          viewBox="0 0 400 40"
          className="h-10 w-full max-w-2xl opacity-80"
          aria-hidden
        >
          <path
            d="M10 30 Q200 5 390 30"
            stroke="#b76e79"
            strokeWidth="3"
            fill="none"
          />
          {Array.from({ length: 14 }).map((_, i) => (
            <circle key={i} cx={25 + i * 26} cy={22 + ((i + 1) % 2) * 3} r="5" fill="#e8d5b7" />
          ))}
        </svg>
      </div>
    </>
  )
}
