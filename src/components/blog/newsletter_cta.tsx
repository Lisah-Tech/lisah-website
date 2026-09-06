import { Link } from "react-router-dom";
import { Button } from "@heroui/react";
import { FiArrowRight } from "react-icons/fi";

interface NewsletterCtaProps {
  title?: string;
  description?: string;
}

export default function NewsletterCta({
  title = "Discipline beats timing.",
  description = "Join the early access list and be first to lock your portfolio toward the goals that matter.",
}: NewsletterCtaProps) {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-primary-bg px-6 py-12 text-center sm:px-12 lg:py-16">
      <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-light-lisah-green blur-[90px]" />
      <div className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-light-lisah-green blur-[90px]" />

      <div className="relative mx-auto max-w-2xl space-y-5">
        <h2 className="text-2xl font-bold text-gray-900 lg:text-4xl">
          {title}
        </h2>
        <p className="text-sm text-gray-600 lg:text-base">{description}</p>
        <Button
          as={Link}
          className="bg-primary px-8 py-6 font-semibold text-black shadow-md"
          endContent={<FiArrowRight />}
          radius="full"
          size="sm"
          to="/early-access"
        >
          GET EARLY ACCESS
        </Button>
      </div>
    </section>
  );
}
