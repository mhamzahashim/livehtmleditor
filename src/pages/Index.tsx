
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import HtmlEditor from '@/components/HtmlEditor';

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Landing sections */}
      <div className="ambient-bg dot-grid">
        <Hero />
        <Features />

        {/* Editor section header */}
        <section className="relative z-10 pb-6 pt-8 text-center">
          <div className="mx-auto max-w-2xl px-6">
            <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
              Try it yourself
            </h2>
            <p className="mt-2 text-sm text-[#7A7F94]">
              Write HTML, CSS &amp; JavaScript below and see the result in real time.
            </p>
          </div>
        </section>
      </div>

      {/* Editor */}
      <div id="editor" className="ambient-bg dot-grid">
        <HtmlEditor />
      </div>
    </div>
  );
};

export default Index;
