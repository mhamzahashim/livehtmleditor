import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CtaBannerProps {
  headline?: string;
  subtext?: string;
}

const CtaBanner = ({
  headline = 'Ready to start building?',
  subtext = 'No signup, no install, no cost. Jump straight into the editor.',
}: CtaBannerProps) => {
  return (
    <section className="py-14 md:py-20">
      <div className="mx-auto max-w-5xl px-6">
        <div className="rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 via-white to-orange-50 px-8 py-12 text-center shadow-warm-sm md:px-16 md:py-16">
          <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl" style={{ letterSpacing: '-0.02em' }}>
            {headline}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground md:text-base">
            {subtext}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="h-11 rounded-xl bg-amber-600 px-6 text-sm font-semibold text-white transition-all hover:bg-amber-500 hover:scale-[1.02] active:scale-[0.98]"
            >
              <a href="#editor">
                Start Editing Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaBanner;
