
import { useState, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, RotateCcw, Github, Heart } from 'lucide-react';
import CodeEditor from './CodeEditor';
import LivePreview from './LivePreview';

const HtmlEditor = () => {
  const [htmlCode, setHtmlCode] = useState(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Document</title>
    <style>
        body {
            font-family: 'Georgia', serif;
            line-height: 1.6;
            margin: 40px;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        }
        h1 {
            color: #4a5568;
            border-bottom: 2px solid #e2e8f0;
            padding-bottom: 10px;
        }
        .introduction {
            background: #f7fafc;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
        }
        p {
            color: #2d3748;
            margin: 15px 0;
        }
        a {
            color: #4299e1;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <h1>Welcome to HTML Editor</h1>
    <div class="introduction">
        <h2>Introduction</h2>
        <p>This is the introduction section. You can edit this text directly by clicking on it in the preview!</p>
        <p>Try selecting text and using the toolbar to format it, or click on elements to edit them directly.</p>
    </div>
    <div class="content">
        <h2>Main Content</h2>
        <p>This is the main content area. Each section will update precisely in the code when you make changes.</p>
        <p>The bidirectional sync ensures your changes in the preview are reflected exactly where they should be in the HTML code.</p>
    </div>
</body>
</html>`);

  const [previewKey, setPreviewKey] = useState(0);

  const handleCodeChange = useCallback((newCode: string) => {
    setHtmlCode(newCode);
  }, []);

  const refreshPreview = () => {
    setPreviewKey(prev => prev + 1);
  };

  const resetCode = () => {
    setHtmlCode(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Document</title>
    <style>
        body {
            font-family: 'Georgia', serif;
            line-height: 1.6;
            margin: 40px;
        }
        h1 {
            color: #4a5568;
        }
        p {
            color: #2d3748;
        }
    </style>
</head>
<body>
    <h1>Welcome to HTML Editor</h1>
    <p>Start building your HTML content here!</p>
</body>
</html>`);
    refreshPreview();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/60 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">&lt;/&gt;</span>
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-slate-800 tracking-tight">HTML Editor</h1>
                <p className="text-sm text-slate-500 mt-0.5">Create, edit, and preview HTML in real-time</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                onClick={refreshPreview}
                variant="outline"
                size="sm"
                className="text-slate-600 border-slate-300 hover:bg-slate-50 hover:border-slate-400 transition-all"
              >
                <Play className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button
                onClick={resetCode}
                variant="outline"
                size="sm"
                className="text-slate-600 border-slate-300 hover:bg-slate-50 hover:border-slate-400 transition-all"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Editor Content */}
      <main className="flex-1 flex gap-6 p-6">
        {/* Code Editor Side */}
        <Card className="flex-1 bg-white/90 backdrop-blur-sm border-slate-200/60 shadow-xl">
          <div className="h-full flex flex-col">
            <div className="p-5 border-b border-slate-200/60 bg-gradient-to-r from-slate-50 to-blue-50">
              <h2 className="text-lg font-semibold text-slate-800">HTML Code</h2>
              <p className="text-sm text-slate-600 mt-1">Edit your HTML with syntax highlighting and live preview</p>
            </div>
            <div className="flex-1">
              <CodeEditor
                value={htmlCode}
                onChange={handleCodeChange}
              />
            </div>
          </div>
        </Card>

        {/* Live Preview Side */}
        <Card className="flex-1 bg-white/90 backdrop-blur-sm border-slate-200/60 shadow-xl">
          <div className="h-full flex flex-col">
            <div className="p-5 border-b border-slate-200/60 bg-gradient-to-r from-blue-50 to-indigo-50">
              <h2 className="text-lg font-semibold text-slate-800">Live Preview</h2>
              <p className="text-sm text-slate-600 mt-1">Click elements to edit • Use toolbar to format • Changes sync to code</p>
            </div>
            <div className="flex-1">
              <LivePreview
                key={previewKey}
                htmlCode={htmlCode}
                onCodeChange={handleCodeChange}
              />
            </div>
          </div>
        </Card>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-md border-t border-slate-200/60 mt-auto">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6 text-sm text-slate-600">
              <span className="flex items-center">
                Made with <Heart className="w-4 h-4 mx-1 text-red-400" fill="currentColor" /> for developers
              </span>
              <span>•</span>
              <span>Real-time HTML editing and preview</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-xs text-slate-500">
                <span>Keyboard shortcuts: </span>
                <kbd className="px-2 py-1 bg-slate-100 rounded text-xs">Ctrl+S</kbd>
                <span className="mx-1">to save</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-slate-500 hover:text-slate-700"
                onClick={() => window.open('https://github.com', '_blank')}
              >
                <Github className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-200/60">
            <p className="text-xs text-slate-500 text-center">
              © 2024 HTML Editor. Built with React, TypeScript, and Tailwind CSS.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HtmlEditor;
