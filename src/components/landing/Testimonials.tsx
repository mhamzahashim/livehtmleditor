import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Frontend Developer',
    text: 'This replaced my entire local dev setup for quick prototyping. The component library alone saves me hours every week.',
    rating: 5,
  },
  {
    name: 'Marcus Rodriguez',
    role: 'CS Student',
    text: 'I use this for all my web dev assignments. No setup, no installs, just open and code. My professor even recommends it now.',
    rating: 5,
  },
  {
    name: 'Emily Watson',
    role: 'Email Marketing Manager',
    text: 'Finally an HTML editor that shows my email templates exactly how they will look. The responsive preview is a game changer.',
    rating: 5,
  },
  {
    name: 'James Park',
    role: 'Freelance Designer',
    text: 'I send live demos to clients in seconds. No CodePen account needed, no friction. Just paste and share.',
    rating: 4,
  },
  {
    name: 'Priya Sharma',
    role: 'Technical Writer',
    text: 'The built-in HTML validator catches my mistakes before they go live. The dev tools panel is surprisingly powerful for a free tool.',
    rating: 5,
  },
  {
    name: 'Alex Petrov',
    role: 'Bootcamp Instructor',
    text: 'I switched my entire curriculum to use this editor. Students can focus on learning HTML instead of fighting with tooling.',
    rating: 5,
  },
];

const Stars = ({ count }: { count: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-3.5 w-3.5 ${i < count ? 'fill-amber-400 text-amber-400' : 'text-stone-200'}`}
      />
    ))}
  </div>
);

const Testimonials = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-xl space-y-3 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl" style={{ letterSpacing: '-0.02em' }}>
            Loved by developers
          </h2>
          <p className="text-base text-muted-foreground">
            Join thousands of developers, students, and creators who build with Live HTML Editor.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl border border-border bg-white p-6 shadow-warm-sm transition-colors hover:bg-background"
            >
              <Stars count={t.rating} />
              <p className="mt-4 text-[13px] leading-relaxed text-muted-foreground">
                "{t.text}"
              </p>
              <div className="mt-5 border-t border-border pt-4">
                <p className="text-sm font-semibold text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
