import { useMemo, useRef, useEffect, useState } from "react";
import EditorToolbar from "@/components/EditorToolbar";
import WordCountDisplay from "@/components/WordCountDisplay";

interface NoteEditorProps { value: string; onChange: (html: string) => void; }

const templates = {
  daily: `<h2>Daily Plan</h2>\n<ul>\n  <li><input type="checkbox" /> Priority 1</li>\n  <li><input type="checkbox" /> Priority 2</li>\n  <li><input type="checkbox" /> Priority 3</li>\n</ul>\n<h3>Notes</h3>\n<p></p>`,
  weekly: `<h2>Weekly Planner</h2>\n<ul>\n  <li>Mon: </li>\n  <li>Tue: </li>\n  <li>Wed: </li>\n  <li>Thu: </li>\n  <li>Fri: </li>\n</ul>`,
  monthly: `<h2>Monthly Goals</h2>\n<ul>\n  <li>Goal 1</li>\n  <li>Goal 2</li>\n  <li>Goal 3</li>\n</ul>`,
  meeting: `<h2>Meeting Notes</h2>\n<p><strong>Date:</strong> </p>\n<p><strong>Attendees:</strong> </p>\n<h3>Agenda</h3>\n<ul><li></li></ul>\n<h3>Action Items</h3>\n<ul><li><input type="checkbox" /> </li></ul>`
};

const NoteEditor = ({ value, onChange }: NoteEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [selectedText, setSelectedText] = useState("");
  useEffect(() => { const r = editorRef.current; if (r && r.innerHTML !== value) r.innerHTML = value; }, [value]);

  const updateSel = () => { const sel = window.getSelection(); const r = editorRef.current; if (!sel || !r || sel.rangeCount === 0) return setSelectedText(""); if (sel.anchorNode && r.contains(sel.anchorNode)) setSelectedText(sel.toString()); else setSelectedText(""); };
  const onInsertCode = (code: string) => { const r = editorRef.current; if (!r) return; r.focus(); document.execCommand("insertHTML", false, code); onChange(r.innerHTML); };
  const onCopy = async () => { const r = editorRef.current; if (!r) return; try { await navigator.clipboard.writeText(r.innerHTML); } catch { document.getSelection()?.selectAllChildren(r); document.execCommand("copy"); } };
  const handleInput = () => { const r = editorRef.current; if (r) onChange(r.innerHTML); };
  const insert = (key: keyof typeof templates) => onInsertCode(templates[key]);

  return (
    <div>
      <section className="rounded-xl border border-border bg-white shadow-warm-sm overflow-hidden">
        <EditorToolbar onInsertCode={onInsertCode} selectedText={selectedText} onCopyContent={onCopy} />
        <div className="flex flex-wrap gap-1.5 p-2.5 border-t border-border bg-background">
          {(['daily','weekly','monthly','meeting'] as const).map(k => <button key={k} onClick={() => insert(k)} className="toolbar-btn px-2 py-1 text-xs rounded-md border border-border">Insert {k.charAt(0).toUpperCase()+k.slice(1)}</button>)}
          <button onClick={() => onInsertCode(`<ul>\n  <li><input type="checkbox" /> Task 1</li>\n  <li><input type="checkbox" /> Task 2</li>\n</ul>`)} className="toolbar-btn px-2 py-1 text-xs rounded-md border border-border">Checklist</button>
          <div className="ml-auto"><WordCountDisplay htmlContent={value} /></div>
        </div>
      </section>
      <section className="mt-3">
        <div ref={editorRef} role="textbox" aria-label="Note editor" contentEditable suppressContentEditableWarning dir="ltr" onInput={handleInput} onKeyUp={updateSel} onMouseUp={updateSel}
          style={{ direction: 'ltr', unicodeBidi: 'normal', textAlign: 'left', writingMode: 'horizontal-tb' }}
          className="min-h-[60vh] rounded-xl border border-border bg-white p-4 text-foreground focus:outline-none focus:ring-2 focus:ring-ring shadow-warm-sm" />
      </section>
    </div>
  );
};

export default NoteEditor;
