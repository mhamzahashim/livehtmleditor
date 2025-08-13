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

  // SEO
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

  // Load and ensure at least one note
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

  // Autosave on notes change
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-gradient-to-br from-indigo-600 to-blue-500 text-white flex items-center justify-center">
            <StickyNote className="w-5 h-5" />
          </div>
          <div className="mr-auto">
            <h1 className="text-lg font-semibold text-slate-800">Online Notepad</h1>
            <p className="text-xs text-slate-500">Multi-note, templates, autosave. Your tasks and meeting notes in one place.</p>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-2 top-1/2 -translate-y-1/2" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search notes..."
              className="pl-8 pr-3 py-2 rounded-md border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-ring text-sm w-64"
            />
          </div>

          <button onClick={addNote} className="ml-3 inline-flex items-center gap-2 px-3 py-2 rounded-md border border-slate-200 bg-slate-50 hover:bg-slate-100 text-sm">
            <Plus className="w-4 h-4" /> New Note
          </button>
        </div>
      </header>

      {/* Layout */}
      <div className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-12 gap-4">
        {/* Sidebar */}
        <aside className="col-span-12 md:col-span-4 lg:col-span-3">
          <div className="rounded-md border border-slate-200 bg-white">
            <div className="p-3 border-b border-slate-200 text-xs text-slate-500">Notes ({notes.length})</div>
            <ul className="divide-y divide-slate-200">
              {filtered.map(n => (
                <li key={n.id} className={`p-3 cursor-pointer ${n.id === activeId ? 'bg-slate-50' : 'bg-white'}`} onClick={() => setActiveId(n.id)}>
                  <input
                    value={n.title}
                    onChange={e => renameNote(n.id, e.target.value)}
                    className="w-full bg-transparent focus:outline-none font-medium text-slate-800"
                  />
                  <div className="flex justify-between items-center mt-1 text-xs text-slate-500">
                    <span>Updated {formatDate(n.updatedAt)}</span>
                    <button onClick={(e) => { e.stopPropagation(); removeNote(n.id); }} className="text-slate-400 hover:text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Tips / Shortcuts */}
          <div className="mt-4 rounded-md border border-slate-200 bg-white p-3 text-xs text-slate-600">
            <div className="font-semibold mb-2 flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> Productivity Templates</div>
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
            <div className="rounded-md border border-slate-200 bg-white p-4">
              <input
                value={activeNote.title}
                onChange={e => renameNote(activeNote.id, e.target.value)}
                className="w-full text-xl font-semibold text-slate-800 bg-transparent focus:outline-none"
              />
              <div className="mt-4">
                <NoteEditor value={activeNote.content} onChange={updateContent} />
              </div>
              <div className="mt-3 text-xs text-slate-500 flex items-center gap-2">
                <Save className="w-3.5 h-3.5" /> Autosaved at {formatDate(activeNote.updatedAt)}
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[60vh] rounded-md border border-slate-200 bg-white grid place-items-center text-slate-500">
              Select or create a note to start editing.
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Notepad;
