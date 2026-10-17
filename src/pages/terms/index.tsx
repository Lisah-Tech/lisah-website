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

export default function TermsOfUsePage() {
  return (
    <div className="min-h-screen bg-white py-12 lg:py-20">
      <div className="mx-auto max-w-4xl px-4 lg:px-12">
        {/* Header */}
        <div className="mb-12 space-y-4">
          <h1 className="text-3xl lg:text-5xl font-normal text-lisah-green text-center">
            Terms of Use
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
            Welcome to Lisah. These Terms of Use (“Terms”) govern your access to
            and use of the Lisah website, mobile application, APIs, and services
            (collectively, the “Service”). By accessing or using our Service,
            you agree to be bound by these Terms.
          </Paragraph>
          <Paragraph>
            The Service is operated by <strong>Lisah Technologies Ltd</strong>{" "}
            (“Lisah,” “we,” “us,” or “our”). If you do not agree to these Terms,
            you may not access or use the Service.
          </Paragraph>

          <Section title="1. The Nature of Our Service">
            <Subheading>
              1.1 Multi-Asset Investment &amp; Trading Platform
            </Subheading>
            <Paragraph>
              Lisah provides a technology platform that enables users to manage
              multi-currency balances, execute standard spot market trades,
              build and follow custom and thematic portfolios, and deploy
              disciplined, programmatic savings vaults (“Lisah Stash”).
            </Paragraph>

            <Subheading>
              1.2 Technology Provider Status (Not a Broker-Dealer or Custodian)
            </Subheading>
            <Paragraph>
              Lisah is a financial technology infrastructure provider.{" "}
              <strong>
                We are not a licensed broker-dealer, investment adviser, banking
                institution, or asset custodian.
              </strong>{" "}
              All financial transactions, asset custody, multi-currency virtual
              accounts, and trade executions are facilitated through licensed
              third-party partners, including registered broker-dealers, digital
              asset custodians, and regulated payment service providers
              (“Regulatory Partners” or “Partner Brokers”). Lisah does not
              provide financial, investment, legal, or tax advice.
            </Paragraph>
          </Section>

          <Section title="2. Account Registration, KYC & Multi-Currency Virtual Accounts">
            <Subheading>2.1 Eligibility &amp; Verification</Subheading>
            <Paragraph>
              To use Lisah, you must be at least 18 years old and possess the
              legal capacity to form a binding contract. You agree to undergo
              customer due diligence and Identity Verification (KYC/AML)
              procedures as mandated by our Regulatory Partners before accessing
              funding, trading, or vaulting services.
            </Paragraph>

            <Subheading>
              2.2 Multi-Currency Virtual Accounts (GBP, EUR, USD, NGN)
            </Subheading>
            <List>
              <li>
                <strong>Virtual Account Services:</strong> Lisah provides access
                to designated multi-currency virtual accounts in{" "}
                <strong>
                  British Pounds (GBP), Euros (EUR), United States Dollars
                  (USD), and Nigerian Naira (NGN)
                </strong>{" "}
                issued by licensed payment and banking partners.
              </li>
              <li>
                <strong>Segregation of Funds:</strong> Fiat funds held in
                virtual accounts are maintained by our regulated banking and
                payment partners in segregated customer accounts in accordance
                with applicable banking regulations.
              </li>
              <li>
                <strong>Funding &amp; Withdrawals:</strong> You may fund your
                account or withdraw balances using supported local payment
                rails, domestic wire transfers, or regulated partner channels.
                Currency conversions between GBP, EUR, USD, and NGN are subject
                to prevailing partner exchange rates and applicable transaction
                fees disclosed at the time of conversion.
              </li>
            </List>
          </Section>

          <Section title="3. Spot Trading & Portfolio Management">
            <Subheading>3.1 Unrestricted Spot Balances</Subheading>
            <List>
              <li>
                <strong>Spot Trading:</strong> Users may place standard market
                orders, limit orders, or set independent Take Profit (TP) and
                Stop Loss (SL) triggers across supported US stocks,
                exchange-traded funds (ETFs), and digital assets.
              </li>
              <li>
                <strong>Liquid Custody:</strong> Non-locked assets and unlocked
                balances reside in your <strong>Spot Balances</strong>. These
                assets are fully liquid and may be traded, rebalanced, or
                liquidated at your discretion during operational market hours,
                subject to broker settlement cycles and applicable laws.
              </li>
            </List>

            <Subheading>3.2 Custom &amp; Thematic Portfolios</Subheading>
            <List>
              <li>
                <strong>User-Created Portfolios:</strong> You may create,
                configure, and manage personalized portfolio allocations
                comprising supported equities, ETFs, and digital assets.
              </li>
              <li>
                <strong>Partner Thematic Portfolios:</strong> Lisah may provide
                access to pre-made thematic baskets, index models, and curated
                portfolios developed in partnership with third-party asset
                managers, research providers, or fintech partners.
              </li>
              <li>
                <strong>Self-Directed Execution:</strong> All portfolio
                selections, asset weighting adjustments, and rebalancing actions
                are entirely self-directed and initiated by you. The inclusion
                of any third-party thematic portfolio on our platform does not
                constitute an endorsement, recommendation, or investment advice
                by Lisah.
              </li>
            </List>
          </Section>

          <Section title="4. Lisah Stash (Time-Locked & Rule-Based Vaults)">
            <Subheading>4.1 Stash Vault Commitment</Subheading>
            <Paragraph>
              Lisah offers an optional behavioral finance tool (“Stash”)
              allowing users to programmatically lock selected assets to
              encourage disciplined, long-term wealth retention. When you
              activate a Stash configuration:
            </Paragraph>
            <List>
              <li>
                The selected assets are routed to your{" "}
                <strong>Lisah Stash Balances</strong> and segregated from your
                liquid Spot Balances.
              </li>
              <li>
                Locks may be configured using preset durations (e.g., 1 Week, 1
                Year, 4 Years) or a custom duration, provided the release date
                is <strong>at least 24 hours</strong> from the timestamp of
                order execution.
              </li>
            </List>

            <Subheading>4.2 Irrevocability &amp; Vault Constraints</Subheading>
            <List>
              <li>
                <strong>Binding Nature:</strong> By locking assets in a Stash
                vault, you acknowledge and agree that the lock is programmatic
                and binding. Neither you nor Lisah can unilaterally unlock or
                withdraw assets prior to the expiration of the chosen lock
                period or the triggering of pre-configured exit rules.
              </li>
              <li>
                <strong>Downside Bailout Rule:</strong> Users may define a
                downside safety threshold (“Bailout”). To preserve vault
                discipline while mitigating catastrophic risk, the Bailout price
                cannot be configured lower than{" "}
                <strong>60% below the entry price</strong> (a maximum allowable
                drawdown of 60%).
              </li>
              <li>
                <strong>Auto-Liquidation Mechanics:</strong>
                <ul className="list-[circle] pl-6 mt-2 space-y-2">
                  <li>
                    <strong>Auto-Liquidation ON:</strong> If your Stash reaches
                    its Target Exit Price, hits its Bailout threshold, or
                    matures by duration, an automated market sell order is
                    submitted via the Partner Broker. Net liquidation proceeds
                    settle in your Cash Balance.
                  </li>
                  <li>
                    <strong>Auto-Liquidation OFF:</strong> If your Stash reaches
                    its Target Exit Price, hits its Bailout threshold, or
                    matures by duration, the asset is automatically unlocked and
                    transferred directly to your liquid{" "}
                    <strong>Spot Balances</strong> without triggering a sale.
                  </li>
                </ul>
              </li>
              <li>
                <strong>Mutual Exclusivity:</strong> Stash (Lock) configurations
                and standard short-term TP/SL orders are mutually exclusive.
                Assets cannot be simultaneously committed to a Stash vault and
                an external short-term bracket order.
              </li>
            </List>

            <Subheading>4.3 Market Risk in Vaults</Subheading>
            <Paragraph>
              Time-locking an asset does not protect against market
              depreciation, asset illiquidity, or adverse price movements. The
              market value of assets in your Stash may decline during the lock
              duration. You lock assets entirely at your own financial risk.
            </Paragraph>
          </Section>

          <Section title="5. Third-Party Integrations & Partner Brokerage APIs">
            <Subheading>
              5.1 Account Linking &amp; Trade Instructions
            </Subheading>
            <Paragraph>
              To execute trades and manage vaults, Lisah transmits programmatic
              instructions via API to regulated Partner Brokers and digital
              asset custodians. By submitting an order on Lisah, you authorize
              Lisah to relay your execution, locking, and liquidation
              instructions to our underlying partners.
            </Paragraph>

            <Subheading>
              5.2 Partner Terms &amp; Execution Disclaimers
            </Subheading>
            <Paragraph>
              Your brokerage custody and execution relationship is governed by
              the independent terms and disclosures of the respective Partner
              Broker or Custodian. Lisah is not liable for:
            </Paragraph>
            <List>
              <li>
                Exchange halts, market closures, unexpected liquidity gaps, or
                off-market trading delays.
              </li>
              <li>
                Partner brokerage downtime, network timeouts, or regulatory
                restrictions placed on your underlying brokerage account.
              </li>
            </List>
          </Section>

          <Section title="6. Beneficiary Designation & Private Trust Framework">
            <Subheading>6.1 Beneficiary Designation</Subheading>
            <Paragraph>
              Lisah permits users to nominate beneficiaries for assets
              maintained in Stash vaults and account portfolios. You represent
              that all contact details provided for nominated beneficiaries are
              accurate and lawful.
            </Paragraph>

            <Subheading>6.2 Legal Framework</Subheading>
            <Paragraph>
              The post-maturity or legacy transfer of assets is facilitated
              through agreements with our Regulatory Partners and regulated
              trust frameworks. While Lisah provides the user interface for
              beneficiary designation, legal title transfer remains subject to
              applicable succession laws, tax requirements, and the custodial
              terms of the partner broker.
            </Paragraph>
          </Section>

          <Section title="7. Prohibited Conduct">
            <Paragraph>You agree not to:</Paragraph>
            <List>
              <li>
                Use the Service for money laundering, terrorist financing,
                fraud, or any unlawful activity.
              </li>
              <li>
                Exploit software vulnerabilities or attempt to circumvent
                programmatic time-lock or bailout constraints.
              </li>
              <li>
                Interfere with, intercept, or reverse-engineer API
                communications between Lisah and its Partner Brokers.
              </li>
              <li>
                Access the Service using automated scraping tools, bots, or
                unauthorized endpoints.
              </li>
            </List>
          </Section>

          <Section title="8. Limitation of Liability">
            <Paragraph>
              To the maximum extent permitted by applicable law, Lisah
              Technologies Ltd, its directors, officers, and affiliates shall
              not be liable for any indirect, incidental, punitive, or
              consequential damages resulting from:
            </Paragraph>
            <List>
              <li>
                Market fluctuations, price slippage, or capital losses incurred
                in Spot Balances, Portfolios, or Stash Vaults.
              </li>
              <li>
                Your inability to manually trade, transfer, or liquidate assets
                committed to an active Stash lock prior to its release
                conditions.
              </li>
              <li>
                Downtime, API interruptions, or execution failures originating
                from third-party brokerages, digital asset custodians, or
                multi-currency virtual account banking partners.
              </li>
              <li>
                Currency conversion losses resulting from foreign exchange rate
                movements between GBP, EUR, USD, and NGN.
              </li>
            </List>
          </Section>

          <Section title="9. Governing Law & Dispute Resolution">
            <Paragraph>
              These Terms shall be governed by and construed in accordance with
              the laws of the <strong>Federal Republic of Nigeria</strong>,
              without regard to conflict of law principles. Any dispute arising
              out of or in connection with these Terms shall be resolved through
              good-faith mutual consultation; failing which, it shall be
              submitted to final and binding arbitration in accordance with the
              Arbitration and Mediation Act of Nigeria.
            </Paragraph>
          </Section>

          <Section title="10. Contact Information">
            <Paragraph>
              For legal notices, compliance queries, regulatory disclosures, or
              questions regarding these Terms of Use, please contact:
            </Paragraph>
            <div className="text-base lg:text-lg leading-relaxed space-y-1">
              <p>
                <strong>Lisah Technologies Ltd</strong>
              </p>
              <p>
                <strong>Email:</strong>{" "}
                <a
                  className="text-lisah-green hover:underline"
                  href="mailto:compliance@uselisah.com"
                >
                  compliance@uselisah.com
                </a>
              </p>
              <p>
                <strong>Website:</strong>{" "}
                <a
                  className="text-lisah-green hover:underline"
                  href="https://uselisah.com"
                >
                  https://uselisah.com
                </a>
              </p>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}
