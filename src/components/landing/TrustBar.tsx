import { Shield, Zap, UserX, Globe, Sparkles, Lock } from 'lucide-react';

const badges = [
  { icon: Shield, label: 'Free Forever' },
  { icon: UserX, label: 'No Signup Required' },
  { icon: Zap, label: 'Instant Live Preview' },
  { icon: Sparkles, label: '100+ Components' },
  { icon: Globe, label: 'Works in Any Browser' },
  { icon: Lock, label: 'Private & Secure' },
];

const TrustBar = () => {
  return (
    <section className="py-10 md:py-14">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {badges.map((badge) => {
            const Icon = badge.icon;
            return (
              <div
                key={badge.label}
                className="flex flex-col items-center gap-2 rounded-xl border border-border bg-white px-4 py-5 text-center shadow-warm-sm transition-colors hover:bg-background"
              >
                <Icon className="h-5 w-5 text-amber-600" />
                <span className="text-xs font-semibold text-foreground">{badge.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
