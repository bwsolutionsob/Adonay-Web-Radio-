import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CommunitySection from "@/components/CommunitySection";
import Footer from "@/components/Footer";
import BibleVerseSection from "@/components/VersiculosSection";
import { RadioProvider } from "@/contexts/RadioContext";
import BibleVerseSection from "@/components/VersiculosSection";

const Index = () => {
  return (
    <RadioProvider>
      <div className="min-h-screen">
        <Header />
        <main>
          <HeroSection />

          {/* Seção do versículo do dia */}
          <BibleVerseSection />

          <CommunitySection />
          <BibleVerseSection />
        </main>
        <Footer />
      </div>
    </RadioProvider>
  );
};

export default Index;
