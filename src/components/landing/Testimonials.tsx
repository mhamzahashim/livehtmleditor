import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Frontend Developer',
    text: 'This replaced my entire local dev setup for quick prototyping. The component library alone saves me hours every week.',
    rating: 5,
    initials: 'SC',
    gradient: 'from-sky-400 to-blue-500',
    featured: true,
  },
  {
    name: 'Marcus Rodriguez',
    role: 'CS Student',
    text: 'I use this for all my web dev assignments. No setup, no installs, just open and code. My professor even recommends it now.',
    rating: 5,
    initials: 'MR',
    gradient: 'from-violet-400 to-purple-500',
    featured: false,
  },
  {
    name: 'Emily Watson',
    role: 'Email Marketing Manager',
    text: 'Finally an HTML editor that shows my email templates exactly how they will look. The responsive preview is a game changer.',
    rating: 5,
    initials: 'EW',
    gradient: 'from-rose-400 to-pink-500',
    featured: false,
  },
  {
    name: 'James Park',
    role: 'Freelance Designer',
    text: 'I send live demos to clients in seconds. No CodePen account needed, no friction. Just paste and share.',
    rating: 4,
    initials: 'JP',
    gradient: 'from-amber-400 to-orange-500',
    featured: false,
  },
  {
    name: 'Priya Sharma',
    role: 'Technical Writer',
    text: 'The built-in HTML validator catches my mistakes before they go live. The dev tools panel is surprisingly powerful for a free tool.',
    rating: 5,
    initials: 'PS',
    gradient: 'from-emerald-400 to-teal-500',
    featured: true,
  },
  {
    name: 'Alex Petrov',
    role: 'Bootcamp Instructor',
    text: 'I switched my entire curriculum to use this editor. Students can focus on learning HTML instead of fighting with tooling.',
    rating: 5,
    initials: 'AP',
    gradient: 'from-orange-400 to-red-500',
    featured: false,
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
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-600/80">
            Testimonials
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground md:text-[2.75rem] md:leading-[1.15]" style={{ letterSpacing: '-0.025em' }}>
            Loved by developers
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground md:text-base">
            Join thousands of developers, students, and creators who build with Live HTML Editor.
          </p>
        </div>

        {/* Masonry-style grid */}
        <div className="mx-auto mt-16 max-w-4xl columns-1 gap-5 space-y-5 sm:columns-2 lg:columns-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="group relative break-inside-avoid overflow-hidden rounded-2xl border border-border bg-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-warm-lg"
            >
              {/* Top gradient line */}
              <div className={`h-px w-full bg-gradient-to-r ${t.gradient} opacity-60`} />

              <div className={`p-6 ${t.featured ? 'pb-8' : ''}`}>
                {/* Quote */}
                <div className="flex items-start justify-between">
                  <Quote className="h-6 w-6 text-amber-100" strokeWidth={1.5} />
                  <Stars count={t.rating} />
                </div>

                {/* Text */}
                <p className={`mt-4 leading-[1.75] text-foreground/75 ${t.featured ? 'text-[15px]' : 'text-[13px]'}`}>
                  "{t.text}"
                </p>

                {/* Author */}
                <div className="mt-6 flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${t.gradient} text-[11px] font-bold text-white shadow-sm`}>
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.name}</p>
                    <p className="text-[11px] text-muted-foreground">{t.role}</p>
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
