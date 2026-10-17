import type { ReactNode } from "react";

const Section = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => (
  <section className="space-y-4">
    <h2 className="text-2xl lg:text-3xl font-semibold text-gray-900 mt-8 mb-4">
      {title}
    </h2>
    {children}
  </section>
);

const Subheading = ({ children }: { children: ReactNode }) => (
  <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mt-6 mb-3">
    {children}
  </h3>
);

const Paragraph = ({ children }: { children: ReactNode }) => (
  <p className="text-base lg:text-lg leading-relaxed">{children}</p>
);

const List = ({ children }: { children: ReactNode }) => (
  <ul className="list-disc pl-6 space-y-2 text-base lg:text-lg">{children}</ul>
);

const ComplianceEmail = () => (
  <a
    className="text-lisah-green hover:underline"
    href="mailto:compliance@uselisah.com"
  >
    compliance@uselisah.com
  </a>
);

const WebsiteLink = () => (
  <a className="text-lisah-green hover:underline" href="https://uselisah.com">
    https://uselisah.com
  </a>
);

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white py-12 lg:py-20">
      <div className="mx-auto max-w-4xl px-4 lg:px-12">
        {/* Header */}
        <div className="mb-12 space-y-4">
          <h1 className="text-3xl lg:text-5xl font-normal text-lisah-green text-center">
            Privacy Policy
          </h1>
          <div className="text-center text-gray-600 space-y-1">
            <p className="text-base lg:text-lg">Lisah Technologies Ltd</p>
            <p className="text-sm lg:text-base">
              <strong>Effective Date:</strong> 1st November, 2025
            </p>
            <p className="text-sm lg:text-base">
              <strong>Last Updated:</strong> October 2026
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none space-y-8 text-gray-700">
          {/* Introduction */}
          <Paragraph>
            At <strong>Lisah Technologies Ltd</strong> (“Lisah,” “we,” “us,” or
            “our”), we respect your privacy and are committed to protecting the
            personal data of our users. This Privacy Policy explains how we
            collect, use, store, share, and protect your information when you
            visit <WebsiteLink />, use our mobile application, or access our
            multi-asset trading, virtual account, portfolio, and vault services
            (collectively, the “Service”).
          </Paragraph>
          <Paragraph>
            By accessing or using the Service, you agree to the data collection
            and processing practices described in this Privacy Policy. If you do
            not agree, please discontinue the use of our services.
          </Paragraph>

          <Section title="1. The Scope of Our Platform">
            <Paragraph>
              Lisah is a multi-asset financial technology infrastructure
              platform providing:
            </Paragraph>
            <List>
              <li>
                Unrestricted <strong>Spot Balance trading</strong> across
                equities, exchange-traded funds (ETFs), and digital assets.
              </li>
              <li>
                <strong>Multi-Currency Virtual Accounts</strong> in British
                Pounds (GBP), Euros (EUR), United States Dollars (USD), and
                Nigerian Naira (NGN).
              </li>
              <li>
                Self-directed <strong>Custom Portfolios</strong> and
                partner-curated <strong>Thematic Portfolios</strong>.
              </li>
              <li>
                Programmatic behavioral savings vaults via{" "}
                <strong>Lisah Stash</strong>.
              </li>
            </List>
            <Paragraph>
              Lisah works directly with licensed partner broker-dealers,
              regulated digital asset custodians, and authorized payment/banking
              partners (“Regulatory Partners”) to execute trades, hold custody,
              issue virtual accounts, and process transactions.
            </Paragraph>
          </Section>

          <Section title="2. Information We Collect">
            <Paragraph>
              To provide our trading, virtual account, portfolio, and vault
              services, we collect information directly from you, automatically
              through your device, and via third-party verification providers:
            </Paragraph>

            <Subheading>
              2.1 Identity &amp; Verification Data (KYC / AML)
            </Subheading>
            <Paragraph>
              Under applicable Anti-Money Laundering (AML) and Counter-Terrorist
              Financing (CTF) regulations, we collect:
            </Paragraph>
            <List>
              <li>
                Full legal name, date of birth, nationality, and residential
                address.
              </li>
              <li>
                Government-issued identification (National Identification Number
                [NIN], International Passport, Voter’s Card, or Driver’s
                License).
              </li>
              <li>
                Tax Identification Numbers (e.g., BVN, SSN, or local
                equivalent).
              </li>
              <li>
                Biometric data, including facial scans or “selfie” verifications
                for identity authentication.
              </li>
              <li>Proof of address (utility bills or bank statements).</li>
              <li>
                Source of funds, employment status, and investment experience.
              </li>
            </List>

            <Subheading>2.2 Financial &amp; Virtual Account Data</Subheading>
            <List>
              <li>
                Bank account details, payment card information, and funding
                transaction history.
              </li>
              <li>
                Multi-currency virtual account identifiers and transaction
                statements across <strong>GBP, EUR, USD, and NGN</strong>.
              </li>
              <li>
                Currency conversion records, deposits, and withdrawal
                destination accounts.
              </li>
            </List>

            <Subheading>
              2.3 Trading, Portfolio &amp; Stash Vault Data
            </Subheading>
            <List>
              <li>
                Spot trading activity, including order types (Market, Limit),
                entry prices, and execution timestamps.
              </li>
              <li>
                Conditional exit parameters (Take Profit, Stop Loss, and Bailout
                configurations).
              </li>
              <li>
                Custom portfolio configurations, asset weights, and subscribed
                thematic portfolios.
              </li>
              <li>
                Stash vault records, committed quantities, target release dates,
                and auto-liquidation preferences.
              </li>
            </List>

            <Subheading>2.4 Beneficiary &amp; Dependent Information</Subheading>
            <List>
              <li>
                <strong>Beneficiaries:</strong> If you utilize our
                legacy/beneficiary designation features for your portfolios or
                Stash vaults, we collect the full name, relationship, email
                address, phone number, and national identification details of
                your designated beneficiary.
              </li>
              <li>
                <strong>Minor Dependents:</strong> Where a parent or legal
                guardian establishes a custodial or minor sub-account, we
                collect the minor dependent’s legal name, date of birth,
                relationship to guardian, and legal identification documents as
                required by law.
              </li>
            </List>

            <Subheading>2.5 Technical &amp; Device Information</Subheading>
            <List>
              <li>
                IP addresses, browser types, operating system details, and
                unique device identifiers (UUIDs).
              </li>
              <li>
                Session logs, in-app interactions, button clicks, page
                transitions, and crash diagnostic reports.
              </li>
              <li>
                Geolocation data (approximate location based on IP address) to
                enforce regional compliance and security safeguards.
              </li>
            </List>
          </Section>

          <Section title="3. How We Use Your Information">
            <Paragraph>
              We process your personal information for the following purposes:
            </Paragraph>
            <List>
              <li>
                <strong>Account Onboarding &amp; Compliance:</strong> Performing
                KYC/AML screening, identity verification, sanctions checks, and
                fraud monitoring.
              </li>
              <li>
                <strong>Trade Execution &amp; Order Processing:</strong>{" "}
                Relaying trade instructions (Market, Limit, TP/SL, and Stash) to
                our partner brokerages and digital asset custodians.
              </li>
              <li>
                <strong>Multi-Currency Account Operation:</strong> Allocating
                and managing GBP, EUR, USD, and NGN virtual account ledgers and
                processing domestic and cross-border settlements.
              </li>
              <li>
                <strong>Portfolio &amp; Vault Management:</strong> Enforcing
                custom weighting allocations, thematic tracking, and
                programmatic time-lock or bailout triggers within Lisah Stash.
              </li>
              <li>
                <strong>Custodial &amp; Family Sub-Accounts:</strong>{" "}
                Administering guardian-managed accounts, allocating minor access
                permissions, and maintaining segregated ledger records.
              </li>
              <li>
                <strong>Security &amp; Authentication:</strong> Securing logins,
                preventing account takeovers, verifying device authorizations,
                and detecting malicious activity.
              </li>
              <li>
                <strong>Customer Support &amp; Communications:</strong>{" "}
                Delivering transaction receipts, security alerts, vault release
                notifications, and responding to inquiries.
              </li>
              <li>
                <strong>Legal &amp; Regulatory Obligations:</strong> Complying
                with court orders, regulatory inquiries from statutory bodies,
                tax reporting, and anti-financial crime mandates.
              </li>
            </List>
          </Section>

          <Section title="4. Legal Grounds for Processing">
            <Paragraph>
              We process your personal information under the following legal
              bases:
            </Paragraph>
            <List>
              <li>
                <strong>Contractual Necessity:</strong> To provide the services
                you requested under our Terms of Use.
              </li>
              <li>
                <strong>Legal Obligation:</strong> To satisfy statutory
                anti-money laundering, counter-terrorist financing, tax, and
                banking regulations.
              </li>
              <li>
                <strong>Legitimate Interests:</strong> To protect our platform
                against fraud, maintain API stability, and improve our product
                architecture.
              </li>
              <li>
                <strong>Explicit Parental / User Consent:</strong> Where a
                parent or guardian establishes a dependent sub-account, or where
                you explicitly opt into specific marketing updates, thematic
                collections, or beneficiary designations.
              </li>
            </List>
          </Section>

          <Section title="5. How We Share Your Information">
            <Paragraph>
              <strong>
                Lisah does not sell, rent, or monetize your personal data.
              </strong>{" "}
              We share your data strictly on a need-to-know basis with
              authorized entities as detailed below:
            </Paragraph>
            <List>
              <li>
                <strong>
                  Regulated Partner Brokers &amp; Digital Asset Custodians:
                </strong>{" "}
                To open trading sub-accounts, execute spot trades, manage asset
                custody, enforce Stash vault constraints, and route
                liquidations.
              </li>
              <li>
                <strong>Banking &amp; Virtual Account Partners:</strong> To
                generate and maintain dedicated virtual account numbers in GBP,
                EUR, USD, and NGN, process fiat deposits, and settle
                withdrawals.
              </li>
              <li>
                <strong>Identity Verification Vendors (KYC Providers):</strong>{" "}
                To validate government credentials, verify identity databases
                (e.g., BVN/NIN), and detect synthetic fraud.
              </li>
              <li>
                <strong>Portfolio Research &amp; Thematic Partners:</strong>{" "}
                When you opt into curated partner thematic portfolios,
                aggregated performance or anonymized trade volume may be shared
                (no personal identifiable data is sold).
              </li>
              <li>
                <strong>Private Trust &amp; Estate Partners:</strong> If legacy
                beneficiary transfer rules are triggered, beneficiary details
                are securely transmitted to authorized legal trust partners to
                execute lawful distribution.
              </li>
              <li>
                <strong>Legal &amp; Regulatory Authorities:</strong> Law
                enforcement agencies, financial intelligence units (e.g., NFIU),
                or regulatory bodies when legally required by subpoena, warrant,
                or statutory reporting guidelines.
              </li>
            </List>
          </Section>

          <Section title="6. International Data Transfers">
            <Paragraph>
              Because Lisah offers global multi-currency accounts and access to
              international capital markets (e.g., US equities), your
              information may be transferred to, stored, and processed in
              jurisdictions outside your home country (including the United
              States, United Kingdom, and European Union).
            </Paragraph>
            <Paragraph>
              Whenever personal data is transferred across borders, Lisah
              ensures appropriate legal safeguards—including Standard
              Contractual Clauses (SCCs), data protection agreements, and
              partner compliance with the Nigeria Data Protection Act (NDPA) and
              GDPR—to ensure your data remains protected.
            </Paragraph>
          </Section>

          <Section title="7. Data Retention Policy">
            <List>
              <li>
                <strong>Financial &amp; Transaction Records:</strong> Under
                statutory AML/KYC banking regulations, we are legally required
                to retain transaction records, trading history, and
                identification documentation for a minimum of{" "}
                <strong>five (5) to seven (7) years</strong> following the
                closure of your account.
              </li>
              <li>
                <strong>Stash Vault Contracts:</strong> Active vault contracts
                and terms of commitment are maintained for the entire lifecycle
                of the lock, plus the statutory audit window following maturity
                or liquidation.
              </li>
              <li>
                <strong>Custodial &amp; Minor Records:</strong> Records
                pertaining to custodial sub-accounts are preserved in accordance
                with statutory trust and financial record-keeping requirements
                until the dependent attains legal majority and/or account
                termination, plus statutory retention windows.
              </li>
              <li>
                <strong>De-identification:</strong> After statutory retention
                periods expire, personal records are permanently deleted or
                irreversibly anonymized for platform performance analytics.
              </li>
            </List>
          </Section>

          <Section title="8. Data Security Safeguards">
            <Paragraph>
              We implement institutional-grade technical and organizational
              safeguards, including:
            </Paragraph>
            <List>
              <li>
                <strong>Encryption:</strong> AES-256 bit encryption for data at
                rest and TLS 1.3 encryption for all data in transit.
              </li>
              <li>
                <strong>Access Controls:</strong> Role-based access control
                (RBAC), multi-factor authentication (MFA), and strict zero-trust
                network protocols.
              </li>
              <li>
                <strong>API Integrity:</strong> Secure cryptographic hashing and
                tokenized communication with brokerages and payment processors.
              </li>
              <li>
                <strong>Continuous Monitoring:</strong> Real-time threat
                detection, automated vulnerability scanning, and periodic
                third-party security audits.
              </li>
            </List>
          </Section>

          <Section title="9. Your Privacy Rights">
            <Paragraph>
              Subject to local data protection laws (such as the NDPA and GDPR),
              you hold the following rights:
            </Paragraph>
            <List>
              <li>
                <strong>Right of Access:</strong> Request confirmation and
                copies of personal data we maintain about you (and any linked
                minor sub-accounts you legally manage).
              </li>
              <li>
                <strong>Right to Rectification:</strong> Request correction of
                inaccurate, incomplete, or outdated data.
              </li>
              <li>
                <strong>Right to Erasure (“Right to be Forgotten”):</strong>{" "}
                Request deletion of your data, provided retention is not
                required by statutory financial regulations.
              </li>
              <li>
                <strong>Right to Restrict or Object:</strong> Restrict or object
                to certain non-mandatory data processing or direct marketing
                communications.
              </li>
              <li>
                <strong>Right to Data Portability:</strong> Receive your
                personal and transaction history in a structured,
                machine-readable format.
              </li>
            </List>
            <Paragraph>
              To exercise any of these rights, please submit a written request
              to our Compliance Department at <ComplianceEmail />.
            </Paragraph>
          </Section>

          <Section title="10. Third-Party Links & Services">
            <Paragraph>
              Our platform may contain links to partner websites or embedded
              third-party APIs. We are not responsible for the privacy
              practices, terms, or content of external third-party sites. We
              encourage you to review the privacy notices of any partner service
              you interact with.
            </Paragraph>
          </Section>

          <Section title="11. Family & Minor Sub-Accounts (Custodial Services)">
            <Paragraph>
              Lisah enables parents and legal guardians to establish and
              supervise custodial investment sub-accounts for their minor
              children or dependents.
            </Paragraph>
            <List>
              <li>
                <strong>Parental Authorization:</strong> All minor sub-accounts
                must be created, verified, and administered under the authority
                of a fully verified adult parent or legal guardian.
              </li>
              <li>
                <strong>Collection of Minor Data:</strong> We collect limited
                personal data of minors (such as legal name, date of birth, and
                identification documents) solely as required to establish
                custodial ledgers, satisfy regulatory AML/KYC obligations, and
                provide customized visual access.
              </li>
              <li>
                <strong>Access &amp; Governance:</strong> Where access is
                granted to a minor (e.g., read-only tracking or controlled
                financial learning interfaces), such access is supervised by and
                remains under the direct control and responsibility of the
                verified parent or legal guardian.
              </li>
              <li>
                <strong>Parental Rights:</strong> Parents and legal guardians
                retain the right to inspect, update, or request the closure and
                data deletion of minor sub-accounts, subject to statutory
                financial retention requirements.
              </li>
            </List>
          </Section>

          <Section title="12. Updates to this Privacy Policy">
            <Paragraph>
              We may update this Privacy Policy periodically to reflect
              enhancements to our trading products, custodial infrastructure,
              virtual account services, regulatory requirements, or corporate
              changes. Material changes will be communicated via in-app
              notification, email, or by updating the “Last Updated” date at the
              top of this policy.
            </Paragraph>
          </Section>

          <Section title="13. Data Protection Officer & Contact Information">
            <Paragraph>
              If you have questions, feedback, or complaints regarding this
              Privacy Policy, or wish to exercise your data rights, please
              contact our Data Protection and Compliance team:
            </Paragraph>
            <div className="text-base lg:text-lg leading-relaxed space-y-1">
              <p>
                <strong>Lisah Technologies Ltd</strong>
              </p>
              <p>
                <strong>Attention:</strong> Data Protection &amp; Compliance
                Officer
              </p>
              <p>
                <strong>Email:</strong> <ComplianceEmail />
              </p>
              <p>
                <strong>Website:</strong> <WebsiteLink />
              </p>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}
