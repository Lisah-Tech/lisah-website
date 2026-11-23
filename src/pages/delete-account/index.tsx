import { Link } from "react-router-dom";

const SUPPORT_EMAIL = "support@uselisah.com";

export default function DeleteAccountPage() {
  return (
    <div className="min-h-screen bg-white py-12 lg:py-20">
      <div className="mx-auto max-w-4xl px-4 lg:px-12">
        {/* Header */}
        <div className="mb-12 space-y-4">
          <h1 className="text-3xl lg:text-5xl font-normal text-lisah-green text-center">
            Delete Your Account
          </h1>
          <div className="text-center text-gray-600">
            <p className="text-base lg:text-lg">Lisah Technologies Ltd</p>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6 text-gray-700 text-base lg:text-lg leading-relaxed">
          <p>
            To delete your Lisah account and the personal data linked to it,
            send an email to our support team at{" "}
            <a
              className="font-semibold text-lisah-green hover:underline"
              href={`mailto:${SUPPORT_EMAIL}?subject=Account%20deletion%20request`}
            >
              {SUPPORT_EMAIL}
            </a>
            .
          </p>
          <p>
            Please send the request from the email address registered to your
            Lisah account so we can confirm it is you. Our team will get back to
            you to complete the deletion.
          </p>
          <p>
            Some records may be kept for as long as financial regulations
            require. See our{" "}
            <Link
              className="font-semibold text-lisah-green hover:underline"
              to="/privacy-policy"
            >
              Privacy Policy
            </Link>{" "}
            for details.
          </p>

          <div className="pt-4 text-center">
            <a
              className="inline-block rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-black shadow-md"
              href={`mailto:${SUPPORT_EMAIL}?subject=Account%20deletion%20request`}
            >
              Email {SUPPORT_EMAIL}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
