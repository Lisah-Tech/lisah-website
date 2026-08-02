import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "@heroui/react";

export default function EarlyAccessPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    longTermOutlook: "",
    marketingConsent: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.longTermOutlook) {
      newErrors.longTermOutlook = "Please select an option";
    }

    if (!formData.marketingConsent) {
      newErrors.marketingConsent = "Marketing consent is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Create URLSearchParams for Netlify Forms
      const params = new URLSearchParams();
      params.append("form-name", "early-access");
      params.append("firstName", formData.firstName);
      params.append("lastName", formData.lastName);
      params.append("email", formData.email);
      params.append("longTermOutlook", formData.longTermOutlook);
      params.append("marketingConsent", formData.marketingConsent ? "Yes" : "No");

      // Submit to Netlify Forms
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      });

      // Check if submission was successful
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Navigate to success page
      navigate("/early-access/success");
    } catch (err) {
      console.error("Submission failed:", err);
      const errorMessage =
        err instanceof Error ? err.message : "Failed to submit. Please try again later.";
      setErrors({
        submit: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-white">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
            Get Early Access Notification
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Get exclusive updates on Lisah's milestones, app store launch dates,
            and special offers reserved for early access.
          </p>
        </div>

        <form 
          name="early-access" 
          data-netlify="true" 
          netlify-honeypot="bot-field"
          className="space-y-6" 
          onSubmit={handleSubmit}
        >
          {/* Hidden field for Netlify bot protection */}
          <input type="hidden" name="form-name" value="early-access" />
          <div style={{ display: "none" }}>
            <label>
              Don't fill this out if you're human: <input name="bot-field" />
            </label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Input
                isRequired
                errorMessage={errors.firstName}
                isInvalid={!!errors.firstName}
                label="First Name"
                name="firstName"
                placeholder="Enter your first name"
                radius="lg"
                size="lg"
                type="text"
                value={formData.firstName}
                variant="bordered"
                classNames={{
                  inputWrapper: errors.firstName
                    ? "border-red-500"
                    : "border-primary",
                }}
                onValueChange={(value) => handleInputChange("firstName", value)}
              />
            </div>

            <div className="space-y-2">
              <Input
                isRequired
                errorMessage={errors.lastName}
                isInvalid={!!errors.lastName}
                label="Last Name"
                name="lastName"
                placeholder="Enter your last name"
                radius="lg"
                size="lg"
                type="text"
                value={formData.lastName}
                variant="bordered"
                classNames={{
                  inputWrapper: errors.lastName
                    ? "border-red-500"
                    : "border-primary",
                }}
                onValueChange={(value) => handleInputChange("lastName", value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Input
              isRequired
              errorMessage={errors.email}
              isInvalid={!!errors.email}
              label="Email Address"
              name="email"
              placeholder="you@example.com"
              radius="lg"
              size="lg"
              type="email"
              value={formData.email}
              variant="bordered"
              classNames={{
                inputWrapper: errors.email
                  ? "border-red-500"
                  : "border-primary",
              }}
              onValueChange={(value) => handleInputChange("email", value)}
            />
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Do you currently hold crypto, stocks or equities with a long-term
              outlook (2+ year) or for yourself or for the benefit of your
              dependents?
              <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  checked={formData.longTermOutlook === "Yes"}
                  className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                  name="longTermOutlook"
                  type="radio"
                  value="Yes"
                  onChange={(e) =>
                    handleInputChange("longTermOutlook", e.target.value)
                  }
                />
                <span className="text-gray-700">Yes</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  checked={formData.longTermOutlook === "No"}
                  className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                  name="longTermOutlook"
                  type="radio"
                  value="No"
                  onChange={(e) =>
                    handleInputChange("longTermOutlook", e.target.value)
                  }
                />
                <span className="text-gray-700">No</span>
              </label>
            </div>
            {errors.longTermOutlook && (
              <p className="text-sm text-red-500">{errors.longTermOutlook}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                checked={formData.marketingConsent}
                className="mt-1 w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                name="marketingConsent"
                required
                type="checkbox"
                onChange={(e) =>
                  handleInputChange("marketingConsent", e.target.checked)
                }
              />
              <span className="text-sm text-gray-700">
                Yes, I would like to receive promotional and product updates. I
                understand I can unsubscribe from these communications at any
                time.
                <span className="text-red-500 ml-1">*</span>
              </span>
            </label>
            {errors.marketingConsent && (
              <p className="text-sm text-red-500 ml-7">
                {errors.marketingConsent}
              </p>
            )}
          </div>

          {errors.submit && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{errors.submit}</p>
            </div>
          )}

          <Button
            className="w-full bg-primary text-black font-semibold py-6 shadow-md"
            isLoading={isSubmitting}
            radius="full"
            size="lg"
            type="submit"
          >
            {isSubmitting ? "Submitting..." : "SUBMIT"}
          </Button>
        </form>
      </div>
    </div>
  );
}

