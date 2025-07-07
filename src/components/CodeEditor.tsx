
import { Textarea } from '@/components/ui/textarea';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const CodeEditor = ({ value, onChange }: CodeEditorProps) => {
  return (
    <div className="h-full p-4">
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-full font-mono text-sm bg-slate-50/50 border-slate-200 focus:border-indigo-300 focus:ring-indigo-200 resize-none"
        placeholder="Enter your HTML code here..."
        style={{ minHeight: '100%' }}
      />
    </div>
  );
};

export default CodeEditor;
