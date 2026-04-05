import { Eye, Code2, Layout, Settings2, Download, Smartphone } from 'lucide-react';

const features = [
  {
    icon: Eye,
    title: 'Live Preview',
    description: 'Every keystroke renders instantly. Click any element in the preview to jump to its source code.',
    accent: 'from-amber-500 to-orange-500',
    iconBg: 'bg-amber-500/10',
    iconColor: 'text-amber-600',
    number: '01',
  },
  {
    icon: Code2,
    title: 'HTML, CSS & JS',
    description: 'Full support for all three languages with syntax highlighting, auto-indent, and bracket matching.',
    accent: 'from-sky-500 to-blue-500',
    iconBg: 'bg-sky-500/10',
    iconColor: 'text-sky-600',
    number: '02',
  },
  {
    icon: Layout,
    title: 'Component Library',
    description: '100+ production-ready components: navbars, heroes, cards, forms, tables, and more.',
    accent: 'from-violet-500 to-purple-500',
    iconBg: 'bg-violet-500/10',
    iconColor: 'text-violet-600',
    number: '03',
  },
  {
    icon: Settings2,
    title: 'Developer Tools',
    description: 'Built-in JavaScript console, HTML validator, performance metrics, and accessibility checker.',
    accent: 'from-emerald-500 to-teal-500',
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-600',
    number: '04',
  },
  {
    icon: Download,
    title: 'Import & Export',
    description: 'Import existing HTML files or export your project as a clean, standalone document.',
    accent: 'from-rose-500 to-pink-500',
    iconBg: 'bg-rose-500/10',
    iconColor: 'text-rose-600',
    number: '05',
  },
  {
    icon: Smartphone,
    title: 'Responsive Preview',
    description: 'Preview on desktop, tablet, and mobile viewports to test every breakpoint.',
    accent: 'from-orange-500 to-amber-500',
    iconBg: 'bg-orange-500/10',
    iconColor: 'text-orange-600',
    number: '06',
  },
];

const Features = () => {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-600/80">
            Features
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground md:text-[2.75rem] md:leading-[1.15]" style={{ letterSpacing: '-0.025em' }}>
            Everything you need to build
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground md:text-base">
            A complete toolkit for writing, previewing, and shipping HTML.
            <br className="hidden sm:block" />
            No setup required. No account needed.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative overflow-hidden rounded-2xl border border-border bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-warm-lg"
              >
                {/* Gradient top edge */}
                <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${feature.accent} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />

                {/* Number watermark */}
                <span className="absolute -right-1 -top-2 font-mono text-[4.5rem] font-black leading-none text-foreground/[0.025] transition-colors duration-300 group-hover:text-foreground/[0.04]">
                  {feature.number}
                </span>

                {/* Icon */}
                <div className={`relative flex h-11 w-11 items-center justify-center rounded-xl ${feature.iconBg} transition-transform duration-300 group-hover:scale-110`}>
                  <Icon className={`h-5 w-5 ${feature.iconColor}`} strokeWidth={1.8} />
                </div>

                {/* Content */}
                <h3 className="relative mt-5 text-[15px] font-bold text-foreground">
                  {feature.title}
                </h3>
                <p className="relative mt-2 text-[13px] leading-[1.7] text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
