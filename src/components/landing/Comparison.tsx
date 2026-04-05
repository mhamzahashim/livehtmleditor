import { Check, X, Minus } from 'lucide-react';

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

const Cell = ({ value }: { value: CellValue }) => {
  if (value === true) return <Check className="mx-auto h-4 w-4 text-green-600" />;
  if (value === false) return <X className="mx-auto h-4 w-4 text-stone-300" />;
  return <span className="text-xs text-muted-foreground">{value}</span>;
};

const Comparison = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-xl space-y-3 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl" style={{ letterSpacing: '-0.02em' }}>
            How we compare
          </h2>
          <p className="text-base text-muted-foreground">
            See how Live HTML Editor stacks up against other popular online editors.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-2xl border border-border bg-white shadow-warm-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-background">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Feature</th>
                  <th className="px-4 py-4 text-center text-xs font-semibold text-amber-600 uppercase tracking-wider">Live HTML Editor</th>
                  <th className="px-4 py-4 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider">CodePen</th>
                  <th className="px-4 py-4 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider">JSFiddle</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={i < rows.length - 1 ? 'border-b border-border' : ''}
                  >
                    <td className="px-6 py-3.5 text-[13px] font-medium text-foreground">{row.feature}</td>
                    <td className="px-4 py-3.5 text-center"><Cell value={row.lhe} /></td>
                    <td className="px-4 py-3.5 text-center"><Cell value={row.codepen} /></td>
                    <td className="px-4 py-3.5 text-center"><Cell value={row.jsfiddle} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Comparison;
