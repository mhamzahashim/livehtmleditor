import { GraduationCap, PenLine, Mail, Code2, ArrowRight } from 'lucide-react';

const cases = [
  {
    icon: GraduationCap,
    title: 'Students & Learners',
    description: 'Practice HTML, CSS & JavaScript in a zero-setup environment. Perfect for homework, tutorials, and coding bootcamps.',
    highlights: ['Zero setup needed', 'Instant feedback loop', 'Built-in error checking'],
    gradient: 'from-blue-500 to-cyan-500',
    softGradient: 'from-blue-50 to-cyan-50',
    iconColor: 'text-blue-600',
    dotColor: 'bg-blue-400',
    stat: { value: '0s', label: 'Setup time' },
  },
  {
    icon: PenLine,
    title: 'Bloggers & Creators',
    description: 'Build custom widgets, embeds, and landing page snippets without touching a terminal or code editor.',
    highlights: ['100+ starter components', 'Visual live preview', 'One-click export'],
    gradient: 'from-violet-500 to-purple-500',
    softGradient: 'from-violet-50 to-purple-50',
    iconColor: 'text-violet-600',
    dotColor: 'bg-violet-400',
    stat: { value: '100+', label: 'Components' },
  },
  {
    icon: Mail,
    title: 'Email Designers',
    description: 'Prototype and test HTML email templates with a real-time preview before sending to your list.',
    highlights: ['Responsive viewport testing', 'Clean HTML output', 'Import existing templates'],
    gradient: 'from-rose-500 to-pink-500',
    softGradient: 'from-rose-50 to-pink-50',
    iconColor: 'text-rose-600',
    dotColor: 'bg-rose-400',
    stat: { value: '3', label: 'Viewports' },
  },
  {
    icon: Code2,
    title: 'Developers',
    description: 'Quickly prototype ideas, test snippets, and share live demos with your team or clients.',
    highlights: ['JS console & dev tools', 'HTML validation', 'Performance metrics'],
    gradient: 'from-amber-500 to-orange-500',
    softGradient: 'from-amber-50 to-orange-50',
    iconColor: 'text-amber-600',
    dotColor: 'bg-amber-400',
    stat: { value: '<1s', label: 'Refresh' },
  },
];

const UseCases = () => {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-600/80">
            Use Cases
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground md:text-[2.75rem] md:leading-[1.15]" style={{ letterSpacing: '-0.025em' }}>
            Built for everyone
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground md:text-base">
            Whether you're learning to code or shipping production HTML, this editor fits your workflow.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-2">
          {cases.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group relative overflow-hidden rounded-2xl border border-border bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-warm-lg"
              >
                {/* Gradient top accent */}
                <div className={`h-1 w-full bg-gradient-to-r ${item.gradient}`} />

                <div className="p-7">
                  {/* Header row */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3.5">
                      <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${item.softGradient}`}>
                        <Icon className={`h-5 w-5 ${item.iconColor}`} strokeWidth={1.8} />
                      </div>
                      <div>
                        <h3 className="text-[15px] font-bold text-foreground">{item.title}</h3>
                      </div>
                    </div>
                    {/* Stat badge */}
                    <div className="flex flex-col items-end">
                      <span className={`text-lg font-extrabold bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent`}>
                        {item.stat.value}
                      </span>
                      <span className="text-[10px] text-muted-foreground">{item.stat.label}</span>
                    </div>
                  </div>

                  <p className="mt-4 text-[13px] leading-[1.75] text-muted-foreground">
                    {item.description}
                  </p>

                  {/* Highlights */}
                  <ul className="mt-5 space-y-2.5">
                    {item.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-2.5 text-[13px] text-foreground/70">
                        <span className={`h-1.5 w-1.5 rounded-full ${item.dotColor}`} />
                        {h}
                      </li>
                    ))}
                  </ul>

                  {/* Hover action */}
                  <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                    <a href="#editor">Try it now</a>
                    <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </div>
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
