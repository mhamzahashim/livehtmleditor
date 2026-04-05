const stats = [
  { value: '100+', label: 'Ready-Made Components' },
  { value: '3', label: 'Languages Supported' },
  { value: '0', label: 'Cost to Use' },
  { value: '< 1s', label: 'Preview Refresh Time' },
];

const Stats = () => {
  return (
    <section className="py-14 md:py-20">
      <div className="mx-auto max-w-4xl px-6">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-extrabold tracking-tight text-amber-600 md:text-4xl" style={{ letterSpacing: '-0.03em' }}>
                {stat.value}
              </div>
              <p className="mt-1.5 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
