// Sections

import Footer from "@/components/common/Footer";
import HeroPage from "./components/Landing/HeroPage";
import HowItWorks from "./components/Landing/HowItWorks";
import HostBookCards from "./components/Landing/HostBookCards";

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
