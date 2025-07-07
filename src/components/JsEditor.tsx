
import { useRef, useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Code, Zap } from 'lucide-react';

interface JsEditorProps {
  value: string;
  onChange: (value: string) => void;
  darkMode?: boolean;
}

const JsEditor = ({ value, onChange, darkMode = false }: JsEditorProps) => {
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
      const selected = value.substring(start, end);
      setSelectedText(selected);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const textarea = e.target as HTMLTextAreaElement;
    
    // Auto-indentation for JavaScript
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
    
    // Auto-close brackets and quotes
    const autoCloseChars: { [key: string]: string } = {
      '(': ')',
      '[': ']',
      '{': '}',
      '"': '"',
      "'": "'"
    };
    
    if (autoCloseChars[e.key]) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      
      e.preventDefault();
      let closing = autoCloseChars[e.key];
      if (e.key === '{') {
        closing = '\n}';
      }
      
      const newValue = value.substring(0, start) + e.key + (end > start ? value.substring(start, end) : '') + closing + value.substring(end);
      onChange(newValue);
      
      setTimeout(() => {
        if (textarea) {
          const newPos = e.key === '{' ? start + 1 : start + 1;
          textarea.setSelectionRange(newPos, newPos);
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

  const insertJsSnippet = (snippet: string) => {
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

  const jsSnippets = [
    {
      name: 'Event Listener',
      code: `document.addEventListener('DOMContentLoaded', function() {
  // Your code here
});`
    },
    {
      name: 'Async Function',
      code: `async function fetchData() {
  try {
    const response = await fetch('your-url');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}`
    },
    {
      name: 'For Each Loop',
      code: `items.forEach((item, index) => {
  console.log(item, index);
});`
    },
    {
      name: 'Query Selector',
      code: `const element = document.querySelector('.your-selector');
if (element) {
  element.addEventListener('click', function() {
    // Handle click
  });
}`
    }
  ];

  return (
    <div className="h-full flex flex-col">
      {/* JS Toolbar */}
      <div className={`flex flex-wrap gap-2 p-3 ${darkMode ? 'bg-gray-800' : 'bg-slate-50'} border-b border-slate-200`}>
        {jsSnippets.map((snippet, index) => (
          <Button
            key={index}
            onClick={() => insertJsSnippet(snippet.code)}
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
        <div className={`w-12 ${darkMode ? 'bg-gray-800 text-gray-400' : 'bg-slate-100 text-slate-500'} border-r border-slate-200 font-mono text-sm py-4 px-2`}>
          {lineNumbers.map((num, index) => (
            <div key={index} className="text-right leading-6">
              {num}
            </div>
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
            className={`h-full font-mono text-sm resize-none border-0 rounded-none ${
              darkMode 
                ? 'bg-gray-900 text-white placeholder-gray-500' 
                : 'bg-slate-50/50 text-slate-800 placeholder-gray-400'
            } focus:ring-0 focus:border-0`}
            placeholder="// Add your JavaScript code here&#10;console.log('Hello World!');"
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

export default JsEditor;
