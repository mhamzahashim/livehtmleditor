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

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
  darkMode?: boolean;
}

const CodeEditor = ({ value, onChange, language = 'html' }: CodeEditorProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [selectedText, setSelectedText] = useState('');
  const [lineNumbers, setLineNumbers] = useState<string[]>([]);
  const [cursorPosition, setCursorPosition] = useState({ line: 1, column: 1 });
  const [lintMessage, setLintMessage] = useState<string | null>(null);

  const prettierConfig = useMemo(() => ({ semi: true, singleQuote: false }), []);
  const getParser = () => {
    switch (language) {
      case 'css': return 'css';
      case 'js': case 'javascript': return 'babel';
      case 'ts': case 'typescript': return 'typescript';
      case 'md': case 'markdown': return 'markdown';
      default: return 'html';
    }
  };
  const plugins = useMemo(() => [parserBabel, parserHtml, parserPostcss, parserTypescript, parserMarkdown], []);

  useEffect(() => {
    const lines = value.split('\n');
    setLineNumbers(lines.map((_, index) => (index + 1).toString()));
  }, [value]);

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    const textarea = e.target;
    const lines = newValue.substring(0, textarea.selectionStart).split('\n');
    const line = lines.length;
    const column = lines[lines.length - 1].length + 1;
    setCursorPosition({ line, column });
  };

  const handleSelection = () => {
    if (textareaRef.current) {
      const start = textareaRef.current.selectionStart;
      const end = textareaRef.current.selectionEnd;
      const selected = value.substring(start, end);
      setSelectedText(selected);
      const lines = value.substring(0, start).split('\n');
      const line = lines.length;
      const column = lines[lines.length - 1].length + 1;
      setCursorPosition({ line, column });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const textarea = e.target as HTMLTextAreaElement;

    if (e.key === 'Enter') {
      const start = textarea.selectionStart;
      const lineStart = value.lastIndexOf('\n', start - 1) + 1;
      const lineText = value.substring(lineStart, start);
      const indent = lineText.match(/^\s*/)?.[0] || '';
      let extraIndent = '';
      if (lineText.trim().endsWith('>') && !lineText.trim().endsWith('/>') && !lineText.includes('</')) {
        extraIndent = '  ';
      }
      e.preventDefault();
      const newValue = value.substring(0, start) + '\n' + indent + extraIndent + value.substring(textarea.selectionEnd);
      onChange(newValue);
      setTimeout(() => {
        if (textarea) {
          const newCursorPos = start + 1 + indent.length + extraIndent.length;
          textarea.setSelectionRange(newCursorPos, newCursorPos);
        }
      }, 0);
    }

    if (e.key === 'Tab') {
      e.preventDefault();
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      if (start === end) {
        const newValue = value.substring(0, start) + '  ' + value.substring(end);
        onChange(newValue);
        setTimeout(() => { if (textarea) textarea.setSelectionRange(start + 2, start + 2); }, 0);
      } else {
        const lines = value.split('\n');
        const startLine = value.substring(0, start).split('\n').length - 1;
        const endLine = value.substring(0, end).split('\n').length - 1;
        for (let i = startLine; i <= endLine; i++) {
          if (e.shiftKey) {
            if (lines[i].startsWith('  ')) lines[i] = lines[i].substring(2);
          } else {
            lines[i] = '  ' + lines[i];
          }
        }
        onChange(lines.join('\n'));
      }
    }

    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
    }
  };

  const handleInsertCode = (code: string) => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newValue = value.substring(0, start) + code + value.substring(end);
      onChange(newValue);
      setTimeout(() => {
        if (textarea) {
          textarea.focus();
          textarea.setSelectionRange(start + code.length, start + code.length);
        }
      }, 0);
    }
  };

  const handleFormat = async () => {
    try {
      const formatted = await prettier.format(value, { parser: getParser(), plugins, ...prettierConfig });
      onChange(formatted);
      setLintMessage(null);
    } catch (e) {
      console.error(e);
      setLintMessage('Format error');
    }
  };

  const handleLint = () => {
    const issues: string[] = [];
    const count = (s: string, ch: string) => (s.match(new RegExp(`\\${ch}`, 'g')) || []).length;
    const lang = language.toLowerCase();
    if (['js', 'javascript', 'ts', 'typescript'].includes(lang)) {
      if (count(value, '{') !== count(value, '}')) issues.push('Unbalanced {}');
      if (count(value, '(') !== count(value, ')')) issues.push('Unbalanced ()');
      if (count(value, '[') !== count(value, ']')) issues.push('Unbalanced []');
    }
    if (lang === 'html') {
      if (count(value, '<') !== count(value, '>')) issues.push('Possible unmatched <>');
    }
    setLintMessage(issues.length ? `${issues.length} issue(s): ${issues.join(', ')}` : 'No issues found');
  };

  return (
    <div className="h-full flex flex-col">
      <EditorToolbar onInsertCode={handleInsertCode} selectedText={selectedText} />

      <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-2/60 border-b border-white/[0.04]">
        <Button size="sm" variant="ghost" onClick={handleFormat} className="toolbar-btn h-6 px-2 text-[11px] font-mono">Format</Button>
        <Button size="sm" variant="ghost" onClick={handleLint} className="toolbar-btn h-6 px-2 text-[11px] font-mono">Lint</Button>
        {lintMessage && (
          <span className={`text-[11px] font-mono ${lintMessage.includes('No issues') ? 'text-emerald-500' : 'text-amber-500'}`}>
            {lintMessage}
          </span>
        )}
      </div>

      <div className="flex-1 flex">
        {/* Line Numbers */}
        <div className="w-12 bg-[hsl(var(--editor-line-numbers-bg))] text-[hsl(var(--editor-line-numbers-text))] border-r border-white/[0.04] font-mono text-[12px] py-3 px-2 select-none">
          {lineNumbers.map((num, index) => (
            <div key={index} className="text-right" style={{ lineHeight: '1.65' }}>
              {num}
            </div>
          ))}
        </div>

        {/* Code Area */}
        <div className="flex-1 relative">
          <Textarea
            ref={textareaRef}
            value={value}
            onChange={handleTextareaChange}
            onSelect={handleSelection}
            onMouseUp={handleSelection}
            onKeyUp={handleSelection}
            onKeyDown={handleKeyDown}
            className="editor-area h-full resize-none border-0 rounded-none p-3 focus-visible:ring-0"
            placeholder={`Enter your ${language.toUpperCase()} code here...`}
            style={{ minHeight: '100%', tabSize: 2 }}
            spellCheck={false}
          />

          {/* Status Bar */}
          <div className="absolute bottom-0 right-0 bg-[hsl(var(--editor-status-bg))] text-[hsl(var(--editor-status-text))] px-3 py-1 text-[10px] font-mono rounded-tl-md border-t border-l border-white/[0.04]">
            Ln {cursorPosition.line}, Col {cursorPosition.column} &middot; {language.toUpperCase()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
