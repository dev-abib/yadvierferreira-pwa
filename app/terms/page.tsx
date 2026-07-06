import Link from "next/link";

const LAST_UPDATED = "July 6, 2026";

const sections = [
  {
    title: "1. Acceptance of Terms",
    content:
      "By accessing or using CoffeeChat, you agree to be bound by these Terms of Service. If you do not agree, please do not use the app. We may update these terms at any time, and continued use after changes constitutes acceptance.",
  },
  {
    title: "2. Description of Service",
    content:
      "CoffeeChat is a social networking platform that connects professionals through in-person Cafecito meetups. Users can create profiles, discover events, host gatherings, and exchange messages to facilitate meaningful professional relationships.",
  },
  {
    title: "3. User Accounts",
    content:
      "You are responsible for maintaining the confidentiality of your account credentials. You must provide accurate information and promptly update it. You may not impersonate others or create accounts for anyone other than yourself without authorization.",
  },
  {
    title: "4. Acceptable Use",
    content:
      "You agree to use CoffeeChat respectfully. Harassment, spam, impersonation, fraudulent activity, or any use that violates applicable laws is strictly prohibited. We reserve the right to remove content or suspend accounts that violate this policy.",
  },
  {
    title: "5. Intellectual Property",
    content:
      "All content, trademarks, and intellectual property within CoffeeChat are owned by or licensed to us. You may not reproduce, distribute, or create derivative works without our written consent.",
  },
  {
    title: "6. Limitation of Liability",
    content:
      "CoffeeChat is provided 'as is' without warranties of any kind. We are not liable for damages arising from your use of the service, including but not limited to direct, indirect, incidental, or consequential damages.",
  },
  {
    title: "7. Termination",
    content:
      "We may suspend or terminate your access at any time for violations of these terms. Upon termination, your right to use the service ceases immediately.",
  },
  {
    title: "8. Contact",
    content:
      "For questions about these terms, please reach out to support@coffeechat.app.",
  },
];

const Page = () => {
  return (
    <section
      className="min-h-screen bg-[#0D0906]"
    >
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
          Terms of Service
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
