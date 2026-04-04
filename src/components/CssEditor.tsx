
import { useRef, useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Palette, Zap } from 'lucide-react';

interface CssEditorProps {
  value: string;
  onChange: (value: string) => void;
  darkMode?: boolean;
}

const CssEditor = ({ value, onChange }: CssEditorProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [selectedText, setSelectedText] = useState('');
  const [lineNumbers, setLineNumbers] = useState<string[]>([]);
  const [showColorPicker, setShowColorPicker] = useState(false);

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

    if (e.key === '{') {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      e.preventDefault();
      const newValue = value.substring(0, start) + '{\n  \n}' + value.substring(end);
      onChange(newValue);
      setTimeout(() => { if (textarea) textarea.setSelectionRange(start + 3, start + 3); }, 0);
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

  const insertCssSnippet = (snippet: string) => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newValue = value.substring(0, start) + snippet + value.substring(end);
      onChange(newValue);
      setTimeout(() => { if (textarea) { textarea.focus(); textarea.setSelectionRange(start + snippet.length, start + snippet.length); } }, 0);
    }
  };

  const cssSnippets = [
    { name: 'Flexbox Center', code: `display: flex;\njustify-content: center;\nalign-items: center;` },
    { name: 'Grid Layout', code: `display: grid;\ngrid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\ngap: 1rem;` },
    { name: 'Card Shadow', code: `box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);\nborder-radius: 8px;\npadding: 1rem;` },
    { name: 'Gradient', code: `background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);` }
  ];

  return (
    <div className="h-full flex flex-col">
      {/* CSS Toolbar */}
      <div className="flex flex-wrap gap-1.5 p-2.5 bg-surface-2/60 border-b border-white/[0.04]">
        <Button
          onClick={() => setShowColorPicker(!showColorPicker)}
          variant="ghost"
          size="sm"
          className="toolbar-btn h-7 px-2.5 text-xs gap-1.5"
        >
          <Palette className="w-3.5 h-3.5" />
          Colors
        </Button>
        {cssSnippets.map((snippet, index) => (
          <Button
            key={index}
            onClick={() => insertCssSnippet(snippet.code)}
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

        {/* CSS Editor */}
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
            placeholder="/* Add your CSS styles here */"
            style={{ minHeight: '100%', tabSize: 2 }}
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
};

export default CssEditor;
