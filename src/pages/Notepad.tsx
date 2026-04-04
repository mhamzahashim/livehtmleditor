import { useEffect, useMemo, useRef, useState } from "react";
import { Note, deleteNote, loadNotes, saveNotes, upsertNote } from "@/utils/notepadStorage";
import NoteEditor from "@/components/notepad/NoteEditor";
import { Plus, Trash2, Save, Search, CheckCircle2, StickyNote, Download, Upload, Pin } from "lucide-react";
import TurndownService from "turndown";

const createNote = (title?: string): Note => ({
  id: crypto.randomUUID(),
  title: title || "Untitled Note",
  content: "<p></p>",
  createdAt: Date.now(),
  updatedAt: Date.now(),
});

const formatDate = (ts: number) => new Date(ts).toLocaleString();

const Notepad = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    document.title = "Online Notepad – Powerful multi-note editor";
    const desc = "Professional online notepad with multiple notes, templates, autosave, and full rich text features.";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) { meta = document.createElement("meta"); meta.setAttribute("name", "description"); document.head.appendChild(meta); }
    meta.setAttribute("content", desc);
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    canonical.href = `${window.location.origin}/notepad`;
  }, []);

  useEffect(() => {
    const initial = loadNotes();
    if (initial.length === 0) {
      const n = createNote("My First Note");
      setNotes([n]);
      setActiveId(n.id);
      saveNotes([n]);
    } else {
      setNotes(initial);
      setActiveId(initial[0].id);
    }
  }, []);

  useEffect(() => { saveNotes(notes); }, [notes]);

  const activeNote = useMemo(() => notes.find(n => n.id === activeId) || null, [notes, activeId]);

  const addNote = () => {
    const n = createNote();
    setNotes(prev => [n, ...prev]);
    setActiveId(n.id);
  };

  const removeNote = (id: string) => {
    const updated = deleteNote(notes, id);
    setNotes(updated);
    if (activeId === id) setActiveId(updated[0]?.id ?? null);
  };

  const renameNote = (id: string, title: string) => {
    const n = notes.find(x => x.id === id);
    if (!n) return;
    const updated = upsertNote(notes, { ...n, title, updatedAt: Date.now() });
    setNotes(updated);
  };

  const updateContent = (html: string) => {
    if (!activeNote) return;
    const updated = upsertNote(notes, { ...activeNote, content: html, updatedAt: Date.now() });
    setNotes(updated);
  };

  const filtered = useMemo(() => {
    if (!query.trim()) return notes;
    const q = query.toLowerCase();
    return notes.filter(n => n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q));
  }, [notes, query]);

  return (
    <div className="min-h-screen ambient-bg dot-grid">
      <div className="relative z-10">
        {/* Header */}
        <header className="glass border-b border-white/[0.06]">
          <div className="max-w-[1600px] mx-auto px-4 py-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-400 text-white flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <StickyNote className="w-5 h-5" />
            </div>
            <div className="mr-auto">
              <h1 className="text-lg font-semibold text-white">Online Notepad</h1>
              <p className="text-xs text-[#5C6178]">Multi-note, templates, autosave. Your tasks and meeting notes in one place.</p>
            </div>

            <div className="relative">
              <Search className="w-4 h-4 text-[#5C6178] absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search notes..."
                className="pl-8 pr-3 py-2 rounded-lg border border-white/[0.08] bg-surface-2 text-sm text-white placeholder-[#5C6178] focus:outline-none focus:ring-2 focus:ring-indigo-500/30 w-64"
              />
            </div>

            <button onClick={addNote} className="ml-3 inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-white/[0.08] bg-surface-2 hover:bg-surface-3 text-sm text-[#9DA3B4] hover:text-white transition-colors">
              <Plus className="w-4 h-4" /> New Note
            </button>
          </div>
        </header>

        {/* Layout */}
        <div className="max-w-[1600px] mx-auto px-4 py-4 grid grid-cols-12 gap-4">
          {/* Sidebar */}
          <aside className="col-span-12 md:col-span-4 lg:col-span-3">
            <div className="rounded-xl border border-white/[0.06] bg-surface overflow-hidden">
              <div className="p-3 border-b border-white/[0.06] text-xs text-[#5C6178] font-mono">Notes ({notes.length})</div>
              <ul className="divide-y divide-white/[0.04]">
                {filtered.map(n => (
                  <li key={n.id} className={`p-3 cursor-pointer transition-colors ${n.id === activeId ? 'bg-surface-2' : 'hover:bg-surface-2/50'}`} onClick={() => setActiveId(n.id)}>
                    <input
                      value={n.title}
                      onChange={e => renameNote(n.id, e.target.value)}
                      className="w-full bg-transparent focus:outline-none font-medium text-white text-sm"
                    />
                    <div className="flex justify-between items-center mt-1 text-[11px] text-[#5C6178]">
                      <span>Updated {formatDate(n.updatedAt)}</span>
                      <button onClick={(e) => { e.stopPropagation(); removeNote(n.id); }} className="text-[#3A3F52] hover:text-rose-500 transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tips */}
            <div className="mt-4 rounded-xl border border-white/[0.06] bg-surface p-3 text-xs text-[#7A7F94]">
              <div className="font-semibold mb-2 flex items-center gap-1 text-[#9DA3B4]"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Productivity Templates</div>
              <ul className="list-disc ml-4 space-y-1">
                <li>Use templates in the toolbar to insert Daily/Weekly/Monthly plans.</li>
                <li>Track meetings with attendees, decisions, and action items.</li>
                <li>Everything is auto-saved locally to your browser.</li>
              </ul>
            </div>
          </aside>

          {/* Editor */}
          <main className="col-span-12 md:col-span-8 lg:col-span-9">
            {activeNote ? (
              <div className="rounded-xl border border-white/[0.06] bg-surface p-4">
                <input
                  value={activeNote.title}
                  onChange={e => renameNote(activeNote.id, e.target.value)}
                  className="w-full text-xl font-semibold text-white bg-transparent focus:outline-none"
                />
                <div className="mt-4">
                  <NoteEditor value={activeNote.content} onChange={updateContent} />
                </div>
                <div className="mt-3 text-[11px] text-[#3A3F52] flex items-center gap-2 font-mono">
                  <Save className="w-3.5 h-3.5" /> Autosaved at {formatDate(activeNote.updatedAt)}
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[60vh] rounded-xl border border-white/[0.06] bg-surface grid place-items-center text-[#5C6178]">
                Select or create a note to start editing.
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Notepad;
