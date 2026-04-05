import { Check, X, Crown } from 'lucide-react';

type CellValue = true | false | string;

interface Row {
  feature: string;
  lhe: CellValue;
  codepen: CellValue;
  jsfiddle: CellValue;
}

const rows: Row[] = [
  { feature: 'Free to use', lhe: true, codepen: true, jsfiddle: true },
  { feature: 'No signup required', lhe: true, codepen: false, jsfiddle: false },
  { feature: 'Real-time preview', lhe: true, codepen: true, jsfiddle: true },
  { feature: 'Component library (100+)', lhe: true, codepen: false, jsfiddle: false },
  { feature: 'Built-in dev tools', lhe: true, codepen: false, jsfiddle: false },
  { feature: 'HTML validator', lhe: true, codepen: false, jsfiddle: false },
  { feature: 'Responsive preview', lhe: true, codepen: false, jsfiddle: false },
  { feature: 'Import/Export HTML', lhe: true, codepen: 'PRO only', jsfiddle: false },
  { feature: 'Offline capable', lhe: true, codepen: false, jsfiddle: false },
  { feature: 'Open source', lhe: true, codepen: false, jsfiddle: false },
];

const Cell = ({ value, highlight }: { value: CellValue; highlight?: boolean }) => {
  if (value === true) {
    return (
      <div className={`mx-auto flex h-6 w-6 items-center justify-center rounded-full ${highlight ? 'bg-emerald-100' : ''}`}>
        <Check className={`h-4 w-4 ${highlight ? 'text-emerald-600' : 'text-emerald-500'}`} strokeWidth={2.5} />
      </div>
    );
  }
  if (value === false) {
    return (
      <div className="mx-auto flex h-6 w-6 items-center justify-center">
        <X className="h-3.5 w-3.5 text-stone-300" strokeWidth={2} />
      </div>
    );
  }
  return (
    <span className="inline-block rounded-md bg-amber-50 px-2 py-0.5 font-mono text-[10px] font-medium text-amber-600">
      {value}
    </span>
  );
};

const Comparison = () => {
  const lheScore = rows.filter((r) => r.lhe === true).length;
  const codepenScore = rows.filter((r) => r.codepen === true).length;
  const jsfiddleScore = rows.filter((r) => r.jsfiddle === true).length;

  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-600/80">
            Comparison
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground md:text-[2.75rem] md:leading-[1.15]" style={{ letterSpacing: '-0.025em' }}>
            How we compare
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground md:text-base">
            See how Live HTML Editor stacks up against other popular online editors.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-3xl overflow-hidden rounded-2xl border border-border bg-white shadow-warm-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-6 py-5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Feature
                  </th>
                  <th className="relative px-4 py-5 text-center">
                    <div className="absolute inset-0 bg-amber-50/40" />
                    <div className="relative flex flex-col items-center gap-1">
                      <div className="flex items-center gap-1">
                        <Crown className="h-3 w-3 text-amber-500" />
                        <span className="text-xs font-bold text-amber-700">Live HTML Editor</span>
                      </div>
                      <span className="font-mono text-[10px] text-amber-500">{lheScore}/{rows.length}</span>
                    </div>
                  </th>
                  <th className="px-4 py-5 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-xs font-semibold text-muted-foreground">CodePen</span>
                      <span className="font-mono text-[10px] text-muted-foreground/60">{codepenScore}/{rows.length}</span>
                    </div>
                  </th>
                  <th className="px-4 py-5 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-xs font-semibold text-muted-foreground">JSFiddle</span>
                      <span className="font-mono text-[10px] text-muted-foreground/60">{jsfiddleScore}/{rows.length}</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={`transition-colors hover:bg-background/50 ${i < rows.length - 1 ? 'border-b border-border/60' : ''}`}
                  >
                    <td className="px-6 py-3.5 text-[13px] font-medium text-foreground">
                      {row.feature}
                    </td>
                    <td className="relative px-4 py-3.5 text-center">
                      <div className="absolute inset-0 bg-amber-50/40" />
                      <div className="relative">
                        <Cell value={row.lhe} highlight />
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <Cell value={row.codepen} />
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <Cell value={row.jsfiddle} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary bar */}
          <div className="border-t border-border bg-gradient-to-r from-amber-50/60 to-orange-50/60 px-6 py-4">
            <p className="text-center text-xs text-muted-foreground">
              Live HTML Editor offers <span className="font-bold text-amber-700">{lheScore - codepenScore} more features</span> than CodePen and <span className="font-bold text-amber-700">{lheScore - jsfiddleScore} more</span> than JSFiddle, all completely free.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Comparison;
