import { Eye, Code2, Layout, Settings2, Download, Smartphone } from 'lucide-react';

const features = [
  {
    icon: Eye,
    title: 'Live Preview',
    description: 'See changes instantly. Click any element in the preview to edit it directly in the code.',
  },
  {
    icon: Code2,
    title: 'HTML, CSS & JS',
    description: 'Full support for all three languages with auto-indent, bracket matching, and formatting.',
  },
  {
    icon: Layout,
    title: 'Component Library',
    description: '100+ ready-to-use components: navbars, heroes, cards, forms, tables, and more.',
  },
  {
    icon: Settings2,
    title: 'Developer Tools',
    description: 'Built-in console, HTML validator, performance metrics, and accessibility checker.',
  },
  {
    icon: Download,
    title: 'Import & Export',
    description: 'Import existing HTML files or export your project as a clean, standalone document.',
  },
  {
    icon: Smartphone,
    title: 'Responsive Preview',
    description: 'Preview on desktop, tablet, and mobile viewports with a single click.',
  },
];

const Features = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-6">
        {/* Section header */}
        <div className="mx-auto max-w-xl space-y-3 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl" style={{ letterSpacing: '-0.02em' }}>
            Everything you need to build
          </h2>
          <p className="text-muted-foreground text-base">
            A complete toolkit for writing, previewing, and shipping HTML. No setup, no account needed.
          </p>
        </div>

        {/* Feature grid with border dividers */}
        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 overflow-hidden rounded-2xl border border-border bg-white shadow-warm-sm sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className={[
                  'group relative p-8 transition-colors hover:bg-background',
                  // Right borders (not on last column)
                  i % 3 !== 2 ? 'lg:border-r lg:border-border' : '',
                  i % 2 !== 1 ? 'sm:max-lg:border-r sm:max-lg:border-border' : '',
                  // Bottom borders (not on last row)
                  i < 3 ? 'lg:border-b lg:border-border' : '',
                  i < 4 ? 'sm:max-lg:border-b sm:max-lg:border-border' : '',
                  i < 5 ? 'max-sm:border-b max-sm:border-border' : '',
                ].join(' ')}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="h-4 w-4 text-amber-600" />
                  <h3 className="text-sm font-semibold text-foreground">{feature.title}</h3>
                </div>
                <p className="mt-2.5 text-[13px] leading-relaxed text-muted-foreground">
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
