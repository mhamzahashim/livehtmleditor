import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="pt-12 pb-16 md:pt-20 md:pb-24">
      <div className="mx-auto max-w-4xl px-6 text-center">
        {/* Badge */}
        <div
          className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-1.5 text-xs font-medium text-muted-foreground shadow-warm-sm"
          style={{ animationDelay: '0ms' }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
          Free & Open Source
        </div>

        {/* Headline */}
        <h1
          className="animate-fade-up mt-8 text-4xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
          style={{ animationDelay: '80ms', letterSpacing: '-0.03em' }}
        >
          Write code.{' '}
          <span className="bg-gradient-to-r from-amber-600 via-orange-500 to-amber-500 bg-clip-text text-transparent">
            See it live.
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="animate-fade-up mx-auto mt-6 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg"
          style={{ animationDelay: '160ms' }}
        >
          A powerful online editor for HTML, CSS & JavaScript with real-time preview, 100+ components, and built-in dev tools.
        </p>

        {/* CTAs */}
        <div
          className="animate-fade-up mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          style={{ animationDelay: '240ms' }}
        >
          <Button
            asChild
            size="lg"
            className="h-11 rounded-xl bg-amber-600 px-6 text-sm font-semibold text-white cta-glow transition-all hover:bg-amber-500 hover:scale-[1.02] active:scale-[0.98]"
          >
            <a href="#editor">
              Start Editing
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-11 rounded-xl px-6 text-sm font-medium"
          >
            <Link to="/components">
              Browse Components
            </Link>
          </Button>
        </div>

        {/* Product Mockup */}
        <div
          className="animate-fade-up mt-14 md:mt-20"
          style={{ animationDelay: '400ms' }}
        >
          <div className="rounded-2xl border border-border bg-white shadow-warm-xl overflow-hidden">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 border-b border-border bg-background px-4 py-2.5">
              <div className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-amber-400" />
                <span className="h-3 w-3 rounded-full bg-green-400" />
              </div>
              <div className="ml-3 flex-1 rounded-lg bg-muted px-3 py-1 text-center">
                <span className="font-mono text-[11px] text-muted-foreground">livehtmleditor.com</span>
              </div>
            </div>

            {/* Split view */}
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
              {/* Code Panel */}
              <div className="bg-[#0f1117]">
                {/* Tab bar */}
                <div className="flex border-b border-white/[0.06]">
                  <span className="border-b-2 border-amber-500 px-4 py-2.5 font-mono text-[11px] font-medium text-amber-400">HTML</span>
                  <span className="px-4 py-2.5 font-mono text-[11px] text-stone-500">CSS</span>
                  <span className="px-4 py-2.5 font-mono text-[11px] text-stone-500">JS</span>
                </div>
                {/* Fake code */}
                <div className="p-5 font-mono text-[11px] leading-[1.8] text-left md:text-[12px]">
                  <div className="text-stone-500">&lt;!DOCTYPE html&gt;</div>
                  <div><span className="text-stone-500">&lt;</span><span className="text-rose-400">section</span> <span className="text-sky-300">class</span><span className="text-stone-500">=</span><span className="text-amber-300">"hero"</span><span className="text-stone-500">&gt;</span></div>
                  <div className="ml-4"><span className="text-stone-500">&lt;</span><span className="text-rose-400">h1</span><span className="text-stone-500">&gt;</span><span className="text-stone-200">Hello World</span><span className="text-stone-500">&lt;/</span><span className="text-rose-400">h1</span><span className="text-stone-500">&gt;</span></div>
                  <div className="ml-4"><span className="text-stone-500">&lt;</span><span className="text-rose-400">p</span><span className="text-stone-500">&gt;</span><span className="text-stone-200">Build something</span></div>
                  <div className="ml-6"><span className="text-stone-200">amazing today.</span><span className="text-stone-500">&lt;/</span><span className="text-rose-400">p</span><span className="text-stone-500">&gt;</span></div>
                  <div className="ml-4"><span className="text-stone-500">&lt;</span><span className="text-rose-400">button</span><span className="text-stone-500">&gt;</span><span className="text-stone-200">Get Started</span><span className="text-stone-500">&lt;/</span><span className="text-rose-400">button</span><span className="text-stone-500">&gt;</span></div>
                  <div><span className="text-stone-500">&lt;/</span><span className="text-rose-400">section</span><span className="text-stone-500">&gt;</span></div>
                </div>
              </div>

              {/* Preview Panel */}
              <div className="bg-white p-8 text-left">
                <div className="flex items-center gap-2 mb-5">
                  <span className="live-dot" />
                  <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.06em]">Live Preview</span>
                </div>
                <h2 className="text-3xl font-bold text-foreground">Hello World</h2>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">Build something amazing today.</p>
                <button className="mt-5 rounded-lg bg-amber-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-amber-500 transition-colors">Get Started</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
