
import Hero from '@/components/landing/Hero';
import HtmlEditor from '@/components/HtmlEditor';
import Features from '@/components/landing/Features';
import TrustBar from '@/components/landing/TrustBar';
import Stats from '@/components/landing/Stats';
import UseCases from '@/components/landing/UseCases';
import Comparison from '@/components/landing/Comparison';
import Testimonials from '@/components/landing/Testimonials';
import Faq from '@/components/landing/Faq';
import CtaBanner from '@/components/landing/CtaBanner';

const Index = () => {
  return (
    <div className="min-h-screen dot-grid">
      <Hero />

      <div id="editor">
        <HtmlEditor />
      </div>

      <Features />
      <TrustBar />
      <CtaBanner
        headline="Try it yourself"
        subtext="Scroll up to the editor and start writing code. No signup needed."
      />
      <Stats />
      <UseCases />
      <Comparison />
      <Testimonials />
      <Faq />
      <CtaBanner />
    </div>
  );
};

export default Index;
