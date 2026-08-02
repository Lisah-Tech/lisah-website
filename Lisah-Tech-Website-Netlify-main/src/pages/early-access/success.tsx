import { Image } from "@heroui/react";
// TODO: Replace this import with your success icon PNG
// Example: import SuccessIcon from "@/assets/images/your-success-icon.png";
import LogoGreen from "@/assets/images/Lisah_logo_green.png";

export default function EarlyAccessSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-white">
      <div className="max-w-md w-full text-center space-y-8 py-12">
        <div className="flex justify-center">
          <div className="relative">
            {/* Decorative dots */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 flex gap-2">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <div className="w-2 h-2 bg-primary rounded-full" />
              <div className="w-2 h-2 bg-primary rounded-full" />
            </div>
            {/* Success icon - Currently using logo as placeholder */}
            {/* Replace LogoGreen with your success icon PNG */}
            <div className="relative">
              <Image
                alt="Success"
                className="w-28 h-28"
                radius="none"
                src={LogoGreen}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
            You're all set!
          </h2>
          <p className="text-lg text-gray-600">
            Keep an eye on your inbox for those exclusive updates.
          </p>
        </div>
      </div>
    </div>
  );
}

