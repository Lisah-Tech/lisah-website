import { Accordion, AccordionItem } from "@heroui/react";

const faqItems = [
  {
    id: 1,
    question:
      "What is Lisah and how is it different from a standard brokerage app?",
    answer:
      "Lisah is a secure vault for long-term assets. Through SEC-regulated partners, we provide access to stocks, indices, and cryptocurrencies with a portfolio lock to prevent impulse selling during market downturns. Our platform also features auto-liquidation at your target prices and secure beneficiary transfers.",
  },
  {
    id: 2,
    question: "What assets can I lock up with Lisah?",
    answer:
      "Lisah supports a selection of major stocks and cryptocurrencies available through our network of regulated financial partners. View list of assets here.",
  },
  {
    id: 3,
    question: "What are the minimum and maximum lock-up periods?",
    answer:
      "You can set a lock-up period for a minimum of 6 months up to a current maximum of 4 years. This may be extended in the future. We encourage choosing a period that aligns with your long-term financial goals.",
  },
  {
    id: 4,
    question: "Where are my assets held, and are they safe?",
    answer:
      "Your assets are held in custody by our regulated and licensed broker and exchange partners. This ensures that your investments benefit from the security and oversight of established financial institutions and regulations.",
  },
  {
    id: 8,
    question: "Can I access my funds before the scheduled release date?",
    answer:
      "No. The purpose of Lisah is to enforce commitment. Once an asset is time-locked, neither the user nor Lisah can initiate an early sale or withdrawal. Only lock up capital you won’t need until the chosen release date.",
  },
  {
    id: 9,
    question: "What is Auto-Liquidation?",
    answer:
      "Auto-Liquidation is an optional feature you can toggle on when setting your lock-up date. If ON, your assets will automatically be sold at the current market price on the release date, and the cash proceeds sent to your linked bank account. If OFF, the assets simply unlock, and you regain manual trading control on that date.",
  },
  {
    id: 10,
    question:
      "How long does it take to receive my funds after the release date?",
    answer:
      "If Auto-Liquidation is ON, assets are sold immediately on the release date. Cash settlement and bank transfer follow the standard timelines of the broker and your bank.",
  },
  {
    id: 11,
    question: "Will I be notified when my lock-up period is ending?",
    answer:
      "Yes. Lisah sends reminders via email and/or in-app notifications well before your scheduled release date so you can confirm whether Auto-Liquidation should proceed or if you prefer manual control.",
  },
  {
    id: 12,
    question: "Can I see my portfolio performance during the lock-up period?",
    answer:
      "Yes. You can log in at any time to view your portfolio value, track performance, and see the countdown to your release date.",
  },
  {
    id: 13,
    question: "Can I add more funds to a locked position?",
    answer:
      "Yes, you can. Lisah supports topping up existing locked positions at any time to encourage long-term commitment and dollar-cost averaging.",
  },
];

export default function FAQ() {
  return (
    <div id="faq" className="mx-auto max-w-7xl px-4 lg:px-12 space-y-12">
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
