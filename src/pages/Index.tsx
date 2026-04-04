
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import HtmlEditor from '@/components/HtmlEditor';

const Index = () => {
  return (
    <div className="min-h-screen dot-grid">
      <Hero />
      <Features />

      {/* Editor section */}
      <section className="pb-4 pt-8 text-center">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl" style={{ letterSpacing: '-0.02em' }}>
            Try it yourself
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Write HTML, CSS & JavaScript below and see the result in real time.
          </p>
        </div>
      </section>

      <div id="editor">
        <HtmlEditor />
      </div>
    </div>
  );
};

export default Index;
