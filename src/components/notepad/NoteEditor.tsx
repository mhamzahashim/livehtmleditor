import { useMemo, useRef, useEffect, useState } from "react";
import EditorToolbar from "@/components/EditorToolbar";
import WordCountDisplay from "@/components/WordCountDisplay";

interface NoteEditorProps {
  value: string;
  onChange: (html: string) => void;
}

const templates = {
  daily: `<h2>Daily Plan</h2>\n<ul>\n  <li><input type="checkbox" /> Priority 1</li>\n  <li><input type="checkbox" /> Priority 2</li>\n  <li><input type="checkbox" /> Priority 3</li>\n</ul>\n<h3>Notes</h3>\n<p></p>` ,
  weekly: `<h2>Weekly Planner</h2>\n<ul>\n  <li>Mon: </li>\n  <li>Tue: </li>\n  <li>Wed: </li>\n  <li>Thu: </li>\n  <li>Fri: </li>\n</ul>` ,
  monthly: `<h2>Monthly Goals</h2>\n<ul>\n  <li>Goal 1</li>\n  <li>Goal 2</li>\n  <li>Goal 3</li>\n</ul>` ,
  meeting: `<h2>Meeting Notes</h2>\n<p><strong>Date:</strong> </p>\n<p><strong>Attendees:</strong> </p>\n<h3>Agenda</h3>\n<ul>\n  <li></li>\n</ul>\n<h3>Decisions</h3>\n<ul>\n  <li></li>\n</ul>\n<h3>Action Items</h3>\n<ul>\n  <li><input type="checkbox" /> </li>\n</ul>`
};

const NoteEditor = ({ value, onChange }: NoteEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [selectedText, setSelectedText] = useState("");

  useEffect(() => {
    const root = editorRef.current;
    if (!root) return;
    if (root.innerHTML !== value) root.innerHTML = value;
  }, [value]);

  const updateSelectedFromWindow = () => {
    const sel = window.getSelection();
    const root = editorRef.current;
    if (!sel || !root || sel.rangeCount === 0) return setSelectedText("");
    const anchor = sel.anchorNode;
    if (anchor && root.contains(anchor)) setSelectedText(sel.toString());
    else setSelectedText("");
  };

  const onInsertCode = (code: string) => {
    const root = editorRef.current;
    if (!root) return;
    root.focus();
    document.execCommand("insertHTML", false, code);
    onChange(root.innerHTML);
  };

  const onCopyContent = async () => {
    const root = editorRef.current;
    if (!root) return;
    try {
      await navigator.clipboard.writeText(root.innerHTML);
    } catch {
      document.getSelection()?.selectAllChildren(root);
      document.execCommand("copy");
    }
  };

  const handleInput = () => {
    const root = editorRef.current;
    if (!root) return;
    onChange(root.innerHTML);
  };

  const insertTemplate = (key: keyof typeof templates) => onInsertCode(templates[key]);

  const wcHtml = useMemo(() => value, [value]);

  return (
    <div>
      <section aria-label="Editor toolbar" className="rounded-xl border border-white/[0.06] bg-surface overflow-hidden">
        <EditorToolbar onInsertCode={onInsertCode} selectedText={selectedText} onCopyContent={onCopyContent} />
        <div className="flex flex-wrap gap-1.5 p-2.5 border-t border-white/[0.04] bg-surface-2/60">
          <button onClick={() => insertTemplate('daily')} className="toolbar-btn px-2 py-1 text-xs rounded-md border border-white/[0.06]">Insert Daily</button>
          <button onClick={() => insertTemplate('weekly')} className="toolbar-btn px-2 py-1 text-xs rounded-md border border-white/[0.06]">Insert Weekly</button>
          <button onClick={() => insertTemplate('monthly')} className="toolbar-btn px-2 py-1 text-xs rounded-md border border-white/[0.06]">Insert Monthly</button>
          <button onClick={() => insertTemplate('meeting')} className="toolbar-btn px-2 py-1 text-xs rounded-md border border-white/[0.06]">Insert Meeting</button>
          <button onClick={() => onInsertCode(`<ul>\n  <li><input type="checkbox" /> Task 1</li>\n  <li><input type="checkbox" /> Task 2</li>\n  <li><input type="checkbox" /> Task 3</li>\n</ul>`)} className="toolbar-btn px-2 py-1 text-xs rounded-md border border-white/[0.06]">Insert Checklist</button>
          <div className="ml-auto"><WordCountDisplay htmlContent={wcHtml} /></div>
        </div>
      </section>
      <section className="mt-3">
        <div
          ref={editorRef}
          role="textbox"
          aria-label="Note editor"
          contentEditable
          suppressContentEditableWarning
          dir="ltr"
          onInput={handleInput}
          onKeyUp={updateSelectedFromWindow}
          onMouseUp={updateSelectedFromWindow}
          style={{
            direction: 'ltr',
            unicodeBidi: 'normal',
            textAlign: 'left',
            writingMode: 'horizontal-tb'
          }}
          className="min-h-[60vh] rounded-xl border border-white/[0.06] bg-white p-4 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
        />
      </section>
    </div>
  );
};

export default NoteEditor;
