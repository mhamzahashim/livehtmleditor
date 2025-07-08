import { useRef, useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import EditorToolbar from './EditorToolbar';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
  darkMode?: boolean;
}

const CodeEditor = ({ value, onChange, language = 'html', darkMode = false }: CodeEditorProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [selectedText, setSelectedText] = useState('');
  const [lineNumbers, setLineNumbers] = useState<string[]>([]);
  const [cursorPosition, setCursorPosition] = useState({ line: 1, column: 1 });

  // Calculate line numbers
  useEffect(() => {
    const lines = value.split('\n');
    setLineNumbers(lines.map((_, index) => (index + 1).toString()));
  }, [value]);

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    
    // Update cursor position
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
      
      // Update cursor position
      const lines = value.substring(0, start).split('\n');
      const line = lines.length;
      const column = lines[lines.length - 1].length + 1;
      setCursorPosition({ line, column });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const textarea = e.target as HTMLTextAreaElement;
    
    // Auto-indentation
    if (e.key === 'Enter') {
      const start = textarea.selectionStart;
      const lineStart = value.lastIndexOf('\n', start - 1) + 1;
      const lineText = value.substring(lineStart, start);
      const indent = lineText.match(/^\s*/)?.[0] || '';
      
      // Add extra indent for opening tags
      let extraIndent = '';
      if (lineText.trim().endsWith('>') && !lineText.trim().endsWith('/>') && !lineText.includes('</')) {
        extraIndent = '  ';
      }
      
      e.preventDefault();
      const newValue = value.substring(0, start) + '\n' + indent + extraIndent + value.substring(textarea.selectionEnd);
      onChange(newValue);
      
      // Set cursor position after the indent
      setTimeout(() => {
        if (textarea) {
          const newCursorPos = start + 1 + indent.length + extraIndent.length;
          textarea.setSelectionRange(newCursorPos, newCursorPos);
        }
      }, 0);
    }
    
    // Tab indentation
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      
      if (start === end) {
        // Insert tab at cursor
        const newValue = value.substring(0, start) + '  ' + value.substring(end);
        onChange(newValue);
        setTimeout(() => {
          if (textarea) {
            textarea.setSelectionRange(start + 2, start + 2);
          }
        }, 0);
      } else {
        // Indent selected lines
        const lines = value.split('\n');
        const startLine = value.substring(0, start).split('\n').length - 1;
        const endLine = value.substring(0, end).split('\n').length - 1;
        
        for (let i = startLine; i <= endLine; i++) {
          if (e.shiftKey) {
            // Remove indent
            if (lines[i].startsWith('  ')) {
              lines[i] = lines[i].substring(2);
            }
          } else {
            // Add indent
            lines[i] = '  ' + lines[i];
          }
        }
        
        onChange(lines.join('\n'));
      }
    }
    
    // Save shortcut
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      // Trigger save (could be enhanced with actual save functionality)
      console.log('Save triggered');
    }
  };

  const handleInsertCode = (code: string) => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      
      const newValue = value.substring(0, start) + code + value.substring(end);
      onChange(newValue);
      
      // Set cursor position after the inserted code
      setTimeout(() => {
        if (textarea) {
          textarea.focus();
          textarea.setSelectionRange(start + code.length, start + code.length);
        }
      }, 0);
    }
  };

  const getHighlightedCode = (code: string) => {
    if (language === 'html') {
      return code
        .replace(/(<\/?[^>]+>)/g, '<span class="text-blue-600">$1</span>')
        .replace(/(\w+)=/g, '<span class="text-purple-600">$1</span>=')
        .replace(/"([^"]*)"/g, '"<span class="text-green-600">$1</span>"');
    }
    return code;
  };

  return (
    <div className="h-full flex flex-col">
      <EditorToolbar onInsertCode={handleInsertCode} selectedText={selectedText} />
      
      <div className="flex-1 flex">
        {/* Line Numbers */}
        <div className={`w-12 ${darkMode ? 'bg-gray-800 text-gray-400' : 'bg-slate-100 text-slate-500'} border-r border-slate-200 font-mono text-sm py-4 px-2`}>
          {lineNumbers.map((num, index) => (
            <div key={index} className="text-right leading-6">
              {num}
            </div>
          ))}
        </div>
        
        {/* Code Editor */}
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
            placeholder={`Enter your ${language.toUpperCase()} code here...`}
            style={{ 
              minHeight: '100%',
              lineHeight: '1.5rem',
              tabSize: 2
            }}
            spellCheck={false}
          />
          
          {/* Status Bar */}
          <div className={`absolute bottom-0 right-0 ${
            darkMode ? 'bg-gray-700 text-gray-300' : 'bg-slate-200 text-slate-600'
          } px-3 py-1 text-xs font-mono`}>
            Ln {cursorPosition.line}, Col {cursorPosition.column} • {language.toUpperCase()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
