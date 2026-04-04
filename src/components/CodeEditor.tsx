import { useRef, useState, useEffect, useMemo } from 'react';
import { Textarea } from '@/components/ui/textarea';
import EditorToolbar from './EditorToolbar';
import { Button } from '@/components/ui/button';
import prettier from 'prettier/standalone';
import parserBabel from 'prettier/plugins/babel';
import parserHtml from 'prettier/plugins/html';
import parserPostcss from 'prettier/plugins/postcss';
import parserTypescript from 'prettier/plugins/typescript';
import parserMarkdown from 'prettier/plugins/markdown';

interface CodeEditorProps { value: string; onChange: (value: string) => void; language?: string; darkMode?: boolean; }

const CodeEditor = ({ value, onChange, language = 'html' }: CodeEditorProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [selectedText, setSelectedText] = useState('');
  const [lineNumbers, setLineNumbers] = useState<string[]>([]);
  const [cursorPosition, setCursorPosition] = useState({ line: 1, column: 1 });
  const [lintMessage, setLintMessage] = useState<string | null>(null);
  const prettierConfig = useMemo(() => ({ semi: true, singleQuote: false }), []);
  const getParser = () => { switch (language) { case 'css': return 'css'; case 'js': case 'javascript': return 'babel'; case 'ts': case 'typescript': return 'typescript'; case 'md': case 'markdown': return 'markdown'; default: return 'html'; } };
  const plugins = useMemo(() => [parserBabel, parserHtml, parserPostcss, parserTypescript, parserMarkdown], []);
  useEffect(() => { setLineNumbers(value.split('\n').map((_, i) => (i + 1).toString())); }, [value]);

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => { const v = e.target.value; onChange(v); const lines = v.substring(0, e.target.selectionStart).split('\n'); setCursorPosition({ line: lines.length, column: lines[lines.length - 1].length + 1 }); };
  const handleSelection = () => { if (textareaRef.current) { const s = textareaRef.current.selectionStart; const e = textareaRef.current.selectionEnd; setSelectedText(value.substring(s, e)); const lines = value.substring(0, s).split('\n'); setCursorPosition({ line: lines.length, column: lines[lines.length - 1].length + 1 }); } };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const ta = e.target as HTMLTextAreaElement;
    if (e.key === 'Enter') { const start = ta.selectionStart; const ls = value.lastIndexOf('\n', start - 1) + 1; const lt = value.substring(ls, start); const indent = lt.match(/^\s*/)?.[0] || ''; let extra = ''; if (lt.trim().endsWith('>') && !lt.trim().endsWith('/>') && !lt.includes('</')) extra = '  '; e.preventDefault(); onChange(value.substring(0, start) + '\n' + indent + extra + value.substring(ta.selectionEnd)); setTimeout(() => { if (ta) { const p = start + 1 + indent.length + extra.length; ta.setSelectionRange(p, p); } }, 0); }
    if (e.key === 'Tab') { e.preventDefault(); const s = ta.selectionStart; const end = ta.selectionEnd; if (s === end) { onChange(value.substring(0, s) + '  ' + value.substring(end)); setTimeout(() => { if (ta) ta.setSelectionRange(s + 2, s + 2); }, 0); } else { const lines = value.split('\n'); const sl = value.substring(0, s).split('\n').length - 1; const el = value.substring(0, end).split('\n').length - 1; for (let i = sl; i <= el; i++) { if (e.shiftKey) { if (lines[i].startsWith('  ')) lines[i] = lines[i].substring(2); } else { lines[i] = '  ' + lines[i]; } } onChange(lines.join('\n')); } }
    if (e.ctrlKey && e.key === 's') e.preventDefault();
  };

  const handleInsertCode = (code: string) => { if (textareaRef.current) { const ta = textareaRef.current; const s = ta.selectionStart; const e = ta.selectionEnd; onChange(value.substring(0, s) + code + value.substring(e)); setTimeout(() => { if (ta) { ta.focus(); ta.setSelectionRange(s + code.length, s + code.length); } }, 0); } };
  const handleFormat = async () => { try { onChange(await prettier.format(value, { parser: getParser(), plugins, ...prettierConfig })); setLintMessage(null); } catch { setLintMessage('Format error'); } };
  const handleLint = () => { const issues: string[] = []; const c = (s: string, ch: string) => (s.match(new RegExp(`\\${ch}`, 'g')) || []).length; if (['js','javascript','ts','typescript'].includes(language)) { if (c(value,'{')!==c(value,'}')) issues.push('Unbalanced {}'); if (c(value,'(')!==c(value,')')) issues.push('Unbalanced ()'); } if (language==='html' && c(value,'<')!==c(value,'>')) issues.push('Possible unmatched <>'); setLintMessage(issues.length ? `${issues.length} issue(s): ${issues.join(', ')}` : 'No issues found'); };

  return (
    <div className="h-full flex flex-col">
      <EditorToolbar onInsertCode={handleInsertCode} selectedText={selectedText} />
      <div className="flex items-center gap-2 px-3 py-1.5 bg-background border-b border-border">
        <Button size="sm" variant="ghost" onClick={handleFormat} className="toolbar-btn h-6 px-2 text-[11px] font-mono">Format</Button>
        <Button size="sm" variant="ghost" onClick={handleLint} className="toolbar-btn h-6 px-2 text-[11px] font-mono">Lint</Button>
        {lintMessage && <span className={`text-[11px] font-mono ${lintMessage.includes('No issues') ? 'text-green-600' : 'text-amber-600'}`}>{lintMessage}</span>}
      </div>
      <div className="flex-1 flex">
        <div className="w-12 bg-[hsl(var(--editor-line-numbers-bg))] text-[hsl(var(--editor-line-numbers-text))] border-r border-white/[0.06] font-mono text-[12px] py-3 px-2 select-none">
          {lineNumbers.map((num, i) => <div key={i} className="text-right" style={{ lineHeight: '1.65' }}>{num}</div>)}
        </div>
        <div className="flex-1 relative">
          <Textarea ref={textareaRef} value={value} onChange={handleTextareaChange} onSelect={handleSelection} onMouseUp={handleSelection} onKeyUp={handleSelection} onKeyDown={handleKeyDown}
            className="editor-area h-full resize-none border-0 rounded-none p-3 focus-visible:ring-0"
            placeholder={`Enter your ${language.toUpperCase()} code here...`}
            style={{ minHeight: '100%', tabSize: 2 }} spellCheck={false} />
          <div className="absolute bottom-0 right-0 bg-[hsl(var(--editor-status-bg))] text-[hsl(var(--editor-status-text))] px-3 py-1 text-[10px] font-mono rounded-tl-md border-t border-l border-white/[0.06]">
            Ln {cursorPosition.line}, Col {cursorPosition.column} &middot; {language.toUpperCase()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
