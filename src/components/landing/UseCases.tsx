import { GraduationCap, PenLine, Mail, Code2 } from 'lucide-react';

const cases = [
  {
    icon: GraduationCap,
    title: 'Students & Learners',
    description: 'Practice HTML, CSS & JavaScript in a zero-setup environment. Perfect for homework, tutorials, and coding bootcamps.',
    highlights: ['Zero setup needed', 'Instant feedback loop', 'Built-in error checking'],
    gradient: 'from-blue-500 to-cyan-400',
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    icon: PenLine,
    title: 'Bloggers & Creators',
    description: 'Build custom widgets, embeds, and landing page snippets without touching a terminal or code editor.',
    highlights: ['100+ starter components', 'Visual live preview', 'One-click export'],
    gradient: 'from-violet-500 to-purple-400',
    iconBg: 'bg-violet-50',
    iconColor: 'text-violet-600',
  },
  {
    icon: Mail,
    title: 'Email Designers',
    description: 'Prototype and test HTML email templates with a real-time preview before sending to your list.',
    highlights: ['Responsive viewport testing', 'Clean HTML output', 'Import existing templates'],
    gradient: 'from-rose-500 to-pink-400',
    iconBg: 'bg-rose-50',
    iconColor: 'text-rose-600',
  },
  {
    icon: Code2,
    title: 'Developers',
    description: 'Quickly prototype ideas, test snippets, and share live demos with your team or clients.',
    highlights: ['JS console & dev tools', 'HTML validation', 'Performance metrics'],
    gradient: 'from-amber-500 to-orange-400',
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
  },
];

const UseCases = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-xl space-y-3 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-1.5 text-xs font-medium text-muted-foreground shadow-warm-sm">
            Use Cases
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl" style={{ letterSpacing: '-0.02em' }}>
            Built for everyone
          </h2>
          <p className="text-base text-muted-foreground">
            Whether you're learning to code or shipping production HTML, this editor fits your workflow.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2">
          {cases.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group relative overflow-hidden rounded-2xl border border-border bg-white shadow-warm-sm transition-all hover:shadow-warm-md hover:-translate-y-0.5"
              >
                {/* Gradient accent bar */}
                <div className={`h-1 w-full bg-gradient-to-r ${item.gradient}`} />

                <div className="p-8">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${item.iconBg}`}>
                      <Icon className={`h-5 w-5 ${item.iconColor}`} />
                    </div>
                    <h3 className="text-base font-bold text-foreground">{item.title}</h3>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>

                  <ul className="mt-5 space-y-2">
                    {item.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-2 text-[13px] text-muted-foreground">
                        <span className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${item.gradient}`} />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
