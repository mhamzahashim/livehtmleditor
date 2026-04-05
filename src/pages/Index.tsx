
import Hero from '@/components/landing/Hero';
import HtmlEditor from '@/components/HtmlEditor';
import Features from '@/components/landing/Features';
import TrustBar from '@/components/landing/TrustBar';
import UseCases from '@/components/landing/UseCases';
import Comparison from '@/components/landing/Comparison';
import Testimonials from '@/components/landing/Testimonials';
import Faq from '@/components/landing/Faq';
import Divider from '@/components/landing/Divider';

const Index = () => {
  return (
    <div className="min-h-screen dot-grid">
      <Hero />

      <div id="editor">
        <HtmlEditor />
      </div>

      <Divider />
      <Features />
      <Divider />
      <TrustBar />
      <Divider />
      <UseCases />
      <Divider />
      <Comparison />
      <Divider />
      <Testimonials />
      <Divider />
      <Faq />
    </div>
  );
};

export default Index;
