import { Outlet } from "react-router-dom";

import Navbar from "@/components/navigation/navbar";
import Footer from "@/components/navigation/footer";

export default function MainLayout() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
