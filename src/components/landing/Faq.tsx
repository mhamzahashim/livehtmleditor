import { useState } from 'react';
import { ChevronDown, Plus, Minus } from 'lucide-react';

const faqs = [
  {
    q: 'Is Live HTML Editor completely free?',
    a: 'Yes. Live HTML Editor is 100% free to use with no hidden fees, no premium tier, and no feature gates. It is open source and always will be.',
  },
  {
    q: 'Do I need to create an account to use it?',
    a: 'No. You can start writing HTML, CSS, and JavaScript immediately without signing up, logging in, or providing any personal information.',
  },
  {
    q: 'Can I export my code as an HTML file?',
    a: 'Yes. You can export your project as a clean, standalone HTML document that you can open in any browser or upload to any hosting provider.',
  },
  {
    q: 'Does it support CSS and JavaScript too?',
    a: 'Absolutely. The editor has dedicated tabs for HTML, CSS, and JavaScript with syntax highlighting, auto-indent, and bracket matching for all three languages.',
  },
  {
    q: 'How does the live preview work?',
    a: 'Every change you make is reflected in the preview panel in real time, under one second. You can also click elements in the preview to jump to their source code.',
  },
  {
    q: 'What is the component library?',
    a: 'It is a collection of 100+ pre-built, production-ready HTML components like navbars, hero sections, cards, forms, footers, and more. Just click to insert them into your code.',
  },
  {
    q: 'Can I test responsive designs?',
    a: 'Yes. The built-in responsive preview lets you switch between desktop, tablet, and mobile viewports with a single click to see how your page looks on different screen sizes.',
  },
  {
    q: 'Is my code stored on your servers?',
    a: 'No. All code is processed locally in your browser. Nothing is sent to any server. Your work stays completely private and under your control.',
  },
  {
    q: 'What are the built-in developer tools?',
    a: 'The editor includes a JavaScript console, HTML validator, performance metrics, and an accessibility checker, all accessible from the toolbar without leaving the editor.',
  },
  {
    q: 'Can I import an existing HTML file?',
    a: 'Yes. You can import any .html file from your computer. The editor will parse it and split the content into the HTML, CSS, and JavaScript tabs automatically.',
  },
  {
    q: 'Does it work offline?',
    a: 'Yes. Once the page is loaded, the editor works entirely in your browser. You can continue coding even without an internet connection.',
  },
];

const FaqItem = ({ q, a, index }: { q: string; a: string; index: number }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={`${index < faqs.length - 1 ? 'border-b border-border/60' : ''}`}>
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-6 px-7 py-5 text-left transition-colors hover:bg-amber-50/30"
      >
        <div className="flex items-center gap-4">
          <span className="hidden font-mono text-[11px] text-muted-foreground/50 sm:inline">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="text-[14px] font-semibold text-foreground">{q}</span>
        </div>
        <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all duration-200 ${open ? 'border-amber-300 bg-amber-50' : 'border-border bg-white'}`}>
          {open ? (
            <Minus className="h-3 w-3 text-amber-600" strokeWidth={2} />
          ) : (
            <Plus className="h-3 w-3 text-muted-foreground" strokeWidth={2} />
          )}
        </div>
      </button>
      <div
        className="grid transition-all duration-200 ease-out"
        style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <div className="px-7 pb-6 pt-0 sm:pl-[4.25rem]">
            <p className="text-[13px] leading-[1.8] text-muted-foreground">
              {a}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: f.a,
    },
  })),
};

const Faq = () => {
  return (
    <section className="py-24 md:py-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-600/80">
            FAQ
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground md:text-[2.75rem] md:leading-[1.15]" style={{ letterSpacing: '-0.025em' }}>
            Frequently asked questions
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground md:text-base">
            Everything you need to know about Live HTML Editor.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-3xl overflow-hidden rounded-2xl border border-border bg-white shadow-warm-sm">
          {faqs.map((faq, i) => (
            <FaqItem key={faq.q} q={faq.q} a={faq.a} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
