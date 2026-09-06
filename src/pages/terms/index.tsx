export default function TermsOfUsePage() {
  return (
    <div className="min-h-screen bg-white py-12 lg:py-20">
      <div className="mx-auto max-w-4xl px-4 lg:px-12">
        {/* Header */}
        <div className="mb-12 space-y-4">
          <h1 className="text-3xl lg:text-5xl font-normal text-lisah-green text-center">
            Terms of Use for Lisah
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
            Welcome to Lisah. These Terms of Use ("Terms") govern your access
            to and use of the Lisah website, mobile application, and Service
            (collectively, the "Service"). By accessing or using our Service,
            you agree to be bound by these Terms.
          </p>
          <p className="text-base lg:text-lg leading-relaxed">
            Lisah is a "Commitment-as-a-Service" platform operated by Lisah
            Solutions Ltd. ("we," "us," or "our").
          </p>

          {/* Section 1 */}
          <section className="space-y-4">
            <h2 className="text-2xl lg:text-3xl font-semibold text-gray-900 mt-8 mb-4">
              1. THE NATURE OF OUR SERVICE
            </h2>

            <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mt-6 mb-3">
              1.1. Commitment-as-a-Service
            </h3>
            <p className="text-base lg:text-lg leading-relaxed">
              Lisah provides a technology layer that allows you to create
              "Time-Locked Asset Vaults." Our Service is designed to enforce
              investment discipline by facilitating the programmatic locking of
              assets held at partner brokerages for defined periods.
            </p>

            <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mt-6 mb-3">
              1.2. Not a Broker-Dealer or Investment Advisor
            </h3>
            <p className="text-base lg:text-lg leading-relaxed">
              Lisah is a technology provider. We are not a licensed
              broker-dealer, investment advisor, or custodian. All financial
              transactions, asset custody, and trade executions are performed by
              our Regulatory Sponsors or Partner Brokers. We do not provide
              financial, investment, or tax advice.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <h2 className="text-2xl lg:text-3xl font-semibold text-gray-900 mt-8 mb-4">
              2. ELIGIBILITY AND ACCOUNT REGISTRATION
            </h2>

            <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mt-6 mb-3">
              2.1. Eligibility
            </h3>
            <p className="text-base lg:text-lg leading-relaxed">
              To use Lisah, you must be at least 18 years old and capable of
              forming a binding contract under applicable law.
            </p>

            <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mt-6 mb-3">
              2.2. Account Security
            </h3>
            <p className="text-base lg:text-lg leading-relaxed">
              You are responsible for maintaining the confidentiality of your
              account credentials. You agree to notify us immediately of any
              unauthorized use of your account.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <h2 className="text-2xl lg:text-3xl font-semibold text-gray-900 mt-8 mb-4">
              3. ASSET LOCKING AND COMMITMENT
            </h2>

            <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mt-6 mb-3">
              3.1. Irrevocability of Locks
            </h3>
            <p className="text-base lg:text-lg leading-relaxed">
              By using the "Time-Lock" feature, you acknowledge and agree that
              the lock is programmatic and intended to be irrevocable for the
              duration of the term you select. Lisah does not have the
              authority to unilaterally "unlock" assets once a commitment is
              made, as this authority rests with the underlying partner broker
              and the programmatic constraints of the vault.
            </p>

            <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mt-6 mb-3">
              3.2. Market Risk
            </h3>
            <p className="text-base lg:text-lg leading-relaxed">
              Time-locking assets does not protect against market volatility.
              The value of your assets may decrease during the lock-in period.
              You acknowledge that you are locking high-conviction assets at
              your own risk.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-4">
            <h2 className="text-2xl lg:text-3xl font-semibold text-gray-900 mt-8 mb-4">
              4. PARTNER BROKER INTEGRATIONS (API)
            </h2>

            <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mt-6 mb-3">
              4.1. Account Linking
            </h3>
            <p className="text-base lg:text-lg leading-relaxed">
              To use our core features, you must link your account from a partner
              brokerage. By linking your account, you authorize Lisah to access
              your portfolio data and send instructions to the partner broker to
              enforce your selected time-locks via API.
            </p>

            <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mt-6 mb-3">
              4.2. Third-Party Terms
            </h3>
            <p className="text-base lg:text-lg leading-relaxed">
              Your relationship with your broker is governed by their specific
              terms and conditions. Lisah is not responsible for any actions
              taken by the partner broker, including service outages or regulatory
              freezes on your brokerage account.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-4">
            <h2 className="text-2xl lg:text-3xl font-semibold text-gray-900 mt-8 mb-4">
              5. PRIVATE TRUST AND BENEFICIARIES
            </h2>

            <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mt-6 mb-3">
              5.1. Beneficiary Designation
            </h3>
            <p className="text-base lg:text-lg leading-relaxed">
              Lisah allows you to designate beneficiaries for your locked
              vaults. You represent that you have the authority to provide the
              contact information of such beneficiaries.
            </p>

            <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mt-6 mb-3">
              5.2. Legal Framework
            </h3>
            <p className="text-base lg:text-lg leading-relaxed">
              The automated transfer of assets to a beneficiary upon maturity is
              facilitated through our Regulatory Sponsors. While Lisah provides
              the interface for this legacy planning, the legal validity of such
              transfers is subject to the laws of your jurisdiction and the
              trust framework provided by the partner broker.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-4">
            <h2 className="text-2xl lg:text-3xl font-semibold text-gray-900 mt-8 mb-4">
              6. PROHIBITED CONDUCT
            </h2>
            <p className="text-base lg:text-lg leading-relaxed mb-3">
              You agree not to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-base lg:text-lg">
              <li>Use the Service for any illegal or unauthorized purpose.</li>
              <li>Attempt to circumvent the time-lock mechanisms.</li>
              <li>
                Interfere with or disrupt the integrity or performance of the
                Service or its API integrations.
              </li>
              <li>
                Use the Service to speculate on short-term market movements.
              </li>
            </ul>
          </section>

          {/* Section 7 */}
          <section className="space-y-4">
            <h2 className="text-2xl lg:text-3xl font-semibold text-gray-900 mt-8 mb-4">
              7. LIMITATION OF LIABILITY
            </h2>
            <p className="text-base lg:text-lg leading-relaxed mb-3">
              To the maximum extent permitted by law, Lisah Solutions Ltd. shall
              not be liable for any indirect, incidental, special, or
              consequential damages resulting from:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-base lg:text-lg">
              <li>
                Market fluctuations or losses in the value of locked assets.
              </li>
              <li>
                Your inability to access funds during a time-lock period.
              </li>
              <li>
                Failures or outages of partner brokerage APIs or platforms.
              </li>
              <li>Errors in beneficiary designations or transfers.</li>
            </ul>
          </section>

          {/* Section 8 */}
          <section className="space-y-4">
            <h2 className="text-2xl lg:text-3xl font-semibold text-gray-900 mt-8 mb-4">
              8. GOVERNING LAW AND DISPUTE RESOLUTION
            </h2>
            <p className="text-base lg:text-lg leading-relaxed">
              These Terms shall be governed by the laws of the Federal Republic
              of Nigeria. Any disputes arising from these Terms shall be resolved
              through binding arbitration in Lagos, Nigeria, unless otherwise
              required by law.
            </p>
          </section>

          {/* Section 9 */}
          <section className="space-y-4">
            <h2 className="text-2xl lg:text-3xl font-semibold text-gray-900 mt-8 mb-4">
              9. CONTACT INFORMATION
            </h2>
            <p className="text-base lg:text-lg leading-relaxed">
              For questions regarding these Terms, please contact:
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

