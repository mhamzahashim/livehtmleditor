import { Button } from '@/components/ui/button';
import { Heart, Github } from 'lucide-react';

interface EditorFooterProps {
  darkMode: boolean;
}

const EditorFooter = ({ darkMode }: EditorFooterProps) => {
  return (
    <footer className={`${darkMode ? 'bg-card border-border' : 'bg-white/80 backdrop-blur-md border-slate-200/60'} border-t mt-auto`}>
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className={`flex items-center space-x-6 text-sm ${darkMode ? 'text-muted-foreground' : 'text-slate-600'}`}>
            <span className="flex items-center">
              Made with <Heart className="w-4 h-4 mx-1 text-red-400" fill="currentColor" /> for developers
            </span>
            <span>•</span>
            <span>Advanced HTML editing and preview</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className={`text-xs ${darkMode ? 'text-muted-foreground' : 'text-slate-500'}`}>
              <span>Keyboard shortcuts: </span>
              <kbd className={`px-2 py-1 ${darkMode ? 'bg-muted' : 'bg-slate-100'} rounded text-xs`}>Ctrl+S</kbd>
              <span className="mx-1">to save</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className={darkMode ? 'text-muted-foreground hover:text-foreground' : 'text-slate-500 hover:text-slate-700'}
              onClick={() => window.open('https://github.com', '_blank')}
            >
              <Github className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className={`mt-4 pt-4 border-t ${darkMode ? 'border-border' : 'border-slate-200/60'}`}>
          <p className={`text-xs ${darkMode ? 'text-muted-foreground' : 'text-slate-500'} text-center`}>
            © 2024 HTML Editor. Built with React, TypeScript, and Tailwind CSS. Created by{' '}
            <a 
              href="https://serpnavigator.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`${darkMode ? 'text-primary hover:text-primary/80' : 'text-blue-600 hover:text-blue-800'} underline`}
            >
              SerpNavigator
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default EditorFooter;