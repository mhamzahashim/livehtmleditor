import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Frontend Developer',
    text: 'This replaced my entire local dev setup for quick prototyping. The component library alone saves me hours every week.',
    rating: 5,
    initials: 'SC',
    color: 'bg-sky-100 text-sky-700',
  },
  {
    name: 'Marcus Rodriguez',
    role: 'CS Student',
    text: 'I use this for all my web dev assignments. No setup, no installs, just open and code. My professor even recommends it now.',
    rating: 5,
    initials: 'MR',
    color: 'bg-violet-100 text-violet-700',
  },
  {
    name: 'Emily Watson',
    role: 'Email Marketing Manager',
    text: 'Finally an HTML editor that shows my email templates exactly how they will look. The responsive preview is a game changer.',
    rating: 5,
    initials: 'EW',
    color: 'bg-rose-100 text-rose-700',
  },
  {
    name: 'James Park',
    role: 'Freelance Designer',
    text: 'I send live demos to clients in seconds. No CodePen account needed, no friction. Just paste and share.',
    rating: 4,
    initials: 'JP',
    color: 'bg-amber-100 text-amber-700',
  },
  {
    name: 'Priya Sharma',
    role: 'Technical Writer',
    text: 'The built-in HTML validator catches my mistakes before they go live. The dev tools panel is surprisingly powerful for a free tool.',
    rating: 5,
    initials: 'PS',
    color: 'bg-emerald-100 text-emerald-700',
  },
  {
    name: 'Alex Petrov',
    role: 'Bootcamp Instructor',
    text: 'I switched my entire curriculum to use this editor. Students can focus on learning HTML instead of fighting with tooling.',
    rating: 5,
    initials: 'AP',
    color: 'bg-orange-100 text-orange-700',
  },
];

const Stars = ({ count }: { count: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-3.5 w-3.5 ${i < count ? 'fill-amber-400 text-amber-400' : 'fill-stone-100 text-stone-200'}`}
      />
    ))}
  </div>
);

const Testimonials = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-xl space-y-3 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-1.5 text-xs font-medium text-muted-foreground shadow-warm-sm">
            Testimonials
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl" style={{ letterSpacing: '-0.02em' }}>
            Loved by developers
          </h2>
          <p className="text-base text-muted-foreground">
            Join thousands of developers, students, and creators who build with Live HTML Editor.
          </p>
        </div>

        {/* Masonry-style staggered grid */}
        <div className="mx-auto mt-14 max-w-4xl columns-1 gap-5 space-y-5 sm:columns-2 lg:columns-3">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="group relative break-inside-avoid overflow-hidden rounded-2xl border border-border bg-white shadow-warm-sm transition-all hover:shadow-warm-md hover:-translate-y-0.5"
            >
              <div className="p-6">
                {/* Quote icon */}
                <Quote className="h-5 w-5 text-amber-200" />

                {/* Stars */}
                <div className="mt-3">
                  <Stars count={t.rating} />
                </div>

                {/* Text */}
                <p className="mt-4 text-sm leading-relaxed text-foreground/80">
                  {t.text}
                </p>

                {/* Author */}
                <div className="mt-6 flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold ${t.color}`}>
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
