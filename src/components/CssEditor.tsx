
import { useRef, useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Palette, Zap } from 'lucide-react';

interface CssEditorProps { value: string; onChange: (value: string) => void; darkMode?: boolean; }

const CssEditor = ({ value, onChange }: CssEditorProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [lineNumbers, setLineNumbers] = useState<string[]>([]);
  const [showColorPicker, setShowColorPicker] = useState(false);
  useEffect(() => { setLineNumbers(value.split('\n').map((_, i) => (i + 1).toString())); }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const ta = e.target as HTMLTextAreaElement;
    if (e.key === 'Enter') { const s = ta.selectionStart; const ls = value.lastIndexOf('\n', s - 1) + 1; const lt = value.substring(ls, s); const ind = lt.match(/^\s*/)?.[0] || ''; let ex = ''; if (lt.trim().endsWith('{')) ex = '  '; e.preventDefault(); onChange(value.substring(0, s) + '\n' + ind + ex + value.substring(ta.selectionEnd)); setTimeout(() => { if (ta) { const p = s + 1 + ind.length + ex.length; ta.setSelectionRange(p, p); } }, 0); }
    if (e.key === '{') { const s = ta.selectionStart; e.preventDefault(); onChange(value.substring(0, s) + '{\n  \n}' + value.substring(ta.selectionEnd)); setTimeout(() => { if (ta) ta.setSelectionRange(s + 3, s + 3); }, 0); }
    if (e.key === 'Tab') { e.preventDefault(); const s = ta.selectionStart; onChange(value.substring(0, s) + '  ' + value.substring(ta.selectionEnd)); setTimeout(() => { if (ta) ta.setSelectionRange(s + 2, s + 2); }, 0); }
  };

  const insertSnippet = (code: string) => { if (textareaRef.current) { const ta = textareaRef.current; const s = ta.selectionStart; onChange(value.substring(0, s) + code + value.substring(ta.selectionEnd)); setTimeout(() => { if (ta) { ta.focus(); ta.setSelectionRange(s + code.length, s + code.length); } }, 0); } };
  const snippets = [
    { name: 'Flexbox Center', code: `display: flex;\njustify-content: center;\nalign-items: center;` },
    { name: 'Grid Layout', code: `display: grid;\ngrid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\ngap: 1rem;` },
    { name: 'Card Shadow', code: `box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);\nborder-radius: 8px;\npadding: 1rem;` },
    { name: 'Gradient', code: `background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);` }
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-wrap gap-1.5 p-2.5 bg-background border-b border-border">
        <Button onClick={() => setShowColorPicker(!showColorPicker)} variant="ghost" size="sm" className="toolbar-btn h-7 px-2.5 text-xs gap-1.5"><Palette className="w-3.5 h-3.5" />Colors</Button>
        {snippets.map((s, i) => <Button key={i} onClick={() => insertSnippet(s.code)} variant="ghost" size="sm" className="toolbar-btn h-7 px-2.5 text-xs gap-1.5"><Zap className="w-3.5 h-3.5" />{s.name}</Button>)}
      </div>
      <div className="flex-1 flex">
        <div className="w-12 bg-[hsl(var(--editor-line-numbers-bg))] text-[hsl(var(--editor-line-numbers-text))] border-r border-white/[0.06] font-mono text-[12px] py-3 px-2 select-none">
          {lineNumbers.map((n, i) => <div key={i} className="text-right" style={{ lineHeight: '1.65' }}>{n}</div>)}
        </div>
        <div className="flex-1"><Textarea ref={textareaRef} value={value} onChange={e => onChange(e.target.value)} onKeyDown={handleKeyDown} className="editor-area h-full resize-none border-0 rounded-none p-3 focus-visible:ring-0" placeholder="/* CSS */" style={{ minHeight: '100%', tabSize: 2 }} spellCheck={false} /></div>
      </div>
    </div>
  );
};

export default CssEditor;
