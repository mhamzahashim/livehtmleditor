export type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: number;
  updatedAt: number;
};

const NOTES_KEY = "notepadNotes:v1";

export function loadNotes(): Note[] {
  try {
    const raw = localStorage.getItem(NOTES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as Note[];
  } catch {
    return [];
  }
}

export function saveNotes(notes: Note[]) {
  localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
}

export function upsertNote(notes: Note[], note: Note): Note[] {
  const idx = notes.findIndex(n => n.id === note.id);
  if (idx === -1) return [...notes, note];
  const updated = [...notes];
  updated[idx] = note;
  return updated;
}

export function deleteNote(notes: Note[], id: string): Note[] {
  return notes.filter(n => n.id !== id);
}
