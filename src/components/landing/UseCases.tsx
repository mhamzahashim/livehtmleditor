import { GraduationCap, PenLine, Mail, Code2 } from 'lucide-react';

const cases = [
  {
    icon: GraduationCap,
    title: 'Students & Learners',
    description: 'Practice HTML, CSS & JavaScript in a zero-setup environment. Perfect for homework, tutorials, and coding bootcamps.',
  },
  {
    icon: PenLine,
    title: 'Bloggers & Creators',
    description: 'Build custom widgets, embeds, and landing page snippets without touching a terminal or code editor.',
  },
  {
    icon: Mail,
    title: 'Email Designers',
    description: 'Prototype and test HTML email templates with a real-time preview before sending to your list.',
  },
  {
    icon: Code2,
    title: 'Developers',
    description: 'Quickly prototype ideas, test snippets, and share live demos with your team or clients.',
  },
];

const UseCases = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-xl space-y-3 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl" style={{ letterSpacing: '-0.02em' }}>
            Built for everyone
          </h2>
          <p className="text-base text-muted-foreground">
            Whether you're learning to code or shipping production HTML, this editor fits your workflow.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2">
          {cases.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-2xl border border-border bg-white p-8 shadow-warm-sm transition-colors hover:bg-background"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50">
                    <Icon className="h-4.5 w-4.5 text-amber-600" />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                </div>
                <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
