
import { useRef, useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Zap } from 'lucide-react';

interface JsEditorProps {
  value: string;
  onChange: (value: string) => void;
  darkMode?: boolean;
}

const JsEditor = ({ value, onChange }: JsEditorProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [selectedText, setSelectedText] = useState('');
  const [lineNumbers, setLineNumbers] = useState<string[]>([]);

  useEffect(() => {
    const lines = value.split('\n');
    setLineNumbers(lines.map((_, index) => (index + 1).toString()));
  }, [value]);

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const handleSelection = () => {
    if (textareaRef.current) {
      const start = textareaRef.current.selectionStart;
      const end = textareaRef.current.selectionEnd;
      setSelectedText(value.substring(start, end));
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
      if (lineText.trim().endsWith('{')) extraIndent = '  ';
      e.preventDefault();
      const newValue = value.substring(0, start) + '\n' + indent + extraIndent + value.substring(textarea.selectionEnd);
      onChange(newValue);
      setTimeout(() => { if (textarea) { const p = start + 1 + indent.length + extraIndent.length; textarea.setSelectionRange(p, p); } }, 0);
    }

    const autoCloseChars: { [key: string]: string } = { '(': ')', '[': ']', '{': '}', '"': '"', "'": "'" };
    if (autoCloseChars[e.key]) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      e.preventDefault();
      let closing = autoCloseChars[e.key];
      if (e.key === '{') closing = '\n}';
      const newValue = value.substring(0, start) + e.key + (end > start ? value.substring(start, end) : '') + closing + value.substring(end);
      onChange(newValue);
      setTimeout(() => { if (textarea) { const p = e.key === '{' ? start + 1 : start + 1; textarea.setSelectionRange(p, p); } }, 0);
    }

    if (e.key === 'Tab') {
      e.preventDefault();
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newValue = value.substring(0, start) + '  ' + value.substring(end);
      onChange(newValue);
      setTimeout(() => { if (textarea) textarea.setSelectionRange(start + 2, start + 2); }, 0);
    }
  };

  const insertJsSnippet = (snippet: string) => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newValue = value.substring(0, start) + snippet + value.substring(end);
      onChange(newValue);
      setTimeout(() => { if (textarea) { textarea.focus(); textarea.setSelectionRange(start + snippet.length, start + snippet.length); } }, 0);
    }
  };

  const jsSnippets = [
    { name: 'Event Listener', code: `document.addEventListener('DOMContentLoaded', function() {\n  // Your code here\n});` },
    { name: 'Async Fetch', code: `async function fetchData() {\n  try {\n    const response = await fetch('your-url');\n    const data = await response.json();\n    return data;\n  } catch (error) {\n    console.error('Error:', error);\n  }\n}` },
    { name: 'forEach', code: `items.forEach((item, index) => {\n  console.log(item, index);\n});` },
    { name: 'querySelector', code: `const element = document.querySelector('.your-selector');\nif (element) {\n  element.addEventListener('click', function() {\n    // Handle click\n  });\n}` }
  ];

  return (
    <div className="h-full flex flex-col">
      {/* JS Toolbar */}
      <div className="flex flex-wrap gap-1.5 p-2.5 bg-surface-2/60 border-b border-white/[0.04]">
        {jsSnippets.map((snippet, index) => (
          <Button
            key={index}
            onClick={() => insertJsSnippet(snippet.code)}
            variant="ghost"
            size="sm"
            className="toolbar-btn h-7 px-2.5 text-xs gap-1.5"
          >
            <Zap className="w-3.5 h-3.5" />
            {snippet.name}
          </Button>
        ))}
      </div>

      <div className="flex-1 flex">
        {/* Line Numbers */}
        <div className="w-12 bg-[hsl(var(--editor-line-numbers-bg))] text-[hsl(var(--editor-line-numbers-text))] border-r border-white/[0.04] font-mono text-[12px] py-3 px-2 select-none">
          {lineNumbers.map((num, index) => (
            <div key={index} className="text-right" style={{ lineHeight: '1.65' }}>{num}</div>
          ))}
        </div>

        {/* JS Editor */}
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
            placeholder="// Add your JavaScript code here"
            style={{ minHeight: '100%', tabSize: 2 }}
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
};

export default JsEditor;
