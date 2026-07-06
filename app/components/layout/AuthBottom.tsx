import Link from "next/link";

const AuthBottom = () => {
  return (
    <footer
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: "rgba(13, 9, 6, 0.95)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        borderTop: "1px solid rgba(216,194,180,0.1)",
      }}
    >
      <div className="max-w-lg mx-auto px-6 py-4 flex flex-col items-center gap-y-2">
        <p className="text-[11px] sm:text-xs text-[#D8C2B4]/40 font-normal">
          By continuing, you agree to our
        </p>
        <div className="flex items-center gap-x-3">
          <Link
            href="/terms"
            className="text-xs sm:text-sm text-[#D8C2B4]/70 hover:text-[#EAA350] transition-colors duration-200"
          >
            Terms of Service
          </Link>
          <span className="w-1 h-1 rounded-full bg-[#D8C2B4]/30" />
          <Link
            href="/privacy"
            className="text-xs sm:text-sm text-[#D8C2B4]/70 hover:text-[#EAA350] transition-colors duration-200"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default AuthBottom;
