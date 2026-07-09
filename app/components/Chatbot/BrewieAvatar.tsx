export default function BrewieAvatar({ size = 44 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="22" cy="22" r="22" fill="#2B1B12" />
      <circle cx="22" cy="22" r="21.25" stroke="#4A2E1C" strokeWidth="1.5" />
      {/* body */}
      <path
        d="M13 21c0-2.8 2.3-5 5-5h8c2.8 0 5 2.2 5 5v6a3 3 0 0 1-3 3H16a3 3 0 0 1-3-3v-6z"
        fill="#E8964C"
      />
      {/* cup handle */}
      <path
        d="M31 22.5h1.4a2.1 2.1 0 0 1 0 4.2H31"
        stroke="#E8964C"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {/* lid line */}
      <rect x="13" y="18.6" width="18" height="2.2" rx="1.1" fill="#F3AE72" />
      {/* face */}
      <circle cx="18.6" cy="24.4" r="1.15" fill="#2B1B12" />
      <circle cx="25.4" cy="24.4" r="1.15" fill="#2B1B12" />
      <path
        d="M19.2 27.3c1 .9 3.4.9 4.4 0"
        stroke="#2B1B12"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      {/* steam */}
      <path
        d="M17.5 13.5c0-1.3 1.6-1.3 1.6-2.6s-1.6-1.3-1.6-2.6"
        stroke="#C97A38"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <path
        d="M22 13.5c0-1.3 1.6-1.3 1.6-2.6s-1.6-1.3-1.6-2.6"
        stroke="#C97A38"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <path
        d="M26.5 13.5c0-1.3 1.6-1.3 1.6-2.6s-1.6-1.3-1.6-2.6"
        stroke="#C97A38"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}
