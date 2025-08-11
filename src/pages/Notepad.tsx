import { useEffect, useMemo, useRef, useState } from "react";
import EditorToolbar from "@/components/EditorToolbar";
import WordCountDisplay from "@/components/WordCountDisplay";

const defaultContent = `
  <h1>Online Notepad</h1>
  <p>Type here... Use the toolbar above to add headings, lists, links, images, quotes, code and more.</p>
  <h2>Getting Started</h2>
  <ul>
    <li>Use Paragraph to switch between headings and paragraph.</li>
    <li>Use Bold/Italic/Underline for emphasis.</li>
    <li>Insert bullet or numbered lists.</li>
  </ul>
  <p>Content is auto-saved locally in your browser.</p>
`;

const Notepad = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [html, setHtml] = useState<string>(defaultContent);
  const [selectedText, setSelectedText] = useState<string>("");

  // SEO: title, meta description, canonical
  useEffect(() => {
    document.title = "Online Notepad – Rich Text Editor";

    const desc = "Free online notepad with headings, bullet lists, formatting and copy features.";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", desc);

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = `${window.location.origin}/notepad`;
  }, []);

  // Load/save to localStorage
  useEffect(() => {
    const saved = localStorage.getItem("notepadContent");
    if (saved) setHtml(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("notepadContent", html);
  }, [html]);

  const updateSelectedFromWindow = () => {
    const sel = window.getSelection();
    const root = editorRef.current;
    if (!sel || !root) {
      setSelectedText("");
      return;
    }
    if (sel.rangeCount === 0) {
      setSelectedText("");
      return;
    }
    const anchor = sel.anchorNode;
    if (anchor && root.contains(anchor)) {
      setSelectedText(sel.toString());
    } else {
      setSelectedText("");
    }
  };

  const onInsertCode = (code: string) => {
    const root = editorRef.current;
    if (!root) return;
    root.focus();
    // Insert HTML at caret using execCommand (works well for contentEditable)
    document.execCommand("insertHTML", false, code);
    // Update state with new HTML
    setHtml(root.innerHTML);
  };

  const onCopyContent = async () => {
    const root = editorRef.current;
    if (!root) return;
    try {
      // Try to copy HTML source
      await navigator.clipboard.writeText(root.innerHTML);
    } catch (e) {
      // Fallback to selection
      document.getSelection()?.selectAllChildren(root);
      document.execCommand("copy");
    }
  };

  const handleInput = () => {
    const root = editorRef.current;
    if (!root) return;
    setHtml(root.innerHTML);
  };

  // Keep editor DOM in sync when html state changes from external events (import/reset)
  useEffect(() => {
    const root = editorRef.current;
    if (!root) return;
    if (root.innerHTML !== html) {
      root.innerHTML = html;
    }
  }, [html]);

  const wordCountContent = useMemo(() => html, [html]);

  return (
    <div>
      {/* Semantic layout */}
      <header className="bg-white/80 backdrop-blur border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <h1 className="text-xl font-semibold text-slate-800">Online Notepad</h1>
          <p className="text-xs text-slate-500">Lightweight rich text notepad with headings, lists, formatting and copy.</p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4">
        {/* Toolbar */}
        <section aria-label="Notepad toolbar" className="mt-4 rounded-md border border-slate-200 bg-slate-50">
          <EditorToolbar onInsertCode={onInsertCode} selectedText={selectedText} onCopyContent={onCopyContent} />
        </section>

        {/* Info bar */}
        <aside className="flex items-center justify-between mt-3 text-xs text-slate-500">
          <div>
            Tip: Use Ctrl/Cmd+B, I, U for quick formatting. Your notes are auto-saved locally.
          </div>
          <WordCountDisplay htmlContent={wordCountContent} />
        </aside>

        {/* Editor */}
        <section className="mt-3">
          <div
            ref={editorRef}
            role="textbox"
            aria-label="Online notepad editor"
            contentEditable
            suppressContentEditableWarning
            onInput={handleInput}
            onKeyUp={updateSelectedFromWindow}
            onMouseUp={updateSelectedFromWindow}
            className="min-h-[50vh] rounded-md border border-slate-200 bg-white p-4 focus:outline-none focus:ring-2 focus:ring-ring"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </section>
      </main>

      <footer className="max-w-5xl mx-auto px-4 py-8 text-center text-xs text-slate-500">
        <p>
          Free Online Notepad tool. Built with the same editor features: headings, bullet points, tables, links, images and more.
        </p>
      </footer>
    </div>
  );
};

export default Notepad;
