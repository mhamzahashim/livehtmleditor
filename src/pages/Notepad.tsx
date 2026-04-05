import { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { createNote } from '@/utils/notesApi';
import { StickyNote, Loader2 } from 'lucide-react';

const Notepad = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const creating = useRef(false);

  const init = useCallback(async () => {
    if (creating.current) return;
    creating.current = true;
    const note = await createNote();
    if (note) {
      navigate(`/notepad/${note.id}`, { replace: true });
    } else {
      setError(true);
    }
  }, [navigate]);

  useEffect(() => {
    init();
  }, [init]);

  if (error) {
    return (
      <div className="min-h-screen dot-grid grid place-items-center">
        <div className="text-center space-y-3">
          <StickyNote className="mx-auto h-10 w-10 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Failed to create a new note. Please try again.</p>
          <button
            onClick={() => { setError(false); creating.current = false; init(); }}
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-white px-4 py-2 text-sm font-medium shadow-warm-sm hover:bg-muted transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen dot-grid grid place-items-center">
      <div className="text-center space-y-3">
        <Loader2 className="mx-auto h-8 w-8 animate-spin text-amber-600" />
        <p className="text-sm text-muted-foreground">Creating your notepad...</p>
      </div>
    </div>
  );
};

export default Notepad;
