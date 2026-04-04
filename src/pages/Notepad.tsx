import { useEffect, useMemo, useState } from "react";
import { Note, deleteNote, loadNotes, saveNotes, upsertNote } from "@/utils/notepadStorage";
import NoteEditor from "@/components/notepad/NoteEditor";
import { Plus, Trash2, Save, Search, CheckCircle2, StickyNote } from "lucide-react";

const createNote = (title?: string): Note => ({ id: crypto.randomUUID(), title: title || "Untitled Note", content: "<p></p>", createdAt: Date.now(), updatedAt: Date.now() });
const formatDate = (ts: number) => new Date(ts).toLocaleString();

const Notepad = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  useEffect(() => { document.title = "Online Notepad"; let m = document.querySelector('meta[name="description"]'); if (!m) { m = document.createElement("meta"); m.setAttribute("name", "description"); document.head.appendChild(m); } m.setAttribute("content", "Professional online notepad with multiple notes, templates, autosave."); let c = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null; if (!c) { c = document.createElement("link"); c.rel = "canonical"; document.head.appendChild(c); } c.href = `${window.location.origin}/notepad`; }, []);
  useEffect(() => { const init = loadNotes(); if (init.length === 0) { const n = createNote("My First Note"); setNotes([n]); setActiveId(n.id); saveNotes([n]); } else { setNotes(init); setActiveId(init[0].id); } }, []);
  useEffect(() => { saveNotes(notes); }, [notes]);

  const activeNote = useMemo(() => notes.find(n => n.id === activeId) || null, [notes, activeId]);
  const addNote = () => { const n = createNote(); setNotes(p => [n, ...p]); setActiveId(n.id); };
  const removeNote = (id: string) => { const u = deleteNote(notes, id); setNotes(u); if (activeId === id) setActiveId(u[0]?.id ?? null); };
  const renameNote = (id: string, title: string) => { const n = notes.find(x => x.id === id); if (n) setNotes(upsertNote(notes, { ...n, title, updatedAt: Date.now() })); };
  const updateContent = (html: string) => { if (activeNote) setNotes(upsertNote(notes, { ...activeNote, content: html, updatedAt: Date.now() })); };
  const filtered = useMemo(() => { if (!query.trim()) return notes; const q = query.toLowerCase(); return notes.filter(n => n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q)); }, [notes, query]);

  return (
    <div className="min-h-screen dot-grid">
      <header className="border-b border-border bg-white shadow-warm-sm">
        <div className="max-w-[1400px] mx-auto px-4 py-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center shadow-md">
            <StickyNote className="w-5 h-5" />
          </div>
          <div className="mr-auto">
            <h1 className="text-lg font-semibold text-foreground">Online Notepad</h1>
            <p className="text-xs text-muted-foreground">Multi-note, templates, autosave.</p>
          </div>
          <div className="relative">
            <Search className="w-4 h-4 text-muted-foreground absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search notes..." className="pl-8 pr-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring w-64" />
          </div>
          <button onClick={addNote} className="ml-3 inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-white hover:bg-muted text-sm text-muted-foreground hover:text-foreground transition-colors shadow-warm-sm">
            <Plus className="w-4 h-4" /> New Note
          </button>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-4 py-4 grid grid-cols-12 gap-4">
        <aside className="col-span-12 md:col-span-4 lg:col-span-3">
          <div className="rounded-xl border border-border bg-white shadow-warm-sm overflow-hidden">
            <div className="p-3 border-b border-border text-xs text-muted-foreground font-mono">Notes ({notes.length})</div>
            <ul className="divide-y divide-border">
              {filtered.map(n => (
                <li key={n.id} className={`p-3 cursor-pointer transition-colors ${n.id === activeId ? 'bg-amber-50 accent-left' : 'hover:bg-muted/50'}`} onClick={() => setActiveId(n.id)}>
                  <input value={n.title} onChange={e => renameNote(n.id, e.target.value)} className="w-full bg-transparent focus:outline-none font-medium text-foreground text-sm" />
                  <div className="flex justify-between items-center mt-1 text-[11px] text-muted-foreground">
                    <span>Updated {formatDate(n.updatedAt)}</span>
                    <button onClick={e => { e.stopPropagation(); removeNote(n.id); }} className="text-muted-foreground/40 hover:text-red-500 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4 rounded-xl border border-border bg-white shadow-warm-sm p-3 text-xs text-muted-foreground">
            <div className="font-semibold mb-2 flex items-center gap-1 text-foreground"><CheckCircle2 className="w-4 h-4 text-green-600" /> Productivity Templates</div>
            <ul className="list-disc ml-4 space-y-1">
              <li>Use templates in the toolbar for Daily/Weekly/Monthly plans.</li>
              <li>Track meetings with attendees, decisions, action items.</li>
              <li>Everything is auto-saved locally.</li>
            </ul>
          </div>
        </aside>
        <main className="col-span-12 md:col-span-8 lg:col-span-9">
          {activeNote ? (
            <div className="rounded-xl border border-border bg-white shadow-warm-sm p-4">
              <input value={activeNote.title} onChange={e => renameNote(activeNote.id, e.target.value)} className="w-full text-xl font-semibold text-foreground bg-transparent focus:outline-none" />
              <div className="mt-4"><NoteEditor value={activeNote.content} onChange={updateContent} /></div>
              <div className="mt-3 text-[11px] text-muted-foreground flex items-center gap-2 font-mono"><Save className="w-3.5 h-3.5" /> Autosaved at {formatDate(activeNote.updatedAt)}</div>
            </div>
          ) : (
            <div className="h-full min-h-[60vh] rounded-xl border border-border bg-white shadow-warm-sm grid place-items-center text-muted-foreground">Select or create a note.</div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Notepad;
