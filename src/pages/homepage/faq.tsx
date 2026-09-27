import { Accordion, AccordionItem } from "@heroui/react";

const faqItems = [
  {
    id: 1,
    question: "What is Lisah?",
    answer:
      "Lisah is an all-in-one financial platform that helps you build wealth through global investments, smart savings, and international money transfers.",
  },
  {
    id: 2,
    question: "Is my money safe?",
    answer:
      "Yes. Lisah works with recognized and regulated custody partners to ensure your funds and assets are fully secure.",
  },
  {
    id: 3,
    question: "How do I fund my account and withdraw funds?",
    answer:
      "You can deposit your local currency completely free of charge. Lisah makes on-ramping and off-ramping seamless with some of the lowest commissions in the industry.",
  },
  {
    id: 4,
    question: "Can I save and invest at the same time?",
    answer:
      "Yes! Lisah offers asset-backed fixed savings where your traditional savings are tied to diversified asset classes like stocks, ETFs, crypto, commodities, gold, and silver.",
  },
  {
    id: 5,
    question: "How does earning yield work?",
    answer:
      "You earn passive yield on select assets just by holding them in your portfolio. Plus, you still enjoy standard dividends and all the benefits of asset growth.",
  },
  {
    id: 6,
    question: "How much do I need to start investing?",
    answer:
      "You can start investing with as little as 2,000 NGN. Lisah removes traditional barriers by eliminating high minimum fees, making it the ideal choice for Dollar Cost Averaging (DCA).",
  },
  {
    id: 7,
    question: "What are Smart Portfolios?",
    answer:
      "Smart Portfolios allow you to set up custom rules to auto-invest and automatically rebalance your favorite assets. You can also follow curated industry or thematic portfolios, or build your own from scratch.",
  },
];

export default function FAQ() {
  return (
    <div className="mx-auto max-w-7xl px-4 lg:px-12 space-y-12" id="faq">
      <h2 className="text-3xl lg:text-5xl font-normal text-lisah-green text-center">
        Frequently Asked Questions <br />
        (FAQ)
      </h2>

      <div>
        <Accordion
          itemClasses={{
            content: "pt-2 pb-6 text-gray-600",
            title:
              "text-lg lg:text-xl font-normal hover:text-lisah-green transition-colors cursor-pointer",
          }}
        >
          {faqItems.map((item) => (
            <AccordionItem
              key={item.id}
              aria-label={item.question}
              title={item.question}
            >
              {item.answer}
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
