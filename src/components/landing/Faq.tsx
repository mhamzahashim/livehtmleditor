import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

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

const FaqItem = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-background"
      >
        <span className="text-sm font-semibold text-foreground">{q}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div className="px-6 pb-5 pt-0">
          <p className="text-[13px] leading-relaxed text-muted-foreground">{a}</p>
        </div>
      )}
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
    <section className="py-16 md:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-xl space-y-3 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl" style={{ letterSpacing: '-0.02em' }}>
            Frequently asked questions
          </h2>
          <p className="text-base text-muted-foreground">
            Everything you need to know about Live HTML Editor.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-2xl border border-border bg-white shadow-warm-sm">
          {faqs.map((faq) => (
            <FaqItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
