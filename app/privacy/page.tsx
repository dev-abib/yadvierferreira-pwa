import Link from "next/link";

const LAST_UPDATED = "July 6, 2026";

const sections = [
  {
    title: "1. Information We Collect",
    content:
      "We collect information you provide when creating an account, including your name, email address, and profile details. We also collect usage data such as event participation, messages, and interactions to improve the service.",
  },
  {
    title: "2. How We Use Your Information",
    content:
      "Your information is used to operate and improve CoffeeChat, facilitate connections between professionals, send relevant notifications, and ensure platform safety. We do not sell your personal data to third parties.",
  },
  {
    title: "3. Data Sharing",
    content:
      "We may share anonymized, aggregate data for analytics purposes. Your profile information is visible to other users as part of the networking experience. We may disclose data if required by law or to protect our rights.",
  },
  {
    title: "4. Data Security",
    content:
      "We implement industry-standard security measures to protect your data. However, no method of electronic storage is 100% secure. We encourage strong passwords and responsible account management.",
  },
  {
    title: "5. Your Rights",
    content:
      "You may access, update, or delete your account information at any time through your profile settings. You can opt out of marketing communications and request a copy of the data we hold about you.",
  },
  {
    title: "6. Cookies",
    content:
      "We use essential cookies for authentication and service functionality. Analytics cookies help us understand usage patterns. You can manage cookie preferences through your browser settings.",
  },
  {
    title: "7. Third-Party Services",
    content:
      "CoffeeChat may integrate with third-party services for core functionality such as authentication or notifications. These services have their own privacy policies governing data handling.",
  },
  {
    title: "8. Changes to This Policy",
    content:
      "We may update this privacy policy periodically. Material changes will be notified through the app or via email. Continued use after changes constitutes acceptance of the updated policy.",
  },
  {
    title: "9. Contact Us",
    content:
      "For privacy-related inquiries, please contact us at privacy@coffeechat.app.",
  },
];

const Page = () => {
  return (
    <section className="min-h-screen bg-[#0D0906]">
      <div className="max-w-2xl mx-auto px-6 py-12 sm:py-16">
        {/* Back link */}
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 text-sm text-[#D8C2B4]/50 hover:text-[#EAA350] transition-colors duration-200 mb-8"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="rotate-180"
          >
            <path
              d="M6 12L10 8L6 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to Login
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold text-[#EDE0CA] mb-2">
          Privacy Policy
        </h1>
        <p className="text-sm text-[#D8C2B4]/50 mb-10">
          Last updated: {LAST_UPDATED}
        </p>

        <div className="space-y-8">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-lg sm:text-xl font-semibold text-[#EAA350] mb-2">
                {section.title}
              </h2>
              <p className="text-sm sm:text-base text-[#D8C2B4]/80 leading-relaxed">
                {section.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Page;
