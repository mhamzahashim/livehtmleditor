import { useEffect, useState, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchNote, updateNote, deleteNoteById, createNote, DbNote } from '@/utils/notesApi';
import NoteEditor from '@/components/notepad/NoteEditor';
import {
  StickyNote, Loader2, Share2, Copy, Check, Trash2, Plus,
  Clock, Save, AlertCircle,
} from 'lucide-react';

const formatDate = (iso: string) => new Date(iso).toLocaleString();

const daysLeft = (expiresAt: string) => {
  const diff = new Date(expiresAt).getTime() - Date.now();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return Math.max(0, days);
};

const NoteView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [note, setNote] = useState<DbNote | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const latestContent = useRef<string>('');
  const latestTitle = useRef<string>('');

  useEffect(() => {
    document.title = 'Online Notepad';
  }, []);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchNote(id).then((n) => {
      if (n) {
        setNote(n);
        latestContent.current = n.content;
        latestTitle.current = n.title;
        setLastSaved(n.updated_at);
      } else {
        setNotFound(true);
      }
      setLoading(false);
    });
  }, [id]);

  const debouncedSave = useCallback(
    (fields: { title?: string; content?: string }) => {
      if (!id) return;
      if (saveTimer.current) clearTimeout(saveTimer.current);
      saveTimer.current = setTimeout(async () => {
        setSaving(true);
        const updated = await updateNote(id, fields);
        if (updated) {
          setLastSaved(updated.updated_at);
          setNote((prev) => (prev ? { ...prev, ...updated } : prev));
        }
        setSaving(false);
      }, 800);
    },
    [id],
  );

  const handleContentChange = (html: string) => {
    latestContent.current = html;
    setNote((prev) => (prev ? { ...prev, content: html } : prev));
    debouncedSave({ content: html });
  };

  const handleTitleChange = (title: string) => {
    latestTitle.current = title;
    setNote((prev) => (prev ? { ...prev, title } : prev));
    debouncedSave({ title });
  };

  const handleShare = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // fallback
      const ta = document.createElement('textarea');
      ta.value = url;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDelete = async () => {
    if (!id) return;
    await deleteNoteById(id);
    navigate('/notepad', { replace: true });
  };

  const handleNew = async () => {
    const n = await createNote();
    if (n) navigate(`/notepad/${n.id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen dot-grid grid place-items-center">
        <div className="text-center space-y-3">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-amber-600" />
          <p className="text-sm text-muted-foreground">Loading note...</p>
        </div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen dot-grid grid place-items-center">
        <div className="text-center space-y-4">
          <AlertCircle className="mx-auto h-10 w-10 text-muted-foreground/50" />
          <div>
            <h2 className="text-lg font-semibold text-foreground">Note not found</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              This note may have expired or been deleted.
            </p>
          </div>
          <button
            onClick={() => navigate('/notepad')}
            className="inline-flex items-center gap-2 rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-amber-500 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Create New Note
          </button>
        </div>
      </div>
    );
  }

  const remaining = note ? daysLeft(note.expires_at) : 0;

  return (
    <div className="min-h-screen dot-grid">
      {/* Toolbar */}
      <header className="sticky top-0 z-30 border-b border-border bg-white/95 backdrop-blur-sm shadow-warm-sm">
        <div className="mx-auto max-w-[1100px] px-4 py-3 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-md">
            <StickyNote className="h-5 w-5" />
          </div>
          <div className="mr-auto min-w-0">
            <h1 className="text-base font-semibold text-foreground truncate">Online Notepad</h1>
            <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
              {saving ? (
                <span className="flex items-center gap-1">
                  <Loader2 className="h-3 w-3 animate-spin" /> Saving...
                </span>
              ) : lastSaved ? (
                <span className="flex items-center gap-1">
                  <Save className="h-3 w-3" /> Saved {formatDate(lastSaved)}
                </span>
              ) : null}
            </div>
          </div>

          {/* Expiry badge */}
          <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-[11px] text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>
              {remaining > 0 ? `Expires in ${remaining} day${remaining !== 1 ? 's' : ''}` : 'Expiring soon'}
            </span>
          </div>

          {/* Actions */}
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-white px-3 py-2 text-xs font-medium text-muted-foreground shadow-warm-sm hover:bg-muted hover:text-foreground transition-colors"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Share2 className="h-3.5 w-3.5" />}
            {copied ? 'Copied!' : 'Share'}
          </button>

          <button
            onClick={handleNew}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-white px-3 py-2 text-xs font-medium text-muted-foreground shadow-warm-sm hover:bg-muted hover:text-foreground transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
            New
          </button>

          <button
            onClick={handleDelete}
            className="inline-flex items-center justify-center rounded-lg border border-border bg-white p-2 text-muted-foreground/60 shadow-warm-sm hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-colors"
            title="Delete this note"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </header>

      {/* Editor */}
      <div className="mx-auto max-w-[1100px] px-4 py-6">
        <div className="rounded-xl border border-border bg-white shadow-warm-sm">
          {/* Title */}
          <div className="border-b border-border px-6 py-4">
            <input
              value={note?.title || ''}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Note title..."
              className="w-full bg-transparent text-xl font-semibold text-foreground placeholder:text-muted-foreground/40 focus:outline-none"
            />
          </div>

          {/* Rich editor */}
          <div className="p-4">
            {note && (
              <NoteEditor value={note.content} onChange={handleContentChange} />
            )}
          </div>
        </div>

        {/* Share info */}
        <div className="mt-4 rounded-xl border border-border bg-white shadow-warm-sm p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-xs text-muted-foreground">
              <p>Anyone with the link can view and edit this note. It will auto-delete after 30 days.</p>
            </div>
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 rounded-lg bg-amber-600 px-4 py-2 text-xs font-semibold text-white shadow-md hover:bg-amber-500 transition-colors shrink-0"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? 'Link Copied!' : 'Copy Share Link'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteView;
