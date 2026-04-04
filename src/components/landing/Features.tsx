import { Eye, Code2, Layout, Settings2, Download, Smartphone } from 'lucide-react';

const features = [
  {
    icon: Eye,
    title: 'Live Preview',
    description: 'See your changes instantly. Click elements in the preview to edit them directly.',
  },
  {
    icon: Code2,
    title: 'HTML, CSS & JS',
    description: 'Full support for HTML, CSS, and JavaScript with syntax-aware editing and auto-indent.',
  },
  {
    icon: Layout,
    title: 'Component Library',
    description: '100+ ready-to-use components. Copy and paste navbars, heroes, cards, forms, and more.',
  },
  {
    icon: Settings2,
    title: 'Developer Tools',
    description: 'Built-in console, HTML validator, performance metrics, and accessibility checker.',
  },
  {
    icon: Download,
    title: 'Import & Export',
    description: 'Import existing HTML files or export your work as clean, standalone HTML documents.',
  },
  {
    icon: Smartphone,
    title: 'Responsive Preview',
    description: 'Test your designs on desktop, tablet, and mobile viewports with one click.',
  },
];

const Features = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6">
        {/* Header */}
        <div className="mx-auto max-w-xl space-y-4 text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-white md:text-4xl lg:text-5xl">
            Everything you need to build
          </h2>
          <p className="text-[#7A7F94] text-base md:text-lg">
            A complete toolkit for writing, previewing, and shipping HTML. No setup required.
          </p>
        </div>

        {/* Grid - inspired by 21st.dev Features 4 pattern */}
        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 divide-y divide-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden sm:grid-cols-2 sm:divide-x lg:grid-cols-3 lg:[&>*:nth-child(n+4)]:border-t lg:[&>*:nth-child(n+4)]:border-white/[0.06]">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative space-y-3 p-8 transition-colors hover:bg-white/[0.02] sm:[&:nth-child(odd)]:border-r-0 lg:[&:nth-child(3n)]:border-r-0"
              >
                {/* Hover glow */}
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100 bg-[radial-gradient(circle_at_50%_0%,hsla(239,84%,67%,0.06)_0%,transparent_60%)]" />

                <div className="relative flex items-center gap-2.5">
                  <Icon className="h-4 w-4 text-indigo-400" />
                  <h3 className="text-sm font-medium text-white">{feature.title}</h3>
                </div>
                <p className="relative text-sm leading-relaxed text-[#7A7F94]">
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
