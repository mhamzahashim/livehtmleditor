import { Shield, Zap, UserX, Globe, Sparkles, Lock } from 'lucide-react';

const reasons = [
  {
    icon: Shield,
    title: 'Free Forever',
    description: 'No hidden fees, no premium tier, no feature gates. Every tool is available to everyone, always.',
    visual: (
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-emerald-400" />
          <span className="font-mono text-xs text-emerald-600">$0.00</span>
          <span className="text-xs text-muted-foreground">/forever</span>
        </div>
        <div className="space-y-1.5">
          {['All features included', 'No credit card', 'No trial limits'].map((t) => (
            <div key={t} className="flex items-center gap-2 text-[11px] text-muted-foreground">
              <div className="h-px w-3 bg-emerald-300" />
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    gradient: 'from-emerald-50 to-teal-50',
    borderAccent: 'group-hover:border-emerald-200',
    iconColor: 'text-emerald-600',
    iconBg: 'bg-emerald-100',
  },
  {
    icon: UserX,
    title: 'No Signup Required',
    description: 'Start coding the moment you land on the page. No accounts, no emails, no passwords.',
    visual: (
      <div className="flex items-center gap-3">
        <div className="flex flex-col items-center gap-1">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-dashed border-sky-200 bg-sky-50">
            <span className="text-xs text-sky-400">@</span>
          </div>
          <div className="h-4 w-px bg-sky-200" />
          <span className="font-mono text-[10px] text-sky-400 line-through">required</span>
        </div>
        <div className="text-lg text-sky-300">&rarr;</div>
        <div className="flex flex-col items-center gap-1">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-sky-300 bg-sky-100">
            <span className="text-sm">&#60;/&#62;</span>
          </div>
          <div className="h-4 w-px bg-transparent" />
          <span className="font-mono text-[10px] font-medium text-sky-600">code</span>
        </div>
      </div>
    ),
    gradient: 'from-sky-50 to-blue-50',
    borderAccent: 'group-hover:border-sky-200',
    iconColor: 'text-sky-600',
    iconBg: 'bg-sky-100',
  },
  {
    icon: Zap,
    title: 'Instant Live Preview',
    description: 'Every keystroke updates the preview in real time. Click any element to jump to its source.',
    visual: (
      <div className="flex items-center gap-2">
        <div className="flex h-8 items-center gap-1 rounded-md border border-amber-200 bg-amber-50 px-2">
          <span className="font-mono text-[10px] text-amber-600">&lt;h1&gt;</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-px w-4 bg-amber-300" />
          <Zap className="h-3 w-3 text-amber-500" />
          <div className="h-px w-4 bg-amber-300" />
        </div>
        <div className="flex h-8 items-center rounded-md border border-amber-200 bg-amber-50 px-2">
          <span className="font-mono text-[10px] font-semibold text-amber-700">Hello</span>
        </div>
      </div>
    ),
    gradient: 'from-amber-50 to-orange-50',
    borderAccent: 'group-hover:border-amber-200',
    iconColor: 'text-amber-600',
    iconBg: 'bg-amber-100',
  },
  {
    icon: Sparkles,
    title: '100+ Components',
    description: 'Drop in production-ready navbars, heroes, cards, forms, and footers. Customize in seconds.',
    visual: (
      <div className="grid grid-cols-3 gap-1.5">
        {['Nav', 'Hero', 'Card', 'Form', 'Table', 'Footer', 'CTA', 'Modal', '+92'].map((label, i) => (
          <div
            key={label}
            className={`flex h-7 items-center justify-center rounded-md text-[9px] font-medium ${
              i === 8
                ? 'border border-dashed border-violet-300 bg-violet-50 text-violet-600'
                : 'border border-violet-100 bg-violet-50/50 text-violet-500'
            }`}
          >
            {label}
          </div>
        ))}
      </div>
    ),
    gradient: 'from-violet-50 to-purple-50',
    borderAccent: 'group-hover:border-violet-200',
    iconColor: 'text-violet-600',
    iconBg: 'bg-violet-100',
  },
  {
    icon: Globe,
    title: 'Works in Any Browser',
    description: 'Chrome, Firefox, Safari, Edge: it works everywhere. No extensions or downloads needed.',
    visual: (
      <div className="flex items-center gap-2">
        {[
          { emoji: '🌐', label: 'Chrome' },
          { emoji: '🦊', label: 'Firefox' },
          { emoji: '🧭', label: 'Safari' },
          { emoji: '📐', label: 'Edge' },
        ].map((b) => (
          <div key={b.label} className="flex flex-col items-center gap-1">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-orange-100 bg-orange-50/50 text-sm">
              {b.emoji}
            </div>
            <span className="text-[9px] text-muted-foreground">{b.label}</span>
          </div>
        ))}
      </div>
    ),
    gradient: 'from-orange-50 to-amber-50',
    borderAccent: 'group-hover:border-orange-200',
    iconColor: 'text-orange-600',
    iconBg: 'bg-orange-100',
  },
  {
    icon: Lock,
    title: 'Private & Secure',
    description: 'Your code never leaves your browser. Nothing is stored on any server. 100% client-side.',
    visual: (
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-rose-200 bg-rose-50">
            <Lock className="h-4 w-4 text-rose-500" />
          </div>
          <div className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-400" />
        </div>
        <div className="space-y-0.5">
          <div className="font-mono text-[10px] font-medium text-rose-600">CLIENT-SIDE ONLY</div>
          <div className="font-mono text-[10px] text-muted-foreground">0 bytes sent to server</div>
        </div>
      </div>
    ),
    gradient: 'from-rose-50 to-pink-50',
    borderAccent: 'group-hover:border-rose-200',
    iconColor: 'text-rose-600',
    iconBg: 'bg-rose-100',
  },
];

const TrustBar = () => {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-600/80">
            Why Us
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground md:text-[2.75rem] md:leading-[1.15]" style={{ letterSpacing: '-0.025em' }}>
            Why Live HTML Editor?
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground md:text-base">
            Built to get out of your way so you can focus on what matters: writing great code.
          </p>
        </div>

        <div className="mt-16 space-y-8">
          {reasons.map((reason, i) => {
            const Icon = reason.icon;
            const isReversed = i % 2 !== 0;

            return (
              <div
                key={reason.title}
                className={`group flex flex-col gap-6 md:gap-10 ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'}`}
              >
                {/* Visual Card */}
                <div className="flex w-full items-stretch md:w-1/2">
                  <div className={`flex w-full flex-col items-center justify-center rounded-2xl border border-border bg-gradient-to-br ${reason.gradient} p-10 transition-all duration-300 ${reason.borderAccent} group-hover:shadow-warm-md`}>
                    {reason.visual}
                  </div>
                </div>

                {/* Content */}
                <div className="flex w-full flex-col justify-center md:w-1/2">
                  <div className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${reason.iconBg} transition-transform duration-300 group-hover:scale-110`}>
                    <Icon className={`h-5 w-5 ${reason.iconColor}`} strokeWidth={1.8} />
                  </div>
                  <h3 className="mt-5 text-xl font-bold tracking-tight text-foreground md:text-2xl" style={{ letterSpacing: '-0.015em' }}>
                    {reason.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-[1.75] text-muted-foreground">
                    {reason.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
