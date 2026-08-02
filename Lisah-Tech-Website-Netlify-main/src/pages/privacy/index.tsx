export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white py-12 lg:py-20">
      <div className="mx-auto max-w-4xl px-4 lg:px-12">
        {/* Header */}
        <div className="mb-12 space-y-4">
          <h1 className="text-3xl lg:text-5xl font-normal text-lisah-green text-center">
            Privacy Policy for Lisah
          </h1>
          <div className="text-center text-gray-600 space-y-1">
            <p className="text-sm lg:text-base">
              <strong>Effective Date:</strong> 1st November, 2025
            </p>
            <p className="text-sm lg:text-base">
              <strong>Last Updated:</strong> 1st January, 2026
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none space-y-8 text-gray-700">
          {/* Introduction */}
          <p className="text-base lg:text-lg leading-relaxed">
            At Lisah ("we," "us," or "our"), we respect your privacy and are
            committed to protecting your personal data. This Privacy Policy
            explains how we collect, use, disclose, and safeguard your
            information when you visit our website or use our mobile application
            (the "Service").
          </p>
          <p className="text-base lg:text-lg leading-relaxed">
            Lisah provides a "Commitment-as-a-Service" platform designed to help
            you invest towards future goals and build long-term wealth through
            time-locked asset vaults.
          </p>

          {/* Section 1 */}
          <section className="space-y-4">
            <h2 className="text-2xl lg:text-3xl font-semibold text-gray-900 mt-8 mb-4">
              1. INFORMATION WE COLLECT
            </h2>
            <p className="text-base lg:text-lg leading-relaxed">
              We collect information that identifies, relates to, or could
              reasonably be linked to you ("Personal Data").
            </p>

            <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mt-6 mb-3">
              1.1. Information You Provide to Us
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-base lg:text-lg">
              <li>
                <strong>Account Information:</strong> Name, email address,
                phone number, and password.
              </li>
              <li>
                <strong>Financial Goals:</strong> Information regarding your
                investment objectives (e.g., "Child's University Fund,"
                "2040 Legacy Fund").
              </li>
              <li>
                <strong>Beneficiary Information:</strong> Names and contact
                details of individuals you designate to receive assets upon
                commitment maturity.
              </li>
            </ul>

            <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mt-6 mb-3">
              1.2. Information from Partner Brokerages (via API)
            </h3>
            <p className="text-base lg:text-lg leading-relaxed mb-3">
              Because Lisah acts as a commitment layer over your existing
              brokerage accounts, we access data via secure APIs:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-base lg:text-lg">
              <li>
                <strong>Portfolio Data:</strong> Asset holdings, quantities, and
                acquisition dates.
              </li>
              <li>
                <strong>Verification Data:</strong> Confirmation of asset
                ownership to enable the "Time-Lock" feature.
              </li>
              <li>
                <strong>Transaction History:</strong> To provide growth metrics
                and performance tracking.
              </li>
            </ul>

            <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mt-6 mb-3">
              1.3. Automatically Collected Information
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-base lg:text-lg">
              <li>
                <strong>Device Data:</strong> IP address, browser type,
                operating system, and unique device identifiers.
              </li>
              <li>
                <strong>Usage Data:</strong> Pages viewed, time spent on the
                Service, and interaction with features.
              </li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <h2 className="text-2xl lg:text-3xl font-semibold text-gray-900 mt-8 mb-4">
              2. HOW WE USE YOUR INFORMATION
            </h2>
            <p className="text-base lg:text-lg leading-relaxed mb-3">
              We use your data to provide a disciplined investment experience,
              including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-base lg:text-lg">
              <li>
                <strong>Enforcing Commitments:</strong> Managing the
                "Time-Locked Asset Vaults" to prevent premature liquidation.
              </li>
              <li>
                <strong>Legacy Planning:</strong> Facilitating the private trust
                and beneficiary transfer process.
              </li>
              <li>
                <strong>Personalization:</strong> Tailoring investment insights
                based on your long-term goals (e.g., funding a child's future).
              </li>
              <li>
                <strong>Compliance:</strong> Verifying identity and meeting
                anti-money laundering (AML) and "Know Your Customer" (KYC)
                requirements in partnership with our regulatory sponsors.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <h2 className="text-2xl lg:text-3xl font-semibold text-gray-900 mt-8 mb-4">
              3. DATA SHARING AND DISCLOSURE
            </h2>
            <p className="text-base lg:text-lg leading-relaxed mb-3">
              We do not sell your personal data. We share information only in
              the following circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-base lg:text-lg">
              <li>
                <strong>With Partner Brokers:</strong> To facilitate the
                locking, unlocking, and management of your assets via API.
              </li>
              <li>
                <strong>With Regulatory Sponsors:</strong> As required to
                operate within legal frameworks for regulated financial
                activities.
              </li>
              <li>
                <strong>With Beneficiaries:</strong> Limited information may be
                shared with your designated beneficiaries at the appropriate time
                to facilitate legacy transfers.
              </li>
              <li>
                <strong>Legal Requirements:</strong> If required by law,
                subpoena, or to protect the safety and integrity of our users.
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-4">
            <h2 className="text-2xl lg:text-3xl font-semibold text-gray-900 mt-8 mb-4">
              4. SECURITY OF YOUR DATA
            </h2>
            <p className="text-base lg:text-lg leading-relaxed mb-3">
              We prioritize the security of your financial commitment. We
              implement industry-standard security measures, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-base lg:text-lg">
              <li>
                <strong>Encryption:</strong> All data in transit and at rest is
                encrypted.
              </li>
              <li>
                <strong>Secure API Integration:</strong> We use OAuth and
                token-based protocols to interact with brokers without ever
                storing your brokerage login credentials.
              </li>
              <li>
                <strong>Access Controls:</strong> Restricted internal access to
                sensitive user information.
              </li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="space-y-4">
            <h2 className="text-2xl lg:text-3xl font-semibold text-gray-900 mt-8 mb-4">
              5. YOUR RIGHTS AND CHOICES
            </h2>
            <p className="text-base lg:text-lg leading-relaxed mb-3">
              Depending on your jurisdiction (such as Nigeria under the NDPR),
              you may have the following rights:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-base lg:text-lg">
              <li>
                <strong>Access/Correction:</strong> Request a copy of your data
                or correct inaccuracies.
              </li>
              <li>
                <strong>Data Portability:</strong> Request a transfer of your
                data to another service.
              </li>
              <li>
                <strong>Account Deletion:</strong> Note that deleting your Lisah
                account may not automatically "unlock" assets held at a partner
                broker if a time-lock commitment is still active.
              </li>
            </ul>
          </section>

          {/* Section 6 */}
          <section className="space-y-4">
            <h2 className="text-2xl lg:text-3xl font-semibold text-gray-900 mt-8 mb-4">
              6. THIRD-PARTY LINKS
            </h2>
            <p className="text-base lg:text-lg leading-relaxed">
              Our Service interacts with third-party brokerages. We are not
              responsible for the privacy practices of these external brokers.
              We encourage you to read the privacy policies of any partner
              broker you link to Lisah.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-4">
            <h2 className="text-2xl lg:text-3xl font-semibold text-gray-900 mt-8 mb-4">
              7. UPDATES TO THIS POLICY
            </h2>
            <p className="text-base lg:text-lg leading-relaxed">
              We may update this Privacy Policy from time to time. We will
              notify you of any changes by posting the new policy on this page
              and updating the "Effective Date."
            </p>
          </section>

          {/* Section 8 */}
          <section className="space-y-4">
            <h2 className="text-2xl lg:text-3xl font-semibold text-gray-900 mt-8 mb-4">
              8. CONTACT US
            </h2>
            <p className="text-base lg:text-lg leading-relaxed">
              If you have questions or concerns about this Privacy Policy,
              please contact us at:
            </p>
            <p className="text-base lg:text-lg leading-relaxed">
              Email:{" "}
              <a
                href="mailto:support@uselisah.com"
                className="text-lisah-green hover:underline"
              >
                support@uselisah.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

