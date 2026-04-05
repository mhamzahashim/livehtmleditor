
import Hero from '@/components/landing/Hero';
import HtmlEditor from '@/components/HtmlEditor';

const Index = () => {
  return (
    <div className="min-h-screen dot-grid">
      <Hero />

      <div id="editor">
        <HtmlEditor />
      </div>
    </div>
  );
};

export default Index;
