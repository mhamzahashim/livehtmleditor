import { Shield, Zap, UserX, Globe, Sparkles, Lock } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Free Forever',
    description: 'No hidden fees, no premium tier, no feature gates. Every tool is available to everyone, always.',
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    icon: UserX,
    title: 'No Signup Required',
    description: 'Start coding the moment you land on the page. No accounts, no emails, no passwords. Just you and your code.',
    color: 'bg-sky-50 text-sky-600',
  },
  {
    icon: Zap,
    title: 'Instant Live Preview',
    description: 'Every keystroke updates the preview in real time. Click any element in the preview to jump straight to its source.',
    color: 'bg-amber-50 text-amber-600',
  },
  {
    icon: Sparkles,
    title: '100+ Ready-Made Components',
    description: 'Drop in production-ready navbars, heroes, cards, forms, and footers. Customize them to match your project in seconds.',
    color: 'bg-violet-50 text-violet-600',
  },
  {
    icon: Globe,
    title: 'Works in Any Browser',
    description: 'Chrome, Firefox, Safari, Edge: it works everywhere. No extensions, no plugins, no downloads required.',
    color: 'bg-orange-50 text-orange-600',
  },
  {
    icon: Lock,
    title: 'Private & Secure',
    description: 'Your code never leaves your browser. Nothing is stored on our servers. Everything runs 100% client-side.',
    color: 'bg-rose-50 text-rose-600',
  },
];

const TrustBar = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-xl space-y-3 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl" style={{ letterSpacing: '-0.02em' }}>
            Why Live HTML Editor?
          </h2>
          <p className="text-base text-muted-foreground">
            Built to get out of your way so you can focus on what matters: writing great code.
          </p>
        </div>

        <div className="mt-16 space-y-12 md:space-y-20">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            const isReversed = i % 2 !== 0;

            return (
              <div
                key={feature.title}
                className={`flex flex-col items-center gap-8 md:gap-14 ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'}`}
              >
                {/* Visual box */}
                <div className="flex w-full items-center justify-center md:w-1/2">
                  <div className={`flex h-48 w-full items-center justify-center rounded-2xl border border-border shadow-warm-sm ${feature.color.split(' ')[0]}`}>
                    <Icon className={`h-16 w-16 ${feature.color.split(' ')[1]}`} />
                  </div>
                </div>

                {/* Content */}
                <div className="w-full md:w-1/2">
                  <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${feature.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-xl font-bold tracking-tight text-foreground" style={{ letterSpacing: '-0.01em' }}>
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                    {feature.description}
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
