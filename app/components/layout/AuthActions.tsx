"use client";

const GoogleIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    style={{ display: "block", flexShrink: 0 }}
  >
    <path
      d="M23.52 12.27c0-.82-.07-1.6-.2-2.36H12v4.47h6.47c-.28 1.5-1.13 2.77-2.4 3.62v3h3.88c2.27-2.09 3.57-5.17 3.57-8.73z"
      fill="#4285F4"
    />
    <path
      d="M12 24c3.24 0 5.95-1.07 7.93-2.9l-3.88-3c-1.08.72-2.45 1.15-4.05 1.15-3.12 0-5.76-2.1-6.7-4.93H1.3v3.1C3.27 21.3 7.31 24 12 24z"
      fill="#34A853"
    />
    <path
      d="M5.3 14.32c-.24-.72-.38-1.49-.38-2.32s.14-1.6.38-2.32v-3.1H1.3A11.96 11.96 0 000 12c0 1.93.46 3.76 1.3 5.42l4-3.1z"
      fill="#FBBC05"
    />
    <path
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.44-3.44C17.94 1.19 15.24 0 12 0 7.31 0 3.27 2.7 1.3 6.58l4 3.1c.94-2.83 3.58-4.93 6.7-4.93z"
      fill="#EA4335"
    />
  </svg>
);

const AppleIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 384 512"
    fill="#0D0906"
    style={{ display: "block", flexShrink: 0 }}
  >
    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C60.6 141.2 4 184.8 4 273.5c0 26.2 4.8 53.3 14.4 81.2 12.8 37.2 59 128.4 107.2 126.9 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-83.5 102.6-120.8-65.2-30.7-61.7-90-61.7-91.9zM256.3 78.3c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
  </svg>
);

const MailIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#D8C2B4"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ display: "block", flexShrink: 0 }}
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 6-10 7L2 6" />
  </svg>
);

const filledPill: React.CSSProperties = {
  width: "100%",
  height: 52,
  borderRadius: 999,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 10,
  border: "none",
  cursor: "pointer",
  background: "#EAA350",
};

const outlinePill: React.CSSProperties = {
  width: "100%",
  height: 56, // measured taller than the filled buttons
  borderRadius: 999,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 10,
  background: "transparent",
  border: "1px solid rgba(216,194,180,0.2)",
  cursor: "pointer",
};

type AuthActionsProps = {
  onGoogle?: () => void;
  onApple?: () => void;
  onEmail?: () => void;
};

const AuthActions = ({ onGoogle, onApple, onEmail }: AuthActionsProps) => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}
    >
      <button
        type="button"
        onClick={onGoogle}
        style={filledPill}
        className="active:scale-[0.98] transition-transform"
      >
        <GoogleIcon />
        <span
          style={{
            color: "#0D0906",
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: "0.4px",
            textTransform: "uppercase",
          }}
        >
          Continue with Google
        </span>
      </button>

      <button
        type="button"
        onClick={onApple}
        style={filledPill}
        className="active:scale-[0.98] transition-transform"
      >
        <AppleIcon />
        <span
          style={{
            color: "#0D0906",
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: "0.4px",
            textTransform: "uppercase",
          }}
        >
          Continue with Apple
        </span>
      </button>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          padding: "10px 0",
        }}
      >
        <span
          style={{ flex: 1, height: 1, background: "rgba(216,194,180,0.15)" }}
        />
        <span
          style={{
            fontSize: 11,
            color: "rgba(216,194,180,0.5)",
            fontWeight: 500,
            letterSpacing: "0.8px",
          }}
        >
          OR
        </span>
        <span
          style={{ flex: 1, height: 1, background: "rgba(216,194,180,0.15)" }}
        />
      </div>

      <button
        type="button"
        onClick={onEmail}
        style={outlinePill}
        className="active:scale-[0.98] transition-transform"
      >
        <MailIcon />
        <span style={{ color: "#D8C2B4", fontSize: 14, fontWeight: 500 }}>
          Continue with Email
        </span>
      </button>
    </div>
  );
};

export default AuthActions;
