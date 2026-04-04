
import { useRef, useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Zap } from 'lucide-react';

interface JsEditorProps { value: string; onChange: (value: string) => void; darkMode?: boolean; }

const JsEditor = ({ value, onChange }: JsEditorProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [lineNumbers, setLineNumbers] = useState<string[]>([]);
  useEffect(() => { setLineNumbers(value.split('\n').map((_, i) => (i + 1).toString())); }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const ta = e.target as HTMLTextAreaElement;
    if (e.key === 'Enter') { const s = ta.selectionStart; const ls = value.lastIndexOf('\n', s - 1) + 1; const lt = value.substring(ls, s); const ind = lt.match(/^\s*/)?.[0] || ''; let ex = ''; if (lt.trim().endsWith('{')) ex = '  '; e.preventDefault(); onChange(value.substring(0, s) + '\n' + ind + ex + value.substring(ta.selectionEnd)); setTimeout(() => { if (ta) { const p = s + 1 + ind.length + ex.length; ta.setSelectionRange(p, p); } }, 0); }
    const auto: Record<string, string> = { '(': ')', '[': ']', '{': '}', '"': '"', "'": "'" };
    if (auto[e.key]) { const s = ta.selectionStart; const end = ta.selectionEnd; e.preventDefault(); let cl = auto[e.key]; if (e.key === '{') cl = '\n}'; onChange(value.substring(0, s) + e.key + (end > s ? value.substring(s, end) : '') + cl + value.substring(end)); setTimeout(() => { if (ta) ta.setSelectionRange(s + 1, s + 1); }, 0); }
    if (e.key === 'Tab') { e.preventDefault(); const s = ta.selectionStart; onChange(value.substring(0, s) + '  ' + value.substring(ta.selectionEnd)); setTimeout(() => { if (ta) ta.setSelectionRange(s + 2, s + 2); }, 0); }
  };

  const insertSnippet = (code: string) => { if (textareaRef.current) { const ta = textareaRef.current; const s = ta.selectionStart; onChange(value.substring(0, s) + code + value.substring(ta.selectionEnd)); setTimeout(() => { if (ta) { ta.focus(); ta.setSelectionRange(s + code.length, s + code.length); } }, 0); } };
  const snippets = [
    { name: 'Event Listener', code: `document.addEventListener('DOMContentLoaded', function() {\n  // Your code here\n});` },
    { name: 'Async Fetch', code: `async function fetchData() {\n  try {\n    const response = await fetch('your-url');\n    return await response.json();\n  } catch (error) {\n    console.error('Error:', error);\n  }\n}` },
    { name: 'forEach', code: `items.forEach((item, index) => {\n  console.log(item, index);\n});` },
    { name: 'querySelector', code: `const el = document.querySelector('.selector');\nif (el) {\n  el.addEventListener('click', () => {\n    // Handle click\n  });\n}` }
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-wrap gap-1.5 p-2.5 bg-background border-b border-border">
        {snippets.map((s, i) => <Button key={i} onClick={() => insertSnippet(s.code)} variant="ghost" size="sm" className="toolbar-btn h-7 px-2.5 text-xs gap-1.5"><Zap className="w-3.5 h-3.5" />{s.name}</Button>)}
      </div>
      <div className="flex-1 flex">
        <div className="w-12 bg-[hsl(var(--editor-line-numbers-bg))] text-[hsl(var(--editor-line-numbers-text))] border-r border-white/[0.06] font-mono text-[12px] py-3 px-2 select-none">
          {lineNumbers.map((n, i) => <div key={i} className="text-right" style={{ lineHeight: '1.65' }}>{n}</div>)}
        </div>
        <div className="flex-1"><Textarea ref={textareaRef} value={value} onChange={e => onChange(e.target.value)} onKeyDown={handleKeyDown} className="editor-area h-full resize-none border-0 rounded-none p-3 focus-visible:ring-0" placeholder="// JavaScript" style={{ minHeight: '100%', tabSize: 2 }} spellCheck={false} /></div>
      </div>
    </div>
  );
};

export default JsEditor;
