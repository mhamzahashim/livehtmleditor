
import { useRef, useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Palette, Zap } from 'lucide-react';

interface CssEditorProps {
  value: string;
  onChange: (value: string) => void;
  darkMode?: boolean;
}

const CssEditor = ({ value, onChange, darkMode = false }: CssEditorProps) => {
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
      const selected = value.substring(start, end);
      setSelectedText(selected);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const textarea = e.target as HTMLTextAreaElement;
    
    // Auto-indentation for CSS
    if (e.key === 'Enter') {
      const start = textarea.selectionStart;
      const lineStart = value.lastIndexOf('\n', start - 1) + 1;
      const lineText = value.substring(lineStart, start);
      const indent = lineText.match(/^\s*/)?.[0] || '';
      
      let extraIndent = '';
      if (lineText.trim().endsWith('{')) {
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
    
    // Auto-close braces
    if (e.key === '{') {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      
      e.preventDefault();
      const newValue = value.substring(0, start) + '{\n  \n}' + value.substring(end);
      onChange(newValue);
      
      setTimeout(() => {
        if (textarea) {
          textarea.setSelectionRange(start + 3, start + 3);
        }
      }, 0);
    }
    
    // Tab indentation
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      
      const newValue = value.substring(0, start) + '  ' + value.substring(end);
      onChange(newValue);
      setTimeout(() => {
        if (textarea) {
          textarea.setSelectionRange(start + 2, start + 2);
        }
      }, 0);
    }
  };

  const insertCssSnippet = (snippet: string) => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      
      const newValue = value.substring(0, start) + snippet + value.substring(end);
      onChange(newValue);
      
      setTimeout(() => {
        if (textarea) {
          textarea.focus();
          textarea.setSelectionRange(start + snippet.length, start + snippet.length);
        }
      }, 0);
    }
  };

  const cssSnippets = [
    {
      name: 'Flexbox Center',
      code: `display: flex;
justify-content: center;
align-items: center;`
    },
    {
      name: 'Grid Layout',
      code: `display: grid;
grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
gap: 1rem;`
    },
    {
      name: 'Card Shadow',
      code: `box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
border-radius: 8px;
padding: 1rem;`
    },
    {
      name: 'Gradient Background',
      code: `background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);`
    }
  ];

  return (
    <div className="h-full flex flex-col">
      {/* CSS Toolbar */}
      <div className="flex flex-wrap gap-2 p-3 bg-slate-50 border-b border-slate-200">
        <Button
          onClick={() => setShowColorPicker(!showColorPicker)}
          variant="outline"
          size="sm"
          className="text-slate-600 hover:bg-slate-100"
          title="Color Picker"
        >
          <Palette className="w-4 h-4 mr-2" />
          Colors
        </Button>
        
        {cssSnippets.map((snippet, index) => (
          <Button
            key={index}
            onClick={() => insertCssSnippet(snippet.code)}
            variant="outline"
            size="sm"
            className="text-slate-600 hover:bg-slate-100"
            title={`Insert ${snippet.name}`}
          >
            <Zap className="w-4 h-4 mr-2" />
            {snippet.name}
          </Button>
        ))}
      </div>
      
      <div className="flex-1 flex">
        {/* Line Numbers */}
        <div className="w-12 bg-slate-100 text-slate-500 border-r border-slate-200 font-mono text-sm py-4 px-2">
          {lineNumbers.map((num, index) => (
            <div key={index} className="text-right leading-6">
              {num}
            </div>
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
            className="h-full font-mono text-sm resize-none border-0 rounded-none bg-slate-50/50 text-slate-800 placeholder-gray-400 focus:ring-0 focus:border-0"
            placeholder="/* Add your CSS styles here */&#10;body {&#10;  font-family: Arial, sans-serif;&#10;}"
            style={{ 
              minHeight: '100%',
              lineHeight: '1.5rem',
              tabSize: 2
            }}
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
};

export default CssEditor;
