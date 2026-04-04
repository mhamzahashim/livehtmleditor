import { Github, Heart } from 'lucide-react';

const EditorFooter = () => {
  return (
    <footer className="border-t border-white/[0.04] bg-[hsl(225,22%,5%)]/60 mt-auto">
      <div className="max-w-[1600px] mx-auto px-4 py-3">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4 text-xs text-[#3A3F52]">
            <span className="flex items-center gap-1">
              Made with <Heart className="w-3 h-3 text-rose-500/60" fill="currentColor" /> for developers
            </span>
            <span className="hidden sm:inline">&middot;</span>
            <span className="hidden sm:inline">HTML &middot; CSS &middot; JavaScript</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-[11px] text-[#2E3345] font-mono">
              <kbd className="px-1.5 py-0.5 rounded bg-white/[0.03] border border-white/[0.06] text-[#5C6178]">Ctrl+S</kbd>
              <span className="ml-1.5">save</span>
            </div>
            <button
              onClick={() => window.open('https://github.com/mhamzahashim', '_blank')}
              className="text-[#3A3F52] hover:text-[#7A7F94] transition-colors"
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
