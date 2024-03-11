// Sections

import Footer from "@/components/common/Footer";
import HeroPage from "../components/landing/HeroPage";
import HowItWorks from "../components/landing/HowItWorks";
import HostBookCards from "../components/landing/HostBookCards";

export default function Home() {
  return (
    <main>
      <div>
        <HeroPage />
        <HowItWorks />
        <HostBookCards />
        <Footer />
      </div>
    </main>
  );
}
