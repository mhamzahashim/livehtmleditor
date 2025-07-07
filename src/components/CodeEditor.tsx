
import { useRef, useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import EditorToolbar from './EditorToolbar';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const CodeEditor = ({ value, onChange }: CodeEditorProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [selectedText, setSelectedText] = useState('');

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

  return (
    <div className="h-full flex flex-col">
      <EditorToolbar onInsertCode={handleInsertCode} selectedText={selectedText} />
      <div className="flex-1 p-4">
        <Textarea
          ref={textareaRef}
          value={value}
          onChange={handleTextareaChange}
          onSelect={handleSelection}
          onMouseUp={handleSelection}
          onKeyUp={handleSelection}
          className="h-full font-mono text-sm bg-slate-50/50 border-slate-200 focus:border-indigo-300 focus:ring-indigo-200 resize-none"
          placeholder="Enter your HTML code here..."
          style={{ minHeight: '100%' }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
