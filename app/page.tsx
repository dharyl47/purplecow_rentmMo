// Sections
import HeroPage from "@/app/pageComponents/landing/HeroPage";
import HowItWorks from "@/app/pageComponents/landing/HowItWorks";
import HostBookCards from "@/app/pageComponents/landing/HostBookCards";
import Footer from "@/components/common/Footer";

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
