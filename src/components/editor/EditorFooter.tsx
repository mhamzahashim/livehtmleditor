import { Github, Heart } from 'lucide-react';

const EditorFooter = () => {
  return (
    <footer className="border-t border-border bg-white mt-auto">
      <div className="max-w-[1600px] mx-auto px-4 py-3">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              Made with <Heart className="w-3 h-3 text-red-400" fill="currentColor" /> for developers
            </span>
            <span className="hidden sm:inline">&middot;</span>
            <span className="hidden sm:inline">HTML &middot; CSS &middot; JavaScript</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-[11px] text-muted-foreground font-mono">
              <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border text-foreground/60">Ctrl+S</kbd>
              <span className="ml-1.5">save</span>
            </div>
            <button
              onClick={() => window.open('https://github.com/mhamzahashim', '_blank')}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default EditorFooter;
