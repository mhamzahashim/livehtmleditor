const Hero = () => {
  return (
    <section className="pt-12 pb-8 md:pt-20 md:pb-12">
      <div className="mx-auto max-w-4xl px-6 text-center">
        {/* Badge */}
        <div
          className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-1.5 text-xs font-medium text-muted-foreground shadow-warm-sm"
          style={{ animationDelay: '0ms' }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
          Free & Open Source
        </div>

        {/* Headline */}
        <h1
          className="animate-fade-up mt-8 text-4xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
          style={{ animationDelay: '80ms', letterSpacing: '-0.03em' }}
        >
          Write code.{' '}
          <span className="bg-gradient-to-r from-amber-600 via-orange-500 to-amber-500 bg-clip-text text-transparent">
            See it live.
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="animate-fade-up mx-auto mt-6 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg"
          style={{ animationDelay: '160ms' }}
        >
          A powerful online editor for HTML, CSS & JavaScript with real-time preview, 100+ components, and built-in dev tools.
        </p>

      </div>
    </section>
  );
};

export default Hero;
