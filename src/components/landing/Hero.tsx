import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse,hsla(239,84%,67%,0.12)_0%,transparent_70%)]" />
        <div className="absolute top-32 left-1/4 w-[400px] h-[400px] bg-[radial-gradient(circle,hsla(187,85%,53%,0.06)_0%,transparent_70%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        {/* Badge */}
        <div
          className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 text-xs text-[#9DA3B4] backdrop-blur-sm"
          style={{ animationDelay: '0ms' }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_1px_rgba(52,211,153,0.5)]" />
          Free &amp; Open Source HTML Editor
        </div>

        {/* Headline */}
        <h1
          className="animate-fade-up mt-8 text-5xl font-extrabold leading-[1.08] tracking-tight text-white md:text-7xl lg:text-8xl"
          style={{ animationDelay: '80ms' }}
        >
          Write code.
          <br />
          <span className="bg-gradient-to-r from-indigo-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
            See it live.
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="animate-fade-up mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[#7A7F94] md:text-xl"
          style={{ animationDelay: '160ms' }}
        >
          A powerful online editor for HTML, CSS &amp; JavaScript with
          real-time preview, component library, and built-in developer tools.
        </p>

        {/* CTAs */}
        <div
          className="animate-fade-up mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          style={{ animationDelay: '240ms' }}
        >
          <Button
            asChild
            size="lg"
            className="h-12 rounded-xl bg-indigo-600 px-8 text-sm font-semibold text-white shadow-[0_0_24px_-4px_rgba(99,102,241,0.5)] transition-all hover:bg-indigo-500 hover:shadow-[0_0_32px_-4px_rgba(99,102,241,0.6)]"
          >
            <a href="#editor">
              <Sparkles className="mr-2 h-4 w-4" />
              Start Editing
            </a>
          </Button>
          <Button
            asChild
            variant="ghost"
            size="lg"
            className="h-12 rounded-xl border border-white/[0.08] px-8 text-sm font-medium text-[#9DA3B4] hover:border-white/[0.15] hover:text-white"
          >
            <Link to="/components">
              View Components
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Editor Mockup */}
        <div
          className="animate-fade-up mt-16 md:mt-20"
          style={{ animationDelay: '400ms' }}
        >
          <div className="relative rounded-2xl border border-white/[0.08] bg-[hsl(225,22%,7%)] p-1 shadow-2xl shadow-black/40">
            {/* Gradient border glow */}
            <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-b from-indigo-500/20 via-transparent to-cyan-500/10 opacity-60" style={{ padding: '1px', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }} />

            {/* Browser chrome */}
            <div className="flex items-center gap-2 rounded-t-xl bg-[hsl(225,22%,9%)] px-4 py-3">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              </div>
              <div className="ml-3 flex-1 rounded-md bg-white/[0.04] px-3 py-1 text-center">
                <span className="font-mono text-[10px] text-[#5C6178]">livehtmleditor.com</span>
              </div>
            </div>

            {/* Editor content */}
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/[0.06]">
              {/* Code side */}
              <div className="p-0">
                {/* Tabs */}
                <div className="flex border-b border-white/[0.06] bg-[hsl(225,22%,8%)]">
                  <span className="border-b-2 border-indigo-500 px-4 py-2 font-mono text-xs font-medium text-indigo-400">HTML</span>
                  <span className="px-4 py-2 font-mono text-xs text-[#5C6178]">CSS</span>
                  <span className="px-4 py-2 font-mono text-xs text-[#5C6178]">JS</span>
                </div>
                {/* Code */}
                <div className="overflow-hidden p-4 font-mono text-[11px] leading-[1.7] md:text-[12px]">
                  <div className="text-[#5C6178]">&lt;!DOCTYPE html&gt;</div>
                  <div><span className="text-[#5C6178]">&lt;</span><span className="text-rose-400">section</span> <span className="text-cyan-300">class</span><span className="text-[#5C6178]">=</span><span className="text-amber-300">"hero"</span><span className="text-[#5C6178]">&gt;</span></div>
                  <div className="ml-4"><span className="text-[#5C6178]">&lt;</span><span className="text-rose-400">h1</span><span className="text-[#5C6178]">&gt;</span><span className="text-[#d4d4d4]">Hello World</span><span className="text-[#5C6178]">&lt;/</span><span className="text-rose-400">h1</span><span className="text-[#5C6178]">&gt;</span></div>
                  <div className="ml-4"><span className="text-[#5C6178]">&lt;</span><span className="text-rose-400">p</span><span className="text-[#5C6178]">&gt;</span><span className="text-[#d4d4d4]">Build something</span></div>
                  <div className="ml-6"><span className="text-[#d4d4d4]">amazing today.</span><span className="text-[#5C6178]">&lt;/</span><span className="text-rose-400">p</span><span className="text-[#5C6178]">&gt;</span></div>
                  <div className="ml-4"><span className="text-[#5C6178]">&lt;</span><span className="text-rose-400">button</span> <span className="text-cyan-300">id</span><span className="text-[#5C6178]">=</span><span className="text-amber-300">"cta"</span><span className="text-[#5C6178]">&gt;</span></div>
                  <div className="ml-6"><span className="text-[#d4d4d4]">Get Started</span></div>
                  <div className="ml-4"><span className="text-[#5C6178]">&lt;/</span><span className="text-rose-400">button</span><span className="text-[#5C6178]">&gt;</span></div>
                  <div><span className="text-[#5C6178]">&lt;/</span><span className="text-rose-400">section</span><span className="text-[#5C6178]">&gt;</span></div>
                </div>
              </div>

              {/* Preview side */}
              <div className="bg-white p-6 md:p-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Live Preview</span>
                </div>
                <div className="text-left">
                  <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">Hello World</h2>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">Build something amazing today.</p>
                  <button className="mt-4 rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white shadow-md">Get Started</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
