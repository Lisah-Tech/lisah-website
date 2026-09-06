import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import MainLayout from "@/layouts/main_layout";
import HomePage from "@/pages/homepage";
import AboutPage from "@/pages/about";
import Features from "@/pages/features";
import Pricing from "@/pages/pricing";
import EarlyAccessPage from "@/pages/early-access";
import EarlyAccessSuccessPage from "@/pages/early-access/success";
import PrivacyPolicyPage from "@/pages/privacy";
import TermsOfUsePage from "@/pages/terms";
import CareersPage from "@/pages/careers";
import BlogPage from "@/pages/blog";
import CompanyPricingPage from "@/pages/company-pricing";

function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);

  return null;
}

function App() {
  return (
    <>
      <ScrollToHash />
      <Routes>
        <Route element={<MainLayout />}>
          <Route element={<HomePage />} path="/" />
          <Route element={<AboutPage />} path="/about" />
          <Route element={<Features />} path="/features" />
          <Route element={<Pricing />} path="/pricing" />
          <Route element={<EarlyAccessPage />} path="/early-access" />
          <Route
            element={<EarlyAccessSuccessPage />}
            path="/early-access/success"
          />
          <Route element={<PrivacyPolicyPage />} path="/privacy-policy" />
          <Route element={<TermsOfUsePage />} path="/terms-of-use" />
          <Route element={<CareersPage />} path="/careers" />
          <Route element={<BlogPage />} path="/blog" />
          <Route element={<CompanyPricingPage />} path="/company-pricing" />
        </Route>
      </Routes>
    </>
  );
}

export default App;
